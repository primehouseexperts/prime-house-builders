
import React from 'react';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Expertise</span>
        <h2 className="font-serif text-4xl md:text-6xl text-white">Full-Cycle <span className="italic">Construction</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-10 bg-black hover:bg-neutral-900 transition-colors duration-500 group"
          >
            <div className="text-amber-500 mb-8 transform group-hover:-translate-y-2 transition-transform duration-500">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{service.title}</h3>
            <p className="text-neutral-400 font-light leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
