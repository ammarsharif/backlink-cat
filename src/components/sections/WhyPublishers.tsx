import { Container } from "@/components/ui/Container";

const PUBLISHER_FEATURES = [
  "Maximum guest post orders",
  "High earning commissions",
  "Lifetime monetization",
  "HQ SEO-optimized articles",
  "Payment security",
  "Payment within 24 hours",
  "24/7 support",
];

export function WhyPublishers() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container className="max-w-[1440px]">
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-center mb-12 font-[var(--font-heading)] leading-tight">
          <span className="text-[#7FC142]">Why Publishers</span> Choose Us?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Feature list */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ul className="space-y-3">
              {PUBLISHER_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-4">
                  <img 
                    src="/images/hand-point-right.svg" 
                    alt="icon" 
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mt-1 lg:mt-1.5 shrink-0" 
                  />
                  <span className="text-[16px] md:text-[20px] lg:text-[24px] lg:leading-[40px] text-black font-normal">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Video - Right side */}
          <div className="lg:col-span-7 order-1 lg:order-2 w-full">
            <div className="relative rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.01] duration-500 bg-black aspect-video">
              <iframe
                src="https://www.youtube.com/embed/6vngBA4R6xs"
                title="Why Publishers Choose Us"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
