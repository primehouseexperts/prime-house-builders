
import React, { useEffect, useState } from 'react';
import { ProjectConfig } from '../types';
import { motion } from 'framer-motion';
import { X, ChevronLeft, Loader2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectConfig;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [descriptionHtml, setDescriptionHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const fetchContent = async () => {
      try {
        const response = await fetch(`./projects/${project.folder}/markdown.md`);
        if (!response.ok) throw new Error('Markdown file not found');
        const text = await response.text();
        
        // Safety check for marked library
        // @ts-ignore
        if (window.marked && typeof window.marked.parse === 'function') {
          // @ts-ignore
          setDescriptionHtml(window.marked.parse(text));
        } else {
          setDescriptionHtml(text.replace(/\n/g, '<br/>'));
        }
      } catch (err) {
        console.warn(`Failed to load markdown for ${project.folder}`);
        setDescriptionHtml(`
          <h2>${project.displayName}</h2>
          <p>This project archive is currently being updated.</p>
          <p>Please ensure <code>projects/${project.folder}/markdown.md</code> exists in your repository.</p>
        `);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  const galleryImages = [
    `./projects/${project.folder}/images/${project.thumbnail}`,
    `./projects/${project.folder}/images/2.jpg`,
    `./projects/${project.folder}/images/3.jpg`,
    `./projects/${project.folder}/images/4.jpg`
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12"
    >
      <div className="absolute inset-0 bg-black/98" onClick={onClose}></div>

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="relative w-full max-w-[1600px] h-full md:h-[90vh] bg-neutral-900 overflow-hidden shadow-2xl flex flex-col lg:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[120] w-12 h-12 bg-white text-black flex items-center justify-center rounded-full hover:bg-amber-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="lg:w-2/5 p-8 md:p-16 lg:p-24 overflow-y-auto bg-neutral-900 border-r border-white/5 scrollbar-hide">
          <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Project Specification</span>
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-10 leading-tight">
            {project.displayName}
          </h2>

          {loading ? (
            <div className="flex items-center text-neutral-500">
              <Loader2 className="animate-spin mr-3" />
              <span>Fetching archive data...</span>
            </div>
          ) : (
            <div 
              className="markdown-content text-neutral-400 font-light text-lg space-y-6"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          )}

          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Path</span>
              <span className="text-white text-[10px] font-mono">/projects/{project.folder}/</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Status</span>
              <span className="text-white text-sm uppercase">Delivered</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="mt-12 flex items-center text-amber-500 text-xs font-bold uppercase tracking-widest group"
          >
            <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-2 transition-transform" />
            Back to Catalog
          </button>
        </div>

        <div className="lg:w-3/5 bg-black overflow-y-auto scroll-smooth">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
              <img 
                src={img} 
                alt={`${project.displayName} view ${idx + 1}`} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // If it's the first image and it fails, show a placeholder
                  if (idx === 0) {
                    target.src = `https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200`;
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
              <div className="absolute top-10 left-10 text-white/10 text-9xl font-serif font-black select-none pointer-events-none">
                0{idx + 1}
              </div>
            </div>
          ))}
          
          <div className="p-20 text-center bg-black border-t border-white/5">
            <h3 className="font-serif text-3xl text-white mb-6 italic">Want to discuss a similar project?</h3>
            <a 
              href="#contact" 
              onClick={onClose}
              className="inline-block px-12 py-5 bg-amber-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1"
            >
              Request Consultation
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
