"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { loginAnonymously } = useAuth();
  const router = useRouter();

  const handleAnonymousLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginAnonymously();
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] relative overflow-hidden font-[var(--font-poppins)]">
      <Navbar />

      {/* Background shape from home page */}
      <div className="absolute top-0 left-0 w-full h-[1400px] pointer-events-none z-0">
        <img 
          src="/images/bg-colored-image.svg" 
          alt="" 
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-20 px-4 py-12 lg:py-0 w-full mx-auto">
        
        {/* Logo above form */}
        <div className="mb-8 w-20 h-20 relative">
          <img 
            src="/images/backlink-cat-logo.svg" 
            alt="BacklinkCAT Icon" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[400px] bg-white rounded-xl shadow-[0_15px_40px_rgb(0,0,0,0.06)] p-8 lg:p-10 border border-gray-50 text-center">
          <h2 className="text-xl font-bold text-[#333] mb-2">Welcome to BacklinkCAT</h2>
          <p className="text-[13px] text-gray-500 mb-8 leading-relaxed">
            Please log in to access our professional marketplace and view exclusive guest posts.
          </p>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100 text-center mb-6">
              {error}
            </div>
          )}

          {/* Anonymous Login Button */}
          <button
            onClick={handleAnonymousLogin}
            disabled={loading}
            className="w-full bg-[#75C246] hover:bg-[#62aa37] text-white h-12 rounded-lg text-[15px] font-bold transition-colors disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            {loading ? "Logging in..." : "Login to Continue"}
          </button>
        </div>
        
      </div>
    </div>
  );
}
