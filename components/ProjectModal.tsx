import React, { useEffect, useState } from 'react';
import type { ProjectConfig } from '../types';
import { motion } from 'framer-motion';
import { X, ChevronLeft, Loader2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectConfig;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [descriptionHtml, setDescriptionHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const base = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const fetchContent = async () => {
      try {
        const response = await fetch(`${base}projects/${project.folder}/markdown.md`, { cache: 'no-cache' });
        if (!response.ok) throw new Error('Markdown file not found');
        const text = await response.text();

        // marked is loaded globally from index.html (CDN)
        // @ts-ignore
        if (window.marked?.parse) {
          // @ts-ignore
          setDescriptionHtml(window.marked.parse(text));
        } else {
          setDescriptionHtml(text.replace(/\n/g, '<br/>'));
        }
      } catch (err) {
        console.warn(`Failed to load markdown for ${project.folder}`, err);
        setDescriptionHtml(`
          <h2>${project.displayName}</h2>
          <p>This project archive is currently being updated.</p>
          <p>Please ensure <code>public/projects/${project.folder}/markdown.md</code> exists.</p>
        `);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project, base]);

  const galleryImages = [
    `${base}projects/${project.folder}/images/${project.thumbnail}`,
    `${base}projects/${project.folder}/images/2.jpg`,
    `${base}projects/${project.folder}/images/3.jpg`,
    `${base}projects/${project.folder}/images/4.jpg`,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12"
    >
      <div className="absolute inset-0 bg-black/98" onClick={onClose} />

      {/* Outer container (no scroll) */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="relative w-full max-w-[1600px] h-full md:h-[90vh] bg-neutral-900 shadow-2xl overflow-hidden"
      >
        {/* ✅ Single scroll container for EVERYTHING */}
        <div className="h-full overflow-y-auto">
          {/* Sticky top bar with close button */}
          <div className="sticky top-0 z-[120] flex items-center justify-end p-6 bg-neutral-900/85 backdrop-blur border-b border-white/5">
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full hover:bg-amber-500 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row lg:items-start">
            {/* Left section (NO internal scroll) */}
            <div className="lg:w-2/5 p-8 md:p-16 lg:p-20 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-white/5">
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
                Project Specification
              </span>

              <h2 className="font-serif text-5xl md:text-7xl text-white mb-10 leading-tight">{project.displayName}</h2>

              {loading ? (
                <div className="flex items-center text-neutral-500">
                  <Loader2 className="animate-spin mr-3" />
                  <span>Fetching archive data...</span>
                </div>
              ) : (
                <div
                  className="markdown-content text-neutral-400 font-light text-lg space-y-6 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              )}

              <div className="mt-14 pt-10 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Status</span>
                <span className="text-white text-sm uppercase">Delivered</span>
              </div>

              <button
                onClick={onClose}
                className="mt-12 flex items-center text-amber-500 text-xs font-bold uppercase tracking-widest group"
              >
                <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-2 transition-transform" />
                Back to Catalog
              </button>
            </div>

            {/* Right section (NO internal scroll) */}
            <div className="lg:w-3/5 bg-black">
              <div className="p-6 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={img}
                          alt={`${project.displayName} view ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (idx === 0) {
                              target.src =
                                'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200';
                            } else {
                              // Hide missing optional images
                              (target.parentElement as HTMLElement).style.display = 'none';
                            }
                          }}
                        />

                        <div className="absolute top-6 left-6 text-white/10 text-8xl md:text-9xl font-serif font-black select-none pointer-events-none">
                          0{idx + 1}
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-black/40 backdrop-blur-sm border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.35em] text-neutral-300">
                          Gallery View 0{idx + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-16 md:p-20 text-center bg-black border-t border-white/5">
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
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
