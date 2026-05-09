'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Category', href: '#' },
  { label: 'Stories', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar — search filters */}
      <div className="hidden lg:block border-b border-[var(--color-border-subtle)] py-2">
        <Container>
          <form className="flex items-center gap-2">
            <input
              type="text"
              placeholder="WEBSITE URL"
              className="flex-1 min-w-0 px-3 py-1.5 text-xs border border-[var(--color-border-default)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-1 focus:ring-[var(--color-cta-bg)]"
            />
            {['DA', 'DR', 'TRAFFIC', 'PRICE'].map((label) => (
              <input
                key={label}
                type="text"
                placeholder={label}
                className="w-20 px-3 py-1.5 text-xs border border-[var(--color-border-default)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-1 focus:ring-[var(--color-cta-bg)]"
              />
            ))}
            <button
              type="submit"
              className="bg-[var(--color-cta-bg)] text-white px-4 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold hover:bg-[var(--color-cta-hover)] transition-colors flex items-center gap-1"
            >
              <Search size={12} />
              GET IT
            </button>
          </form>
        </Container>
      </div>

      {/* Main nav */}
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* TODO: asset — replace with actual logo */}
            <div className="w-8 h-8 bg-[var(--color-cta-bg)] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">BC</span>
            </div>
            <span className="font-extrabold text-lg font-[var(--font-heading)]">
              Backlink<span className="text-[var(--color-text-accent)]">CAT</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-accent)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="primary" size="sm">
              SIGN UP
            </Button>
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
          'md:hidden border-t border-[var(--color-border-subtle)] bg-white overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-96' : 'max-h-0'
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
