import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"


import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log(credentials);
        const validatedFileds = LoginSchema.safeParse(credentials)

        if (validatedFileds.success) {
          const { email, password } = validatedFileds.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) {
            return null
          }
          const passwordsMatch = await bcrypt.compare(password, user.password)
          if(passwordsMatch) return user
        }
        return null
      }
    })
  ],
} satisfies NextAuthConfig