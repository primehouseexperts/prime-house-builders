import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  // background.jpg should be served from the site root.
  // Put the file here: prime-house-builders/public/background.jpg
  const bgUrl = `${import.meta.env.BASE_URL}background.jpg`;

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-6 leading-tight">
            Building The <br />
            <span className="italic text-amber-500">Future</span> Today
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 mb-10 font-light tracking-wide">
            Prime House Builders specializes in high-end construction contracts, bringing architectural visions to life with unparalleled craftsmanship.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-amber-500 transition-all transform hover:scale-105 w-full sm:w-auto text-center"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all w-full sm:w-auto text-center"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-amber-500 -translate-y-full animate-scroll"></div>
        </div>
      </motion.div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll {
          animation: scroll 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
