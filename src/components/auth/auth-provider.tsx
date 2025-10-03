"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import { sampleUsers } from "@/lib/data";
import type { User } from "@/lib/types";

// For demo purposes, we'll use a mock user.
// In a real app, you would fetch this from your Firestore 'users' collection.
const MOCK_USER: User = sampleUsers[0];

const PROTECTED_ROUTES = ["/feed", "/new-post", "/profile", "/trending", "/search"];
const PUBLIC_ROUTES = ["/login"];

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // In a real app, you'd use onAuthStateChanged from Firebase
    // const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    //   if (firebaseUser) {
    //     // Fetch user profile from Firestore and set it
    //     // For now, we use a mock user
    //     setUser(MOCK_USER);
    //   } else {
    //     setUser(null);
    //   }
    //   setLoading(false);
    // });
    // return () => unsubscribe();

    // Mock authentication logic
    setTimeout(() => {
        // To test logged out state, set the initial user to null
        // setUser(null);
        setUser(MOCK_USER); 
        setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading) return;

    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

    if (!user && isProtectedRoute) {
      router.push("/login");
    } else if (user && isPublicRoute) {
      router.push("/feed");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
            <h1 className="text-3xl font-headline text-primary">TuneShare</h1>
            <p className="mt-2 text-foreground">Loading your soundscape...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
