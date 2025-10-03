import NavBar from "@/components/nav-bar";
import { useAuth } from "@/hooks/use-auth";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth();

  // The AuthProvider in the root layout already handles redirection.
  // We can show a loading state or nothing while waiting for the redirect.
  if (!user) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
