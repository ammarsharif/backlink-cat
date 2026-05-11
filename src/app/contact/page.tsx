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
                  <h1 className="text-[32px] md:text-[45px] lg:text-[54px] font-bold font-(--font-inter) leading-[1] text-[#000000] mb-2 uppercase">
                    HOW CAN WE HELP?
                  </h1>
                  <p className="text-[32px] md:text-[45px] lg:text-[54px] font-normal font-(--font-inter) leading-[1] text-[#000000]">
                    Send us a message!
                  </p>
                </div>
                
                {/* Right - Cat Image */}
                <div className="hidden lg:block absolute top-[-100px] w-[550px] xl:w-[650px] 2xl:w-[750px] z-10 pointer-events-none -right-10 xl:-right-20 2xl:-right-10">
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
