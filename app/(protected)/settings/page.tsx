"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingPage() {
  const session = useCurrentUser();
  const onClick = () => {
    // signOut();
    logout();
  };
  return (
    <div className="bg-white rounded-xl">
      <button type="submit" onClick={onClick}>
        Sign out
      </button>
    </div>
  );
}
