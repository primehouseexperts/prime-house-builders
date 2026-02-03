
import React from 'react';
import { ProjectConfig } from '../types';
import { PROJECT_REGISTRY } from '../constants';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectsProps {
  onProjectSelect: (project: ProjectConfig) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Portfolio</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white">Selected <span className="italic">Projects</span></h2>
        </div>
        <p className="max-w-md text-neutral-400 font-light">
          Explore our collection of high-end managed builds and turnkey building contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {PROJECT_REGISTRY.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-[500px] lg:h-[650px] overflow-hidden cursor-pointer bg-neutral-900 shadow-2xl"
            onClick={() => onProjectSelect(project)}
          >
            {/* Background Image with fallbacks */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ 
                backgroundImage: `url(./projects/${project.folder}/images/${project.thumbnail}), url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200)` 
              }}
            >
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
            </div>

            {/* Bottom Content Area - Fixed to bottom as requested */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block opacity-0 group-hover:opacity-100 transition-opacity">
                CONTRACT DELIVERED
              </span>
              <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                {project.displayName}
              </h3>
              <div className="flex items-center text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700">
                <span className="mr-3 underline underline-offset-8 decoration-amber-500">View Project Details</span>
                <ExternalLink size={14} className="text-amber-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
