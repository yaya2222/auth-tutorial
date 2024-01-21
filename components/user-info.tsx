import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: String;
}

export default function UserInfo({user,label}:UserInfoProps) {
  return (
    <Card className="w-[600px] shadow-md">
<CardHeader className="text-2xl font-semibold text-center">
   <p>{label}</p>
</CardHeader>
<CardContent className="space-y-4">
<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
<p className="text-sm font-medium">
  ID 
</p>
<p>
  {user?.id}
</p>
</div>
</CardContent>
    </Card>
  );
}
