import type { Metadata, Viewport } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BacklinkCAT - Best Backlink Marketplace for SEO Guest Posts',
  description:
    'Buy & Sell Guest Posts at the Best Prices. Join BacklinkCAT, the leading marketplace connecting 100k+ bloggers and 7000+ clients. Monetize your blog with high recurring commissions.',
  keywords: ['backlinks', 'guest post', 'SEO', 'link building', 'publisher marketplace', 'content marketing'],
  authors: [{ name: 'BacklinkCAT Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'BacklinkCAT - Best Backlink Marketplace',
    description: 'The premier marketplace for buying and selling guest posts.',
    url: 'https://backlinkcat.com',
    siteName: 'BacklinkCAT',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/backlink-cat-logo.svg',
    apple: '/images/backlink-cat-logo.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};


import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
