import { auth } from "@/auth"

export const crurentUser = async () => {
    const session = await auth()
    return session?.user
}