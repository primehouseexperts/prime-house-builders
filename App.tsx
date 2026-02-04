import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Projects from './components/Projects.tsx';
import Services from './components/Services.tsx';
import Contact from './components/Contact.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import { ProjectConfig } from './types.ts';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectConfig | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] selection:bg-amber-500 selection:text-white">
      <Header scrolled={scrolled} />
      
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="py-24 bg-neutral-900/30">
          <About />
        </section>

        <section id="projects" className="py-24">
          <Projects onProjectSelect={setSelectedProject} />
        </section>

        <section id="services" className="py-24 bg-neutral-900/30">
          <Services />
        </section>

        <section id="contact" className="py-24">
          <Contact />
        </section>
      </main>

      <footer className="py-12 border-t border-white/10 text-center text-neutral-500 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl text-white mb-4">Prime House Builders & Experts </h2>
          <p className="max-w-md mx-auto mb-8 text-sm">
            Crafting exceptional structures with precision and passion since 2005. 
            We take building contracts and deliver dreams.
          </p>
          <p className="text-xs text-neutral-600">&copy; {new Date().getFullYear()} Prime House Builders. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
