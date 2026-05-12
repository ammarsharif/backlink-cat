import { Container } from "@/components/ui/Container";

const MARKETER_FEATURES = [
  "Save 1000's of dollars",
  "100k verified publishers",
  "Competitive guest post prices",
  "Instant publishing",
  "Instant increasing traffic",
  "Easy whitehat link building",
  "24/7 support",
];

export function WhyMarketers() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container className="max-w-[1440px]">
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-center mb-12 font-[var(--font-heading)] leading-tight">
          <span className="text-[#7FC142]">Why Marketers</span> Choose Us?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Video - Left side */}
          <div className="lg:col-span-7 w-full order-1">
            <div className="relative rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.01] duration-500 bg-black aspect-video">
              <iframe
                src="https://www.youtube.com/embed/d_1qbfemY68"
                title="Why Marketers Choose Us"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Feature list - Right side */}
          <div className="lg:col-span-5 w-full order-2">
            <ul className="space-y-3">
              {MARKETER_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-4">
                  <img 
                    src="/images/hand-point-right.svg" 
                    alt="icon" 
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mt-1 lg:mt-1.5 shrink-0" 
                  />
                  <span className="text-[15px] md:text-[18px] lg:text-[20px] lg:leading-[32px] text-black font-normal">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
