import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch('./about/about.md');
        if (!res.ok) throw new Error('About file not found');
        const text = await res.text();
        
        // Use the global marked library provided via CDN in index.html
        // @ts-ignore
        if (window.marked) {
          // @ts-ignore
          setContent(window.marked.parse(text));
        } else {
          setContent(text.replace(/\n/g, '<br/>'));
        }
      } catch (err) {
        console.warn("Could not load about.md, using fallback content.");
        setError(true);
      }
    };

    loadContent();
  }, []);

  const fallbackContent = `
    <h2>Our Story</h2>
    <p>Prime House Builders has established itself as a premier construction partner for discerning clients. We manage every phase of the project, ensuring that the transition from architectural concept to physical reality is seamless, transparent, and superior in quality.</p>
    <p>Please create a folder named <strong>about</strong> and a file named <strong>about.md</strong> in your project root to customize this text.</p>
  `;

  return (
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 border-[12px] border-amber-500/20 translate-x-4 translate-y-4 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1541913057815-998214f4a363?auto=format&fit=crop&q=80&w=1024" 
              alt="Architectural Planning"
              className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500 z-0 hidden lg:block"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">About Our Company</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
            Excellence In Every <span className="italic">Square Inch</span>
          </h2>
          
          <div 
            className="markdown-content prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: error ? fallbackContent : content }}
          />
          
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
            <div>
              <div className="text-4xl font-serif text-amber-500 mb-1">15+</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-amber-500 mb-1">200+</div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Projects Completed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;