'use client';

import { motion } from 'framer-motion';

export function FullscreenLoading() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6EBD44]/10 rounded-full blur-[150px] opacity-30" />
      
      <div className="relative">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-gray-100 border-t-[#6EBD44] rounded-full"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
              y: [0, -4, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="z-10"
          >
            <img 
              src="/images/backlink-cat-logo.svg" 
              alt="Loading" 
              className="w-14 h-14 drop-shadow-sm"
            />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-2 px-6"
      >
        <div className="h-px w-8 bg-gray-200" />
        <span className="text-[10px] text-gray-400 tracking-widest uppercase font-(--font-inter)">
          BacklinkCAT Professional Marketplace
        </span>
        <div className="h-px w-8 bg-gray-200" />
      </motion.div>
    </div>
  );
}


