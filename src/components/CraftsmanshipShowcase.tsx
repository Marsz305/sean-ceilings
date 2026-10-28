import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CraftsmanshipShowcaseProps {
  onOpenCalculator: () => void;
}

export const CraftsmanshipShowcase: React.FC<CraftsmanshipShowcaseProps> = ({ onOpenCalculator }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Ceiling Installation & Designing',
      subtitle: 'Laser-Aligned Framing & RhinoBoard Boarding',
      description: 'Sean Ceilings constructs laser-aligned galvanised steel ceiling grids, installing Gyproc RhinoBoard with tight staggered joints and recessed screws ready for joint reinforcement.',
      image: '/assets/sean_ceilings/ceiling_12.jpg',
      stat: 'Laser-Aligned Framework',
    },
    {
      step: '02',
      title: 'Deck Dropping & Stepped Bulkheads',
      subtitle: 'Concrete Deck Drops & Concealed LED Coves',
      description: 'Multi-tier bulkheads and lighting trays are framed beneath concrete decks and clad with precision 90-degree corner beads. Fiber joint tape is embedded in Gyproc jointing compound to eliminate future settling cracks.',
      image: '/assets/sean_ceilings/ceiling_17.jpg',
      stat: 'Crack-Proof Jointing',
    },
    {
      step: '03',
      title: 'Wall & Ceiling Skimming',
      subtitle: 'Gyproc RhinoSet Monolithic Mirror Finish',
      description: 'Our master plasterers apply two continuous coats of Gyproc RhinoSet across the entire ceiling plane, water-burnishing with wide stainless steel spatulas for an eggshell-smooth mirror plane.',
      image: '/assets/sean_ceilings/ceiling_16.jpg',
      stat: '0.0mm Planar Variation',
    },
    {
      step: '04',
      title: 'Architectural Painting & Handover',
      subtitle: 'Primer Mist Coat & Premium Satin Coating',
      description: 'We apply plaster primer mist coats and ultra-matte ceiling whites, installing recessed LED strip lighting and inspecting under low-angle grazing illumination to guarantee zero shadows.',
      image: '/assets/sean_ceilings/ceiling_25.jpg',
      stat: '100% Shadow-Free Guarantee',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 border-b border-[#E7DFD5] dark:border-[#2E2A25] bg-[#FAF8F5] dark:bg-[#121110] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sean Ceilings Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 dark:text-[#F5F2EB] tracking-tight">
              From raw drywall to glowing architectural ceilings
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
            See how Sean Ceilings builds, boards, joints, skims, and illuminates custom ceilings across Harare, Borrowdale, and Zimbabwe.
          </p>
        </div>

        {/* Interactive 4-Stage Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Step Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {steps.map((item, index) => (
              <button
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === index
                    ? 'bg-white dark:bg-[#1C1A17] border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-white/60 dark:bg-[#181614] border-[#E7DFD5] dark:border-[#2A2622] hover:border-amber-400/50 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-mono font-bold ${activeStep === index ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}`}>
                    STAGE {item.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                    {item.stat}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 dark:text-[#F5F2EB]">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </button>
            ))}

            <div className="pt-2">
              <button
                onClick={onOpenCalculator}
                className="w-full py-3.5 px-5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate Your Sean Ceilings Quote in USD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Real On-Site Photo Viewport */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 min-h-[420px] rounded-3xl overflow-hidden border border-[#E7DFD5] dark:border-[#2E2A25] shadow-xl bg-[#1C1A17] flex flex-col">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover object-center transform transition-all duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay with Step Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-8 text-white">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{steps[activeStep].subtitle}</span>
                </div>
                <h4 className="text-2xl font-bold font-display text-white mb-2">
                  {steps[activeStep].title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 max-w-xl leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
