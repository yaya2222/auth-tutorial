"use server";

import * as z from "zod";
import bcrypt from "bcryptjs"

import { db } from "@/lib/db";
import { SettingSchema } from "@/schemas";
import { crurentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/lib/token" ;
import { sendVerificationEmail } from "@/lib/mail";
import { update } from "@/auth";

export const setting = async (values: z.infer<typeof SettingSchema>) => {
  const user = await crurentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email){
    const existingUser = await getUserByEmail(values.email)
    if(existingUser&&existingUser.id!==user.id){
      return {error:"Email already in use!"}
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {success:"Verification email sent!"}
  }

  if(values.password&&values.newPassword&& dbUser.password){
    const passwordsMatch = await bcrypt.compare(values.password,dbUser.password)

    if(!passwordsMatch){
      return {error:"Incorrect password!"}
    }

    
    
    const hashedPassword = await bcrypt.hash(values.newPassword,10)
    values.password = hashedPassword
    values.newPassword=undefined
  }
  
   const updatedUser= await db.user.update({
      where: { id: dbUser.id },
      data: { ...values },
    });

    // update({
    //   user:{
    //     name:updatedUser.name,
    //     email:updatedUser.email,
    //     role:updatedUser.role,
    //     isTwoFactorEnabled:updatedUser.isTwoFactorEnabled
    //   }
    // })

  return { success: "Setting Updated!" };
};
