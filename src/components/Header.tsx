import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, ChevronDown, ArrowUpRight, Menu, X, ShieldCheck, Sparkles, Calculator, Layers, Phone } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenQuote: () => void;
  onSelectProject: (projectId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenQuote,
  onSelectProject,
}) => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<'projects' | 'systems' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#121110]/90 border-b border-[#E7DFD5] dark:border-[#262420] transition-colors duration-200">
      <div 
        ref={navRef}
        className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8"
      >
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="group flex items-baseline gap-2.5 text-xl font-bold tracking-tight text-stone-900 dark:text-[#F5F2EB] whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
        >
          <span className="font-display tracking-tight text-amber-700 dark:text-amber-400">SEAN CEILINGS</span>
          <span className="text-[11px] font-mono font-medium text-stone-500 dark:text-stone-400 hidden sm:inline">
            ZIMBABWE GYPSUM
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          {/* Projects Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('projects')}
          >
            <button
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'projects' ? null : 'projects')}
              className={`flex items-center gap-1.5 py-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMegaMenu === 'projects' ? 'text-amber-700 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              <span>Our Ceiling Works</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'projects' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Plaster Systems Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('systems')}
          >
            <button
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'systems' ? null : 'systems')}
              className={`flex items-center gap-1.5 py-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMegaMenu === 'systems' ? 'text-amber-700 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              <span>Gypsum &amp; RhinoSet Systems</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'systems' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Craftsmanship Method Link */}
          <a
            href="#craftsmanship"
            onClick={(e) => { e.preventDefault(); handleNavClick('#craftsmanship'); }}
            className="py-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Our Process
          </a>

          {/* Testimonials */}
          <a
            href="#testimonials"
            onClick={(e) => { e.preventDefault(); handleNavClick('#testimonials'); }}
            className="py-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>

          {/* Calculator Link */}
          <a
            href="#calculator"
            onClick={(e) => { e.preventDefault(); handleNavClick('#calculator'); }}
            className="flex items-center gap-1.5 py-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-amber-700 dark:text-amber-400 font-semibold"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>USD Quote</span>
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Call Link */}
          <a
            href="tel:+263777063455"
            className="hidden md:flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 py-1 px-2.5 rounded-lg border border-[#E7DFD5] dark:border-[#332E29]"
            title="Call Sean Ceilings"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>077 706 3455</span>
          </a>

          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          <button
            onClick={onOpenQuote}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Get Quote (USD)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ================= MEGA MENU: PROJECTS ================= */}
      {activeMegaMenu === 'projects' && (
        <div 
          onMouseLeave={() => setActiveMegaMenu(null)}
          className="hidden lg:block absolute top-full left-0 w-full bg-[#FAF8F5] dark:bg-[#151413] border-b border-[#E7DFD5] dark:border-[#2E2A25] shadow-2xl transition-all animate-in fade-in duration-150"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-4 border-r border-[#E7DFD5] dark:border-[#2E2A25] pr-6 space-y-4">
                <span className="text-xs font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider font-semibold block">
                  Sean Ceilings Portfolio Archives
                </span>
                <div className="space-y-1">
                  <a
                    href="#gallery"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }}
                    className="block p-3 rounded-xl hover:bg-white dark:hover:bg-[#1E1C19] transition-colors"
                  >
                    <div className="text-sm font-semibold text-stone-900 dark:text-[#F5F2EB]">
                      Multi-Tier &amp; Tray Ceilings
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Recessed lighting trays, coffered grids, and contemporary bulkheads across Harare.
                    </div>
                  </a>
                  <a
                    href="#gallery"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }}
                    className="block p-3 rounded-xl hover:bg-white dark:hover:bg-[#1E1C19] transition-colors"
                  >
                    <div className="text-sm font-semibold text-stone-900 dark:text-[#F5F2EB]">
                      Curved Radial Bulkheads &amp; Coves
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Seamless radial curves and circular cove lighting hand-shaped with precision.
                    </div>
                  </a>
                  <a
                    href="#gallery"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }}
                    className="block p-3 rounded-xl hover:bg-white dark:hover:bg-[#1E1C19] transition-colors"
                  >
                    <div className="text-sm font-semibold text-stone-900 dark:text-[#F5F2EB]">
                      RhinoBoard &amp; Brickwork Skimming
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Direct skim coats over rough sand-cement plastered brick walls using RhinoSet.
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-span-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                    Recent Sean Ceilings Installations
                  </span>
                  <a 
                    href="#gallery" 
                    onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }}
                    className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Skim Full Gallery</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {PROJECTS.slice(0, 3).map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        onSelectProject(project.id);
                        setActiveMegaMenu(null);
                      }}
                      className="group text-left p-2.5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1A1815] hover:border-amber-500/60 transition-all cursor-pointer"
                    >
                      <div className="aspect-16/10 rounded-xl overflow-hidden bg-stone-900 mb-2 relative">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-xs font-bold text-stone-900 dark:text-[#F5F2EB] truncate">
                        {project.title}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-0.5 flex items-center gap-1.5">
                        <span className="truncate">{project.location}</span>
                        <span>·</span>
                        <span>{project.areaM2}m²</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MEGA MENU: SYSTEMS ================= */}
      {activeMegaMenu === 'systems' && (
        <div 
          onMouseLeave={() => setActiveMegaMenu(null)}
          className="hidden lg:block absolute top-full left-0 w-full bg-[#FAF8F5] dark:bg-[#151413] border-b border-[#E7DFD5] dark:border-[#2E2A25] shadow-2xl transition-all animate-in fade-in duration-150"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="p-5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1A1815]">
                <div className="flex items-center gap-2 text-stone-900 dark:text-[#F5F2EB] font-bold text-sm mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Gyproc RhinoSet Level 5 Skim</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3 leading-relaxed">
                  Sean Ceilings applies continuous 2.5mm RhinoSet coats over Gyproc RhinoBoard, eliminating texture and joint flash under morning Highveld light.
                </p>
                <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 space-y-1">
                  <div>· 2.0mm to 3.0mm continuous coat</div>
                  <div>· SAZ &amp; ASTM C840 Grade 5 compliant</div>
                  <div>· Zero joint flashing guaranteed</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1A1815]">
                <div className="flex items-center gap-2 text-stone-900 dark:text-[#F5F2EB] font-bold text-sm mb-2">
                  <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Cretestone Concrete &amp; Brick Skim</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3 leading-relaxed">
                  Direct gypsum plaster skim over rough sand-cement plastered brickwork and concrete slabs common in Zimbabwean residential construction.
                </p>
                <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 space-y-1">
                  <div>· High-adhesion bonding primer</div>
                  <div>· No hacking of smooth concrete needed</div>
                  <div>· Satin marble paint-ready finish</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1A1815]">
                <div className="flex items-center gap-2 text-stone-900 dark:text-[#F5F2EB] font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Custom Drywall Bulkheads &amp; Reglets</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mb-3 leading-relaxed">
                  Stepped drop ceilings, coffered designs, and perimeter shadow gaps with concealed LED troughs that replace dated timber cornices.
                </p>
                <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 space-y-1">
                  <div>· Symmetrical stepped designs</div>
                  <div>· Galvanized bead reinforcement</div>
                  <div>· Integrated cove lighting</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E7DFD5] dark:border-[#262420] bg-[#FAF8F5] dark:bg-[#151413] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <a
              href="#gallery"
              onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }}
              className="py-2 text-stone-800 dark:text-stone-200"
            >
              Our Ceiling Works Gallery
            </a>
            <a
              href="#craftsmanship"
              onClick={(e) => { e.preventDefault(); handleNavClick('#craftsmanship'); }}
              className="py-2 text-stone-800 dark:text-stone-200"
            >
              Our Installation Process
            </a>
            <a
              href="#plaster-systems"
              onClick={(e) => { e.preventDefault(); handleNavClick('#plaster-systems'); }}
              className="py-2 text-stone-800 dark:text-stone-200"
            >
              Gyproc RhinoSet Standards
            </a>
            <a
              href="#testimonials"
              onClick={(e) => { e.preventDefault(); handleNavClick('#testimonials'); }}
              className="py-2 text-stone-800 dark:text-stone-200"
            >
              Client Reviews (Harare &amp; Zim)
            </a>
            <a
              href="#calculator"
              onClick={(e) => { e.preventDefault(); handleNavClick('#calculator'); }}
              className="py-2 text-amber-700 dark:text-amber-400 font-bold"
            >
              Instant USD Quotation Calculator
            </a>
            <a
              href="tel:+263777063455"
              className="py-2 flex items-center gap-2 text-amber-600 font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +263 77 706 3455</span>
            </a>
          </nav>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
            className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-xs cursor-pointer"
          >
            Get Instant USD Quotation
          </button>
        </div>
      )}
    </header>
  );
};
