import React, { useState } from 'react';
import { PLASTER_SYSTEMS } from '../data/portfolioData';
import { Check, ShieldCheck, ChevronRight } from 'lucide-react';

interface PlasterSystemsSectionProps {
  onOpenCalculator: () => void;
}

export const PlasterSystemsSection: React.FC<PlasterSystemsSectionProps> = ({ onOpenCalculator }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(5);

  const ASTM_LEVELS = [
    {
      level: 1,
      name: 'Level 1: Basic Fire Tape',
      where: 'Ceiling plenums, service shafts concealed from view.',
      treatment: 'Tape set in joint compound over RhinoBoard joints. Ridges acceptable.',
      rakingPerformance: 'Unacceptable for visible surfaces.',
    },
    {
      level: 2,
      name: 'Level 2: Water-Resistant Backer',
      where: 'Tile substrate or garage storage areas where finish is secondary.',
      treatment: 'Joint compound over tape, fastener heads covered once. Surface wipe down.',
      rakingPerformance: 'High photographic telegraphing.',
    },
    {
      level: 3,
      name: 'Level 3: Heavy Texture Substrate',
      where: 'Walls receiving heavy Tyrolean or textured wall coatings.',
      treatment: 'Two coats of RhinoGlide over joints and fasteners.',
      rakingPerformance: 'Visible flashing under direct sunlight.',
    },
    {
      level: 4,
      name: 'Level 4: Standard Paint-Ready',
      where: 'Residential drywall receiving flat paints or light wallcoverings.',
      treatment: 'Three coats of compound over joints, three over fasteners. Sanded smooth.',
      rakingPerformance: 'Prone to suction telegraphing under harsh Highveld morning sunlight.',
    },
    {
      level: 5,
      name: 'Level 5: Monolithic Architectural Skim',
      where: 'Borrowdale luxury homes, art galleries, double-height ceilings, dark paints.',
      treatment: 'Continuous skim coat of Gyproc RhinoSet across 100% of the board or brick plane.',
      rakingPerformance: 'Zero joint flashing. Complete specular & absorption uniformity under low-angle sun.',
    },
  ];

  return (
    <section id="plaster-systems" className="py-24 border-b border-[#E7DFD5] dark:border-[#262420] bg-[#FAF8F5] dark:bg-[#121110] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-2 font-semibold">
              Standards Association of Zimbabwe &middot; ASTM C840
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 dark:text-[#F5F2EB]">
              Gypsum Skimming Standards &amp; Formulations
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
            True architectural skimming eliminates suction and texture differentials between RhinoBoard paper and joints, or brick mortar and plaster.
          </p>
        </div>

        {/* Level 1 through 5 Interactive Selector */}
        <div className="bg-white dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2E2A25] rounded-3xl p-6 shadow-sm mb-12">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD5] dark:border-[#2E2A25] mb-6">
            <span className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold">
              Select Finish Level to Compare Specifications
            </span>
            <span className="text-xs font-mono text-stone-500">
              Standard: SAZ / ASTM C840 Level 1 &ndash; 5
            </span>
          </div>

          {/* Level Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
            {ASTM_LEVELS.map((item) => (
              <button
                key={item.level}
                onClick={() => setSelectedLevel(item.level)}
                className={`p-3 text-left rounded-2xl border transition-all cursor-pointer ${
                  selectedLevel === item.level
                    ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                    : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-[#FAF8F5] dark:bg-[#151413] hover:border-amber-400 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="text-xs font-mono font-bold">Level {item.level}</div>
                <div className={`text-[11px] truncate mt-0.5 ${selectedLevel === item.level ? 'text-amber-100' : 'text-stone-500'}`}>
                  {item.level === 5 ? 'RhinoSet Monolith' : item.level === 4 ? 'Standard Paint' : 'Substrate'}
                </div>
              </button>
            ))}
          </div>

          {/* Detail for selected level */}
          {(() => {
            const activeData = ASTM_LEVELS.find((l) => l.level === selectedLevel)!;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#151413] border border-[#E7DFD5] dark:border-[#2A2622]">
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400 uppercase mb-1 font-semibold">Recommended Application</div>
                  <div className="text-sm font-semibold text-stone-900 dark:text-[#F5F2EB]">{activeData.where}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#151413] border border-[#E7DFD5] dark:border-[#2A2622]">
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400 uppercase mb-1 font-semibold">Surface Treatment</div>
                  <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{activeData.treatment}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#151413] border border-[#E7DFD5] dark:border-[#2A2622]">
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400 uppercase mb-1 font-semibold">Raking Sun Resistance</div>
                  <div className={`text-xs font-semibold ${selectedLevel === 5 ? 'text-emerald-600 dark:text-emerald-400' : selectedLevel === 4 ? 'text-amber-600' : 'text-rose-500'}`}>
                    {activeData.rakingPerformance}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 3 Plaster Formula Systems */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLASTER_SYSTEMS.map((system) => (
            <div
              key={system.id}
              className="rounded-3xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] p-6 flex flex-col justify-between hover:border-amber-500/60 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">{system.manufacturer}</span>
                  <span>{system.thickness}</span>
                </div>

                <h3 className="text-lg font-bold font-display text-stone-900 dark:text-[#F5F2EB] mb-2">
                  {system.name}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                  {system.description}
                </p>

                <div className="space-y-2 mb-6">
                  {system.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                      <Check className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7DFD5] dark:border-[#2A2622] flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-400">Drying: {system.dryingHours}h</span>
                <button
                  onClick={onOpenCalculator}
                  className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Include in USD Quote</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
