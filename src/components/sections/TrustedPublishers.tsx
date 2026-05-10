"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const PUBLISHERS = [
  { id: "1", name: "TechCrunch", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png" },
  { id: "2", name: "Forbes", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Forbes_logo.svg/2560px-Forbes_logo.svg.png" },
  { id: "3", name: "Inc.", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Inc._magazine_logo.svg/2560px-Inc._magazine_logo.svg.png" },
  { id: "4", name: "Bloomberg", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bloomberg_logo.svg/2560px-Bloomberg_logo.svg.png" },
  { id: "5", name: "Reuters", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Reuters_logo.svg/2560px-Reuters_logo.svg.png" },
  { id: "6", name: "The Verge", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/The_Verge_logo.svg/2560px-The_Verge_logo.svg.png" },
  { id: "7", name: "The Guardian", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/The_Guardian_2018.svg/2560px-The_Guardian_2018.svg.png" },
  { id: "8", name: "Fast Company", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Fast_Company_logo.svg/2560px-Fast_Company_logo.svg.png" },
];

// Duplicate for seamless loop
const SCROLL_LOGOS = [...PUBLISHERS, ...PUBLISHERS];

export function TrustedPublishers() {
  return (
    <section className="py-20 bg-white border-y border-[#F0F0F0] overflow-hidden">
      <Container>
        <h2 className="text-[28px] md:text-[42px] font-bold text-center mb-16 font-[var(--font-heading)]">
          100K+ Trusted Publishers <span className="text-[#7FC142]">Worldwide</span>
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />

          <motion.div 
            className="flex items-center gap-16 md:gap-24 w-max"
            animate={{ 
              x: [0, -1500] 
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {SCROLL_LOGOS.map((pub, idx) => (
              <div
                key={`${pub.id}-${idx}`}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={pub.logo}
                  alt={pub.name}
                  className="h-8 md:h-12 w-auto object-contain pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
