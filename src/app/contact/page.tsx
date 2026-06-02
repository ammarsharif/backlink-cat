import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact Us - BacklinkCAT',
  description: 'Contact BacklinkCAT for backlink marketplace support, publisher questions, and guest post campaign help.',
};

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/images/bg-colored-image.svg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="relative z-10 w-full flex items-center justify-center px-4 py-16 min-h-[calc(100vh-64px)]">
        <ContactForm />
      </div>
    </main>
  );
}
