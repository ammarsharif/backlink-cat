"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Category", href: "#" },
  { label: "Stories", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[15px] font-medium text-gray-500 hover:text-[#6EBD44] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-[15px] font-medium text-gray-500 hover:text-[#6EBD44] transition-colors">
                Login
              </Link>
              <button className="bg-[#6EBD44] text-white px-6 py-2 text-[14px] font-bold tracking-wide rounded-[4px] hover:bg-[#5da539] transition-colors">
                SIGN UP
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--color-text-secondary)]"
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
          <nav className="py-4 flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
              <Button variant="ghost" size="sm" className="flex-1">
                Login
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                SIGN UP
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
