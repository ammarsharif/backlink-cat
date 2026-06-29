import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact Us - BacklinkCAT',
  description: 'Contact BacklinkCAT for backlink marketplace support, publisher questions, and guest post campaign help.',
};

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-white min-h-[calc(100vh-80px)] flex items-center justify-center">
      {/* Background SVG */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/images/bg-colored-image.svg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-8 md:py-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-16">
        
        {/* Left Side: Heading & Image */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-xl">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-[32px] lg:text-[48px] font-black text-black leading-[1.1] mb-2 tracking-tight">
              HOW CAN WE HELP?
            </h1>
            <p className="text-[20px] lg:text-[26px] text-gray-800 font-medium">
              Send us a message!
            </p>
          </div>
          
          <div className="hidden lg:block relative w-full lg:max-w-[500px] lg:h-[400px] mt-6 animate-float">
             <img 
               src="/images/cat-with-headpones.svg" 
               alt="Cat with headphones" 
               className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]"
             />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 w-full max-w-lg lg:max-w-[650px] flex justify-center lg:justify-end z-20">
          <ContactForm />
        </div>
        
      </div>
    </main>
  );
}
