import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[520px] md:min-h-[580px]">
      {/* Gradient background — matches Figma green→teal→blue diagonal gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #b4f759 0%, #6de89a 20%, #35d5a4 40%, #00c7c5 58%, #2d9be0 78%, #5277f7 100%)',
        }}
      />

      {/* Wave bottom shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <Container className="relative z-10 pt-12 pb-24 md:pt-16 md:pb-28">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
          {/* Left — text content */}
          <div className="flex-1 text-white max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[var(--font-heading)] leading-tight mb-4 text-[var(--color-text-heading)]">
              Backlink Market Place
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-3 text-[var(--color-text-heading)]">
              Buy &amp; Sell Guest Post with us at Best Prices.
            </p>
            <p className="text-sm md:text-base text-gray-800 mb-6 max-w-sm">
              {/* TODO: copy — replace with actual tagline from client */}
              Join BACKLINKCAT and monetize your blog with great recurring commissions.
              We have more than 100k bloggers and more than 7000 clients.
            </p>
            <p className="text-sm text-gray-700 mb-3">Just Sign Up and Subscribe for all updates!</p>

            {/* Email subscribe */}
            <div className="flex flex-col sm:flex-row gap-2 mb-5">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] text-sm text-[var(--color-text-primary)] border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-[var(--color-cta-bg)] text-white px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold hover:bg-[var(--color-cta-hover)] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>

            {/* Auth buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="md">
                SIGN IN
              </Button>
              <Button variant="white" size="md">
                SIGN UP
              </Button>
            </div>
          </div>

          {/* Right — cat illustration */}
          <div className="flex-1 flex justify-center md:justify-end items-end relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* TODO: asset — place hero-cat.png in /public/images/ */}
              <img
                src="/images/hero-cat.png"
                alt="BacklinkCAT mascot"
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
