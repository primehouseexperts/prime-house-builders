import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, Instagram, Facebook } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  // Honeypot (spam trap)
  gotcha: string;
};

const DEFAULT_PROJECT_TYPE = 'Custom Residential Home';

// ✅ Edit these to your real links
const CONTACT_LINKS = {
  websiteUrl: 'https://primehousebuilders.xyz/',
  instagramUrl: 'https://instagram.com/primehousebuilders', // change
  facebookUrl: 'https://facebook.com/primehousebuilders',   // change
  whatsappNumberE164: '+971500000000', // change (E.164 format)
};

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.11 17.06c-.28-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.61.14-.18.28-.7.89-.86 1.07-.16.18-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.5-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.46h-.52c-.18 0-.46.07-.7.35-.25.28-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.82.14.18 1.93 2.95 4.68 4.13.65.28 1.15.45 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32z" />
    <path d="M26.72 5.28A14.55 14.55 0 0 0 16.03 1C8.01 1 1.5 7.51 1.5 15.53c0 2.56.67 5.04 1.95 7.23L1.4 31l8.4-2.01a14.5 14.5 0 0 0 6.23 1.4h.01c8.02 0 14.53-6.51 14.53-14.53 0-3.88-1.51-7.53-4.25-10.58zM16.03 27.86h-.01c-2.08 0-4.12-.56-5.9-1.62l-.42-.25-4.98 1.19 1.33-4.85-.27-.49a12.32 12.32 0 0 1-1.63-6.31c0-6.81 5.54-12.35 12.35-12.35 3.3 0 6.39 1.29 8.72 3.62a12.28 12.28 0 0 1 3.62 8.73c0 6.81-5.54 12.35-12.35 12.35z" />
  </svg>
);

const Contact: React.FC = () => {
  const endpoint = useMemo(() => {
    return (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT as string | undefined;
  }, []);

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    projectType: DEFAULT_PROJECT_TYPE,
    message: '',
    gotcha: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (status !== 'idle') setStatus('idle');
      if (errorMsg) setErrorMsg('');
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: bots fill hidden field; silently succeed.
    if (form.gotcha.trim().length > 0) {
      setStatus('success');
      return;
    }

    if (!endpoint) {
      setStatus('error');
      setErrorMsg('Form endpoint is not configured. Set VITE_FORMSPREE_ENDPOINT in .env.local and redeploy.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMsg('');

    try {
      const payload = {
        name: form.name,
        email: form.email,
        projectType: form.projectType,
        message: form.message,
        _subject: `New inquiry — ${form.projectType}`,
        _replyto: form.email,
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let details = '';
        try {
          const j = await res.json();
          details = j?.error || j?.message || '';
        } catch {
          // ignore
        }
        throw new Error(details || `Request failed with status ${res.status}`);
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        projectType: DEFAULT_PROJECT_TYPE,
        message: '',
        gotcha: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Could not send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = useMemo(() => {
    const num = CONTACT_LINKS.whatsappNumberE164.replace(/[^\d+]/g, '');
    // wa.me expects digits only (no +). Use api.whatsapp.com as a safe fallback.
    const digitsOnly = num.replace('+', '');
    return `https://wa.me/${digitsOnly}`;
  }, []);

  const SocialIconButton = ({
    href,
    children,
    label,
  }: {
    href: string;
    children: React.ReactNode;
    label: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 hover:text-black hover:bg-amber-500 transition-colors"
    >
      {children}
    </a>
  );

  return (
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-10 leading-tight">
            Ready to Build Your <span className="italic">Vision?</span>
          </h2>

          <div className="space-y-8 mb-10">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 mr-6 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Our Office</h4>
                <p className="text-neutral-400">
                  123 Construction Avenue, Suite 500
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 mr-6 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Phone</h4>
                <p className="text-neutral-400">+1 (555) 0123-4567</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 mr-6 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Email</h4>
                <p className="text-neutral-400">contracts@primebuilders.com</p>
              </div>
            </div>

            {/* ✅ Website URL below Email */}
            <div className="flex items-start">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center text-amber-500 mr-6 shrink-0">
                <Globe size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Website</h4>
                <a
                  href={CONTACT_LINKS.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-500 transition-colors"
                >
                  {CONTACT_LINKS.websiteUrl}
                </a>
              </div>
            </div>
          </div>

          {/* ✅ Social icons row */}
          <div className="border-t border-white/10 pt-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">Connect with us</div>
            <div className="flex items-center gap-3">
              <SocialIconButton href={whatsappUrl} label="WhatsApp">
                <WhatsAppIcon size={22} />
              </SocialIconButton>

              <SocialIconButton href={CONTACT_LINKS.instagramUrl} label="Instagram">
                <Instagram size={22} />
              </SocialIconButton>

              <SocialIconButton href={CONTACT_LINKS.facebookUrl} label="Facebook">
                <Facebook size={22} />
              </SocialIconButton>
            </div>

            <div className="mt-3 text-[11px] text-neutral-500">
              Update links in <span className="text-neutral-300">components/Contact.tsx</span> →{' '}
              <span className="text-neutral-300">CONTACT_LINKS</span>.
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
            {/* Honeypot (spam trap) */}
            <input
              type="text"
              name="_gotcha"
              value={form.gotcha}
              onChange={onChange('gotcha')}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={onChange('name')}
                  className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange('email')}
                  className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Project Type</label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={onChange('projectType')}
                className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none"
              >
                <option className="bg-neutral-900">Custom Residential Home</option>
                <option className="bg-neutral-900">Renovation / Extension</option>
                <option className="bg-neutral-900">Commercial Build</option>
                <option className="bg-neutral-900">Other Contract Work</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={onChange('message')}
                className="w-full bg-white/5 border-b border-white/10 p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {status === 'success' && (
              <div className="border border-amber-500/30 bg-amber-500/10 text-amber-200 px-4 py-3 text-sm">
                Thank you — your inquiry has been sent. We’ll get back to you shortly.
              </div>
            )}

            {status === 'error' && (
              <div className="border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                {errorMsg || 'Could not send your message. Please try again.'}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 bg-amber-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center group ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <span className="mr-3">{isSubmitting ? 'Sending…' : 'Send Inquiry'}</span>
              <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {!endpoint && (
              <div className="text-[11px] text-neutral-500">
                Formspree is not configured yet. Set <span className="text-neutral-300">VITE_FORMSPREE_ENDPOINT</span> in{' '}
                <span className="text-neutral-300">.env.local</span> and redeploy.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
