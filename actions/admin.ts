"use server"

import { crurentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export const admin = async()=>{
    const role = await crurentRole()

    if(role !==UserRole.ADMIN){
        return {error:"Forbidden!"}
    }
    return {success:"Allowed"}

}