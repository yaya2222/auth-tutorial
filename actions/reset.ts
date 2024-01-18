"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFiels = ResetSchema.safeParse(values);

  if (!validatedFiels.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFiels.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordRestToken = await generatePasswordResetToken(email);
  
  await sendPasswordResetEmail(
    passwordRestToken.email,
    passwordRestToken.token
  );

  return { success: "Reset email sent!" };
};
