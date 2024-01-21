import UserInfo from "@/components/user-info"
import { crurentUser } from "@/lib/auth"

export default async function ServerPage() {
    const user = await crurentUser()
  
    return (
    <div>
      <UserInfo user={user} label={"Server component"}/>
    </div>
  )
}
