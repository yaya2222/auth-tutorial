import { auth, signOut } from "@/auth";

export default async function SettingPage() {
  const session = await auth();
  console.log("**********");
  console.log(session);
  console.log("**********");

  return (
    <div>
      <form
        action={async () => {
          "use server"
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
