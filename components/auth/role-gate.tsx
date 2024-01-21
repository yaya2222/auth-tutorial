"use client";

import { userCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import FormError from "@/components/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = userCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
}
