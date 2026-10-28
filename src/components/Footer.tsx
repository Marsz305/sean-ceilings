import React from 'react';
import { ShieldCheck, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

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
                RHINO &amp; TROWEL
              </span>
              <span className="text-xs font-mono text-stone-400">ZIMBABWE GYPSUM</span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm text-stone-500 dark:text-stone-400">
              Specialist contractors and architectural consultants for interior gypsum wall &amp; ceiling skimming, RhinoBoard joints, Cretestone masonry skimming, and perimeter shadowline reglets in Zimbabwe.
            </p>

            <div className="pt-2 flex items-center gap-2.5 text-xs font-mono text-stone-600 dark:text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Standards Association of Zimbabwe (SAZ) &middot; ASTM C840 Level 5</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-stone-900 dark:text-white font-bold tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#gallery" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Photography Works Gallery
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  4-Stage Skimming Method
                </a>
              </li>
              <li>
                <a href="#plaster-systems" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Gyproc RhinoSet Standards
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Harare Architect Reviews
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
              Harare Studio &amp; Estimations
            </div>
            <div className="text-xs space-y-2 text-stone-500 dark:text-stone-400 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>18 Emmerson Mnangagwa Rd, Highlands, Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>+263 (0) 772 148 920 &middot; +263 (0) 242 744 380</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>quotes@rhinoskim.co.zw</span>
              </div>
              <div className="pt-2 text-[11px] text-stone-400">
                Active teams across Borrowdale, Highlands, Glen Lorne, Bulawayo &amp; Victoria Falls.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Rhino &amp; Trowel Zimbabwe. All architectural photography rights reserved.
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
