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
      
      <main className="flex-grow flex flex-col items-center justify-center pt-12 pb-16 lg:pt-16 lg:pb-24 w-full">
        <Container size="wide" className="flex flex-col items-center text-center px-4">
          
          {/* 404 Cat Image */}
          <div className="w-full max-w-[400px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] mb-4 lg:mb-6 flex justify-center">
            <img 
              src="/images/cat-404.svg" 
              alt="404 Not Found"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-[#6EBD44] font-bold font-(--font-inter) text-[28px] md:text-[38px] lg:text-[45px] leading-tight mb-2 tracking-tight">
            This page doesn't exist.
          </h1>
          
          {/* Subtitle */}
          <p className="text-black font-normal font-(--font-inter) text-[16px] md:text-[20px] lg:text-[24px] leading-snug mb-6 lg:mb-8 max-w-[90%] mx-auto">
            Please return to the previous page or visit{' '}
            <Link href="/" className="hover:text-[#6EBD44] transition-colors">
              backlinkcat.com
            </Link>
          </p>

          <Link href="/">
            <button className="bg-[#6EBD44] text-white px-10 py-3 text-[16px] font-bold tracking-wide rounded-full hover:bg-[#5da539] transition-all transform active:scale-95 shadow-lg cursor-pointer">
              BACK TO HOME
            </button>
          </Link>
          
        </Container>
      </main>

      <Footer />
    </div>
  );
}
