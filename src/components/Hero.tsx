import React from 'react';
import { ArrowDownRight, Sparkles, ShieldCheck, CheckCircle2, MapPin, Hammer, Layers, Paintbrush, Award } from 'lucide-react';

interface HeroProps {
  onExploreGallery: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGallery, onOpenCalculator }) => {
  return (
    <section className="relative pt-12 pb-20 border-b border-[#E7DFD5] dark:border-[#262420] bg-[#FAF8F5] dark:bg-[#121110] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              {/* Editorial Unboxed Kicker with Exact Specialization */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-5 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Harare &middot; Zimbabwe Nationwide</span>
                <span aria-hidden="true">&middot;</span>
                <span>Sean Ceilings</span>
              </div>

              {/* Primary Headline with text-wrap: balance */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-stone-900 dark:text-[#F5F2EB] leading-[1.08] text-balance mb-6">
                Ceiling installation and designing, deck dropping, wall skimming and painting.
              </h1>

              {/* Lead Paragraph with Exact Specialization Context */}
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl mb-6">
                Welcome to <strong className="text-stone-900 dark:text-white">Sean Ceilings</strong>. We are premier Zimbabwean specialists in <strong className="text-amber-800 dark:text-amber-300">ceiling installation and designing, deck dropping, wall skimming and painting</strong>. From luxury residential villas in Borrowdale Brooke and Highlands to commercial developments, we deliver precision craftsmanship and mirror-smooth finishes.
              </p>

              {/* 4 Core Pillars Pills/Tags */}
              <div className="grid grid-cols-2 gap-2 max-w-lg mb-8 text-xs font-medium text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2A2622]">
                  <Hammer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Ceiling Installation &amp; Designing</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2A2622]">
                  <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Deck Dropping &amp; Bulkheads</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2A2622]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Wall &amp; Ceiling Skimming</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2A2622]">
                  <Paintbrush className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Architectural Painting</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* View Real Projects with crisp rotating border only (orange, green, white) */}
              <div className="relative inline-flex rounded-xl p-[2px] overflow-hidden group shadow-sm">
                <div
                  aria-hidden="true"
                  className="absolute -inset-[150%] animate-rotating-border border-conic-colors pointer-events-none"
                />
                <button
                  onClick={onExploreGallery}
                  className="relative z-10 inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase bg-stone-900 hover:bg-stone-800 dark:bg-[#161513] dark:hover:bg-[#201e1a] text-white rounded-[10px] transition-colors cursor-pointer"
                >
                  <span>View Real Projects</span>
                  <ArrowDownRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Instant USD Estimator</span>
              </button>

              <a
                href="https://wa.me/263777063455?text=Hello%20Sean%20Ceilings!%20I%20am%20looking%20for%20ceiling%20installation%2C%20deck%20dropping%2C%20skimming%20or%20painting."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 transition-colors"
              >
                <span>WhatsApp: +263 77 706 3455</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Container featuring Real Photo from User Zip */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[420px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-[#E7DFD5] dark:border-[#2E2A25] shadow-2xl bg-stone-900 flex flex-col group">
              <img
                src="/assets/sean_ceilings/hero_finished_ceiling.jpg"
                alt="Sean Ceilings — Finished Custom Bulkhead with Ambient Blue &amp; Green LED Lighting"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Floating Detail Badge on Photo */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold font-display text-white">
                    Sean Ceilings Finished Masterpiece
                  </div>
                  <div className="text-[11px] font-mono text-amber-300 mt-0.5">
                    Geometric Bulkhead &middot; Blue &amp; Green LED Cove &middot; Skimmed &amp; Painted
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>On-Site Craftsmanship</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Strip in Full-Width Row Below Hero Split */}
        <div className="mt-16 pt-10 border-t border-[#E7DFD5] dark:border-[#262420] grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-amber-700 dark:text-amber-400 font-mono tabular-nums">
              &le; 0.2mm
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Planar skim tolerance &amp; level arrises
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 dark:text-[#F5F2EB] font-mono tabular-nums">
              Level 5
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              SAZ / ASTM C840 highest grade
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 dark:text-[#F5F2EB] font-mono tabular-nums">
              4-in-1
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Design &middot; Deck Drop &middot; Skim &middot; Paint
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-amber-700 dark:text-amber-400 font-mono tabular-nums">
              From $12/m²
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Direct USD rates in Zimbabwe
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
