import React from 'react';
import { ShieldCheck, ArrowUpRight, Phone, Mail, MapPin, MessageSquare, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E7DFD5] dark:border-[#262420] bg-white dark:bg-[#121110] text-stone-600 dark:text-stone-400 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E7DFD5] dark:border-[#262420]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-xl font-bold font-display text-amber-700 dark:text-amber-400">
                SEAN CEILINGS
              </span>
              <span className="text-xs font-mono text-stone-400">ZIMBABWE GYPSUM</span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm text-stone-600 dark:text-stone-400">
              Specialist contractors for <strong className="text-stone-900 dark:text-stone-200">ceiling installation and designing, deck dropping, wall skimming and painting</strong> across Harare and Zimbabwe nationwide.
            </p>

            <div className="pt-1 flex items-center gap-2.5 text-xs font-mono text-stone-600 dark:text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Standards Association of Zimbabwe (SAZ) &middot; ASTM C840 Level 5</span>
            </div>

            {/* Social Channels with Orange Colors */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase text-orange-600 dark:text-orange-400 font-semibold mb-2.5 tracking-wider">
                Follow Sean Ceilings
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://facebook.com/seanceilings"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 text-orange-600 dark:text-orange-400 hover:text-white dark:hover:text-white transition-all shadow-2xs text-xs font-semibold group cursor-pointer"
                  title="Follow Sean Ceilings on Facebook"
                  aria-label="Sean Ceilings Facebook"
                >
                  <Facebook className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://instagram.com/seanceilings"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 text-orange-600 dark:text-orange-400 hover:text-white dark:hover:text-white transition-all shadow-2xs text-xs font-semibold group cursor-pointer"
                  title="Follow Sean Ceilings on Instagram"
                  aria-label="Sean Ceilings Instagram"
                >
                  <Instagram className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-stone-900 dark:text-white font-bold tracking-wider">
              Sean Ceilings
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#gallery" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Our Ceiling Projects Gallery
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Our 4-Stage Installation Process
                </a>
              </li>
              <li>
                <a href="#plaster-systems" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Gyproc RhinoSet Standards
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Client Reviews &amp; Testimonials
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-bold text-amber-700 dark:text-amber-400">
                  Instant USD Quotation Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details in Zimbabwe */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase text-stone-900 dark:text-white font-bold tracking-wider">
              Harare Studio &amp; WhatsApp Direct
            </div>
            <div className="text-xs space-y-2.5 text-stone-500 dark:text-stone-400 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Harare, Zimbabwe (Operating across Borrowdale, Highlands, Glen Lorne &amp; Nationwide)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <a href="tel:+263777063455" className="hover:text-amber-600 font-bold">+263 77 706 3455</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a 
                  href="https://wa.me/263777063455" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                >
                  WhatsApp: +263 77 706 3455
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>quotes@seanceilings.co.zw</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Sean Ceilings Zimbabwe. All architectural project photography rights reserved.
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/seanceilings"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-orange-600 dark:text-orange-400 hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
              title="Facebook"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/seanceilings"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-orange-600 dark:text-orange-400 hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
