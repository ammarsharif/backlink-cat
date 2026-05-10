"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user && pathname === "/login") {
        router.push("/");
      } else if (!user && pathname !== "/login") {
        router.push("/login");
      } else {
        setShowChildren(true);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="animate-spin text-[#6EBD44]" size={40} />
      </div>
    );
  }

  if (!user && pathname !== "/login") {
    return null; // Don't render anything while redirecting
  }

  // Prevent flash of content
  if (!showChildren && pathname !== "/login") return null;

  return <>{children}</>;
}
