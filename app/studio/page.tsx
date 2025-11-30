import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StudioProvider } from "./components/studioContext";
import { getSession } from "@/lib/get-session";
import StudioContent from "./components/StudioContent";

export const metadata = {
  title: "Broadcast Studio",
  description: "A simple broadcast studio application.",
};

// Função para checar se é desktop
function isDesktopDevice(userAgent: string | null) {
  if (!userAgent) return true; // assume desktop por padrão
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return !mobileRegex.test(userAgent);
}

export default async function Studio() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent");

  // Verificar autenticação
  const session = await getSession();
  const cookieStore = await cookies();
  const isGuest = cookieStore.get("guest-session");

  if (!session?.user && !isGuest) {
    redirect("/login");
  }

  if (!isDesktopDevice(userAgent)) {
    return (
      <div className="flex items-center justify-center h-screen text-center p-4 bg-[var(--bsui-gray-4)] text-[var(--bsui-gray-0)]">
        <h1>Sorry!, Broadcast Studio is only available on PC at the moment.</h1>
      </div>
    );
  }

  return (
    <StudioProvider>
      <StudioContent />
    </StudioProvider>
  );
}
