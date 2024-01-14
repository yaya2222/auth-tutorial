"use server";

import {AuthError} from "next-auth"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const vaildatedFields = LoginSchema.safeParse(values);
  if (!vaildatedFields.success) {
    return { error: "Invalid field!" };
  }

  const { email, password } = vaildatedFields.data

  try {
    await signIn("credentials", { email, password,redirectTo:DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    if(error instanceof AuthError){
      switch(error.type){
        case "CredentialsSignin":
          return {error:"Invalid credentials"}
        default:
          return {error:"Error login"}
      }
    }
    throw error
  }
};
