import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | BacklinkCAT',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-20 lg:pt-32 lg:pb-32 w-full">
        <Container size="wide" className="flex flex-col items-center text-center px-4">
          
          {/* 404 Cat Image */}
          <div className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[850px] xl:max-w-[950px] mb-8 lg:mb-12 flex justify-center">
            <img 
              src="/images/cat-404.svg" 
              alt="404 Not Found"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-[#6EBD44] font-bold font-[var(--font-inter)] text-[32px] md:text-[45px] lg:text-[54px] leading-tight mb-4 tracking-tight">
            This page doesn't exist.
          </h1>
          
          {/* Subtitle */}
          <p className="text-black font-normal font-[var(--font-inter)] text-[18px] md:text-[22px] lg:text-[28px] leading-snug mb-8 lg:mb-10 max-w-[90%] mx-auto">
            Please return to the previous page or visit{' '}
            <Link href="/" className="hover:text-[#6EBD44] transition-colors">
              backlinkcat.com
            </Link>
          </p>

          {/* Error Text */}
          <p className="text-black font-normal font-[var(--font-inter)] text-[16px] md:text-[20px] lg:text-[24px]">
            Error 404
          </p>
          
        </Container>
      </main>

      <Footer />
    </div>
  );
}
