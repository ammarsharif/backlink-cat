"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category" },
  { label: "Stories", href: "/stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const APP_URL = "https://app.backlinkcat.com";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
                  {isActive(item.href) && (
                    <span className="absolute bottom-[-4px] left-3 right-3 h-[2.5px] bg-[#6EBD44] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a href={`${APP_URL}/#/login`} target="_blank" rel="noopener noreferrer">
                <button className="text-[15px] font-medium text-gray-500 hover:text-[#6EBD44] transition-colors cursor-pointer">
                  Sign In
                </button>
              </a>
              <a href={`${APP_URL}/#/signup`} target="_blank" rel="noopener noreferrer">
                <button className="bg-[#6EBD44] text-white px-6 py-2 text-[14px] font-bold tracking-wide rounded-[4px] hover:bg-[#5da539] transition-colors cursor-pointer">
                  SIGN UP
                </button>
              </a>
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
            <div className="flex gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
              <a href={`${APP_URL}/#/login`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full cursor-pointer">
                  Sign In
                </Button>
              </a>
              <a href={`${APP_URL}/#/signup`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="primary" size="sm" className="w-full cursor-pointer">
                  SIGN UP
                </Button>
              </a>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
