import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact Us | BacklinkCAT',
  description: 'Send us a message and we will get back to you.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/images/bg-colored-image.svg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="relative z-10 w-full flex items-center justify-center px-4 py-10">
        <ContactForm />
      </div>
    </main>
  );
}
