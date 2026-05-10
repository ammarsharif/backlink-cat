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
        // Handled in render
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] font-[var(--font-poppins)] p-4 text-center">
         <div className="w-24 h-24 mb-6 drop-shadow-md">
            <img src="/images/backlink-cat-logo.svg" alt="BacklinkCAT" className="w-full h-full object-contain" />
         </div>
         <h2 className="text-3xl font-bold text-[#333] mb-3">Authentication Required</h2>
         <p className="text-gray-500 max-w-md mx-auto mb-8 text-[15px] leading-relaxed">
           Welcome to the BacklinkCAT platform. To ensure a secure and professional environment, please log in to access the marketplace.
         </p>
         <button 
           onClick={() => router.push("/login")} 
           className="bg-[#6EBD44] hover:bg-[#5da539] text-white px-10 cursor-pointer py-3.5 rounded-full font-bold transition-colors shadow-lg shadow-[#6EBD44]/20 flex items-center gap-2"
         >
           Proceed to Login
         </button>
      </div>
    );
  }

  // Prevent flash of content
  if (!showChildren && pathname !== "/login") return null;

  return <>{children}</>;
}
