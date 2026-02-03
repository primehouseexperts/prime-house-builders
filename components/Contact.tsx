
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. Our team will contact you shortly.");
  };

  return (
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-10 leading-tight">
            Ready to Build Your <span className="italic">Vision?</span>
          </h2>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 rounded-none mr-6 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Our Office</h4>
                <p className="text-neutral-400">123 Construction Avenue, Suite 500<br />New York, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 rounded-none mr-6 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Phone</h4>
                <p className="text-neutral-400">+1 (555) 0123-4567</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 rounded-none mr-6 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Email</h4>
                <p className="text-neutral-400">contracts@primebuilders.com</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-neutral-900/30 p-8 md:p-12 border border-white/5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Project Type</label>
              <select className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                <option className="bg-neutral-900">Custom Residential Home</option>
                <option className="bg-neutral-900">Renovation / Extension</option>
                <option className="bg-neutral-900">Commercial Build</option>
                <option className="bg-neutral-900">Other Contract Work</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Message</label>
              <textarea 
                rows={4}
                required
                className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-amber-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center group"
            >
              <span className="mr-3">Send Inquiry</span>
              <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
