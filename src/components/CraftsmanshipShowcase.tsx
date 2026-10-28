import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Sun, Layers, Compass } from 'lucide-react';

interface CraftsmanshipShowcaseProps {
  onOpenCalculator: () => void;
}

export const CraftsmanshipShowcase: React.FC<CraftsmanshipShowcaseProps> = ({ onOpenCalculator }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Substrate & Joint Stabilization',
      subtitle: 'RhinoBoard & Plastered Brickwork Preparation',
      description: 'Before any gypsum touch, joints in Gyproc RhinoBoard are reinforced with self-adhesive glass fiber mesh tape, and brick masonry is treated with KeyCoat bonding slurry to eliminate suction differentials.',
      image: '/src/assets/images/demo_shadowline_room_1793096540420.jpg',
      stat: '100% Tape Bond Guarantee',
    },
    {
      step: '02',
      title: 'First Base Skim Application',
      subtitle: 'Dual-Pass Continuous Gypsum Matrix',
      description: 'Using high-grade RhinoSet or RhinoLite, a first 1.5mm continuous coat is laid across the entire ceiling or wall plane, bringing uneven board dips and screw recesses into true planar alignment.',
      image: '/src/assets/images/demo_trowel_craft_1793096539377.jpg',
      stat: '<0.2mm Planar Deviation',
    },
    {
      step: '03',
      title: 'Second Featheredge Pass & Burnishing',
      subtitle: 'Water-Assisted Steel Trowel Glaze',
      description: 'While the base plaster begins its initial set, our artisans apply a micro-fine featheredge glaze with 600mm stainless steel spatulas, closing all micro-pores to create an eggshell-smooth mirror plane with zero sanding dust.',
      image: '/src/assets/images/hero_gypsum_ceiling_1793096538489.jpg',
      stat: 'Zero Toxic Dust Sanding',
    },
    {
      step: '04',
      title: 'Raking Light Inspection Sign-Off',
      subtitle: '10° Highveld Sunlight Protocol',
      description: 'Every ceiling and wall is inspected with a 1500-lumen directional grazing light held at an acute 10° angle. We guarantee zero joint ridges, no fastener dimples, and 100% uniform paint absorption.',
      image: '/src/assets/images/demo_luxury_villa_1793096559393.jpg',
      stat: 'SAZ & ASTM Level 5 Certified',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 border-b border-[#E7DFD5] dark:border-[#2E2A25] bg-[#FAF8F5] dark:bg-[#121110] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan Skimming Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-stone-900 dark:text-[#F5F2EB] tracking-tight">
              The 4-stage monolithic finish
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
            From Harare residences in Borrowdale to luxury safari lodges in Victoria Falls, our gypsum skimming process ensures ceilings and walls that remain dead-flat under the harshest sunlight.
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
                <span>Calculate Your Project Quote in USD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Demo Photography Viewport */}
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
