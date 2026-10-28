import React from 'react';
import { ArrowDownRight, Sparkles, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';

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
              {/* Editorial Unboxed Kicker */}
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-5 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Harare &middot; Victoria Falls &middot; Bulawayo</span>
                <span aria-hidden="true">&middot;</span>
                <span>RhinoSet Gypsum Skimming</span>
              </div>

              {/* Primary Headline with text-wrap: balance */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-stone-900 dark:text-[#F5F2EB] leading-[1.08] text-balance mb-6">
                Interior wall &amp; ceiling skimming finished to mirror-flat perfection.
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl mb-8">
                Zimbabwe’s premier specialists in gypsum finishing plasters for modern residences, embassies, and architectural projects. Using Gyproc RhinoSet and traditional two-pass featheredge burnishing over RhinoBoard and brickwork, we eliminate joint shadows under intense African sunlight.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreGallery}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase bg-stone-900 hover:bg-stone-800 dark:bg-[#F5F2EB] dark:hover:bg-white text-white dark:text-stone-900 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Skim Projects Gallery</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Instant USD Estimator</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container featuring Real Demo Photo */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[380px] lg:min-h-[460px] rounded-3xl overflow-hidden border border-[#E7DFD5] dark:border-[#2E2A25] shadow-2xl bg-stone-900 flex flex-col group">
              <img
                src="/src/assets/images/hero_gypsum_ceiling_1793096538489.jpg"
                alt="Architectural Monolithic Gypsum Ceiling in Borrowdale Brooke Harare"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Floating Detail Badge on Photo */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold font-display text-white">
                    Borrowdale Brooke Penthouse
                  </div>
                  <div className="text-[11px] font-mono text-amber-300 mt-0.5">
                    Continuous 220m² RhinoSet Monolith · Level 5 SAZ Standard
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Raking Light Passed</span>
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
              Planar tolerance over 2-meter span
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 dark:text-[#F5F2EB] font-mono tabular-nums">
              Level 5
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              SAZ / ASTM C840 highest rating
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 dark:text-[#F5F2EB] font-mono tabular-nums">
              26,000 m²
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Ceilings &amp; walls skimmed in Zimbabwe
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-amber-700 dark:text-amber-400 font-mono tabular-nums">
              From $12/m²
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Transparent, competitive USD pricing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
