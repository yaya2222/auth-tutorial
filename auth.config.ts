import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"


import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./data/user";
export default {
  providers: [
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    }), 
    Github({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET,
    }),
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