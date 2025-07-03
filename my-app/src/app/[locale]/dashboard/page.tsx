import DashboardClient from "./dashboardClient";
import { auth } from "@/auth"

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    // redirige ou affiche un message d'erreur
    return <div>Please login</div>;
  }

  return <DashboardClient session={session} />;
}
