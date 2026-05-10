"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category/all" },
  { label: "Stories", href: "/stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">


      {/* Main nav */}
      <Container size="wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/backlink-main-logo.svg" alt="BacklinkCAT" className="h-[40px] w-auto" />
          </Link>

          {/* Desktop nav links and Auth */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative text-[15px] font-medium px-3 py-1.5 rounded-md transition-all duration-200",
                    isActive(item.href)
                      ? "text-[#6EBD44] font-semibold"
                      : "text-gray-500 hover:text-[#6EBD44] hover:bg-[#6EBD44]/5"
                  )}
                >
                  {item.label}
                  {/* Active underline indicator */}
                  {isActive(item.href) && (
                    <span className="absolute bottom-[-4px] left-3 right-3 h-[2.5px] bg-[#6EBD44] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-[14px] text-gray-600 font-medium max-w-[150px] truncate">
                    {user.isAnonymous ? "Guest" : user.email}
                  </span>
                  <button 
                    onClick={logout}
                    className="text-[15px] font-medium text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-[15px] font-medium text-gray-500 hover:text-[#6EBD44] transition-colors">
                    Login
                  </Link>
                  <button className="bg-[#6EBD44] text-white px-6 py-2 text-[14px] font-bold tracking-wide rounded-[4px] hover:bg-[#5da539] transition-colors cursor-pointer">
                    SIGN UP
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--color-text-secondary)] cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t border-[var(--color-border-subtle)] bg-white overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <Container>
          <nav className="py-4 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium px-3 py-2.5 rounded-lg transition-all",
                  isActive(item.href)
                    ? "text-[#6EBD44] bg-[#6EBD44]/8 font-semibold border-l-[3px] border-[#6EBD44] pl-4"
                    : "text-gray-500 hover:text-[#6EBD44] hover:bg-gray-50"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
              {user ? (
                <>
                  <div className="text-sm text-center text-gray-600 py-2">
                    Logged in as: {user.isAnonymous ? "Guest" : user.email}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Button variant="primary" size="sm" className="flex-1 cursor-pointer">
                    SIGN UP
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
