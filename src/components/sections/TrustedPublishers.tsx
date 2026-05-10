"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { 
  Globe, 
  Cpu, 
  Layers, 
  Zap, 
  Target, 
  Award, 
  Cloud, 
  Anchor, 
  Activity, 
  Feather,
  LucideIcon
} from "lucide-react";

interface Publisher {
  id: string;
  name: string;
  Icon: LucideIcon;
}

const PUBLISHERS: Publisher[] = [
  { id: "1", name: "Global News", Icon: Globe },
  { id: "2", name: "Tech Pulse", Icon: Cpu },
  { id: "3", name: "Stack Labs", Icon: Layers },
  { id: "4", name: "Instant Media", Icon: Zap },
  { id: "5", name: "Precision Ads", Icon: Target },
  { id: "6", name: "Elite Press", Icon: Award },
  { id: "7", name: "Cloud Network", Icon: Cloud },
  { id: "8", name: "Steady Stream", Icon: Anchor },
  { id: "9", name: "Health Wire", Icon: Activity },
  { id: "10", name: "Creative Ink", Icon: Feather },
];

// Duplicate for seamless loop
const SCROLL_LOGOS = [...PUBLISHERS, ...PUBLISHERS, ...PUBLISHERS];

export function TrustedPublishers() {
  return (
    <section className="py-20 bg-white border-y border-[#F0F0F0] overflow-hidden">
      <Container>
        <h2 className="text-[28px] md:text-[42px] font-bold text-center mb-16 font-[var(--font-inter)] tracking-tight">
          100K+ Trusted Publishers <span className="text-[#6EBD44]">Worldwide</span>
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />

          <motion.div 
            className="flex items-center gap-12 md:gap-20 w-max"
            animate={{ 
              x: [0, -2000] 
            }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {SCROLL_LOGOS.map((pub, idx) => (
              <div
                key={`${pub.id}-${idx}`}
                className="flex items-center gap-2.5 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 group"
              >
                <pub.Icon className="w-6 h-6 md:w-8 md:h-8 text-[#6EBD44] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-[16px] md:text-[20px] font-bold text-[#333333] whitespace-nowrap tracking-tight">
                  {pub.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

