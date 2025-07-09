import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
