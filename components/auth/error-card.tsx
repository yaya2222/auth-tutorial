import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "@/components/auth/card-wrapper";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went worng!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center ">
        <ExclamationTriangleIcon className="text-destructive"/>
      </div>
    </CardWrapper>
  );
}