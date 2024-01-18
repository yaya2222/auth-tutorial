import Navbar from "@/app/(protected)/_components/navbar"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <Navbar />
        {children}
    </div>
  )
}
 