"use client";

import {BeatLoader} from "react-spinners"
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function NewVerificationFrom() {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(()=>{
        token
    },[token])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Bacl to login"
      backButtonHref="/auth/login"
    >
        <div className="flex items-center justify-center w-full">
            <BeatLoader />
        </div>
    </CardWrapper>
  );
}
