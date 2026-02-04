import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants.tsx';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex flex-col">
          <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tighter text-white">
            PRIME<span className="text-amber-500">HOUSE</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 -mt-1">
            Builders & Experts
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              className="text-sm font-medium uppercase tracking-widest text-neutral-300 hover:text-amber-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2 bg-amber-500 text-black text-sm font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1"
          >
            Get a Quote
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 md:hidden flex flex-col items-center py-8 space-y-6"
          >
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium uppercase tracking-widest text-neutral-300 hover:text-amber-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 bg-amber-500 text-black text-sm font-bold uppercase tracking-widest"
            >
              Get a Quote
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
