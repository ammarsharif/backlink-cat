import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Container } from '@/components/ui/Container';
import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact Us | BacklinkCAT',
  description: 'Send us a message and we will get back to you.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative w-full flex flex-col pb-20 overflow-x-hidden">
          {/* Main Background Image spanning top section */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <img 
              src="/images/bg-colored-image.svg" 
              alt="" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          <div className="relative z-10 flex flex-col flex-1 pt-24 lg:pt-32 pb-20">
            <Container size="wide" className="relative">
              {/* Top Section: Text and Cat Image */}
              <div className="flex flex-col lg:flex-row items-center relative min-h-[300px] lg:min-h-[500px]">
                
                {/* Left - Text Content */}
                <div className="flex-1 w-full text-center lg:text-left z-10 lg:pl-10 xl:pl-20 mt-10 lg:mt-0">
                  <h1 className="text-[40px] md:text-[50px] lg:text-[63px] font-bold font-[var(--font-inter)] leading-[1] text-[#000000] mb-2 uppercase">
                    HOW CAN WE HELP?
                  </h1>
                  <p className="text-[40px] md:text-[50px] lg:text-[63px] font-normal font-[var(--font-inter)] leading-[1] text-[#000000]">
                    Send us a message!
                  </p>
                </div>
                
                {/* Right - Cat Image */}
                <div className="hidden lg:block absolute top-[-150px] w-[650px] xl:w-[800px] 2xl:w-[950px] z-10 pointer-events-none -right-10 xl:-right-20 2xl:-right-10">
                  <img 
                    src="/images/cat-with-headpones.svg" 
                    alt="Cat with headphones"
                    className="w-full h-auto drop-shadow-2xl object-contain"
                  />
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="mt-16 lg:mt-24 xl:mt-32 flex justify-center relative z-20 pb-20">
                <ContactForm />
              </div>
            </Container>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
