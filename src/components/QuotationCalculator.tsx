import React, { useState } from 'react';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  Clock, 
  Package, 
  MessageSquare,
  Layers,
  Hammer,
  Sparkles,
  Paintbrush,
  Check,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ServiceOption {
  id: 'deck-dropping' | 'roof-traces' | 'painting' | 'wall-skimming';
  name: string;
  ratePerM2: number;
  tagline: string;
  icon: React.ElementType;
  description: string;
}

const SERVICES: ServiceOption[] = [
  {
    id: 'deck-dropping',
    name: 'Deck Dropping',
    ratePerM2: 8,
    tagline: 'Concrete deck drops & bulkheads',
    icon: Layers,
    description: 'Suspended drop ceilings beneath concrete slabs, stepped bulkheads & ambient LED light troughs.',
  },
  {
    id: 'roof-traces',
    name: 'Roof Traces',
    ratePerM2: 5,
    tagline: 'Trusses brandering & framework',
    icon: Hammer,
    description: 'Timber trusses / brandering framing, laser-leveled grid hanging & RhinoBoard drywall installation.',
  },
  {
    id: 'wall-skimming',
    name: 'Wall Skimming',
    ratePerM2: 4,
    tagline: 'Level 5 Gyproc RhinoSet',
    icon: Sparkles,
    description: 'Monolithic skim plastering over drywall & plastered walls for zero joint flashing under raking sunlight.',
  },
  {
    id: 'painting',
    name: 'Painting',
    ratePerM2: 5,
    tagline: 'Primer & washable emulsion',
    icon: Paintbrush,
    description: 'Full architectural painting: plaster primer mist coat, premium acrylic emulsion & sharp cut lines.',
  },
];

export const QuotationCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'m2' | 'sqft'>('m2');
  const [areaM2, setAreaM2] = useState<number>(120);

  // Selected services (users can choose any combination of the 4 verified rates)
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({
    'deck-dropping': true,
    'roof-traces': false,
    'wall-skimming': true,
    'painting': true,
  });

  const [substrate, setSubstrate] = useState<'rhinoboard' | 'plastered-wall' | 'textured' | 'concrete'>('rhinoboard');
  const [finishLevel, setFinishLevel] = useState<'level5' | 'level4' | 'cretestone'>('level5');
  const [includeShadowline, setIncludeShadowline] = useState<boolean>(true);
  const [shadowlineMeters, setShadowlineMeters] = useState<number>(40);

  // Contact Form state (Zimbabwean phone / WhatsApp)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectSuburb, setProjectSuburb] = useState('Borrowdale, Harare');
  const [timeline, setTimeline] = useState('Within 2-4 weeks');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Toggle service selection (ensure at least one service is selected)
  const toggleService = (id: string) => {
    setSelectedServices((prev) => {
      const activeCount = Object.values(prev).filter(Boolean).length;
      if (prev[id] && activeCount <= 1) {
        return prev; // keep at least one
      }
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  const applyPreset = (preset: 'all' | 'deck-package' | 'roof-package' | 'skim-paint') => {
    if (preset === 'all') {
      setSelectedServices({
        'deck-dropping': true,
        'roof-traces': true,
        'wall-skimming': true,
        'painting': true,
      });
    } else if (preset === 'deck-package') {
      setSelectedServices({
        'deck-dropping': true,
        'roof-traces': false,
        'wall-skimming': true,
        'painting': true,
      });
    } else if (preset === 'roof-package') {
      setSelectedServices({
        'deck-dropping': false,
        'roof-traces': true,
        'wall-skimming': true,
        'painting': true,
      });
    } else if (preset === 'skim-paint') {
      setSelectedServices({
        'deck-dropping': false,
        'roof-traces': false,
        'wall-skimming': true,
        'painting': true,
      });
    }
  };

  // Calculate pricing based on exact rates
  const selectedServiceList = SERVICES.filter((s) => selectedServices[s.id]);
  const ratePerM2 = selectedServiceList.reduce((sum, s) => sum + s.ratePerM2, 0);

  const baseServiceCost = areaM2 * ratePerM2;
  const shadowlineCost = includeShadowline ? shadowlineMeters * 6 : 0;
  const totalCostUSD = baseServiceCost + shadowlineCost;

  const estimatedBags = Math.ceil(areaM2 * (selectedServices['wall-skimming'] ? 0.28 : 0.12));
  const estimatedDays = Math.max(2, Math.ceil(areaM2 / 35) + (selectedServices['deck-dropping'] ? 1 : 0) + (includeShadowline ? 1 : 0));
  const displayArea = unit === 'm2' ? areaM2 : Math.round(areaM2 * 10.7639);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = 'SC-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedRef(randomRef);
    }, 600);
  };

  const servicesSummaryText = selectedServiceList
    .map((s) => `${s.name} ($${s.ratePerM2}/m²)`)
    .join(' + ');

  const whatsappMessage = encodeURIComponent(
    `Hello Sean Ceilings! I calculated a quotation on your website for ${areaM2}m² in ${projectSuburb}:\n` +
    `• Services: ${servicesSummaryText}\n` +
    `• Rate: $${ratePerM2}/m²\n` +
    `${includeShadowline ? `• Shadowline Reglets: ${shadowlineMeters}m ($${shadowlineCost})\n` : ''}` +
    `• Estimated Total: $${totalCostUSD.toLocaleString()} USD\n` +
    `Name: ${fullName || 'Client'}\n` +
    `Timeline: ${timeline}`
  );

  return (
    <section id="calculator" className="py-24 border-b border-[#E7DFD5] dark:border-[#262420] bg-[#FAF8F5] dark:bg-[#121110] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-2 font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Official Transparent Rates &middot; Harare &amp; Zimbabwe</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 dark:text-[#F5F2EB]">
            Instant USD Quotation Calculator
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
            Transparent pricing based on Sean Ceilings official standard rates: <strong>deck dropping at $8/m²</strong>, <strong>roof traces at $5/m²</strong>, <strong>painting at $5/m²</strong>, and <strong>wall skimming at $4/m²</strong>. Select your project requirements below for an exact estimate.
          </p>
        </div>

        {/* ================= OFFICIAL RATE CARD BANNER ================= */}
        <div className="mb-12 p-6 rounded-3xl bg-white dark:bg-[#1A1815] border border-[#E7DFD5] dark:border-[#2E2A25] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7DFD5] dark:border-[#2E2A25] gap-2 mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-[#F5F2EB]">
                Sean Ceilings Verified Rate Card
              </span>
            </div>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Direct USD / Square Meter &middot; No Hidden Fees
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((srv) => {
              const Icon = srv.icon;
              const isSelected = selectedServices[srv.id];
              return (
                <div
                  key={srv.id}
                  onClick={() => toggleService(srv.id)}
                  className={`relative p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'border-amber-600 bg-amber-500/10 dark:bg-amber-500/15 ring-1 ring-amber-600/50'
                      : 'border-[#E7DFD5] dark:border-[#2A2622] bg-[#FAF8F5] dark:bg-[#151413] hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-600/15 dark:bg-amber-600/25 flex items-center justify-center text-amber-700 dark:text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base sm:text-lg font-bold font-mono text-stone-900 dark:text-[#F5F2EB]">
                        ${srv.ratePerM2}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">/ m²</span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-stone-900 dark:text-[#F5F2EB] flex items-center justify-between">
                    <span>{srv.name}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-snug">
                    {srv.tagline}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {submittedRef ? (
          /* Confirmation Success Card */
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#1C1A17] border border-amber-500/40 shadow-xl text-center animate-in fade-in duration-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-display text-stone-900 dark:text-[#F5F2EB] mb-2">
              Quotation Request Logged (Ref: {submittedRef})
            </h3>

            <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
              Thank you, <strong className="text-stone-900 dark:text-white">{fullName}</strong>. Sean Ceilings will review your scope for <span className="text-amber-700 dark:text-amber-400 font-semibold">{projectSuburb}</span> and contact you shortly at <span className="font-semibold">+263 77 706 3455</span>.
            </p>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#151413] border border-[#E7DFD5] dark:border-[#2A2622] text-left text-xs font-mono space-y-2.5 mb-6">
              <div className="flex justify-between text-stone-500">
                <span>Selected Services:</span>
                <span className="text-stone-900 dark:text-white font-medium text-right max-w-xs">{servicesSummaryText}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Total Scope Area:</span>
                <span className="text-stone-900 dark:text-white font-medium">{areaM2} m² (~{Math.round(areaM2 * 10.7639)} sq ft)</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Combined Unit Rate:</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">${ratePerM2} / m² USD</span>
              </div>
              {includeShadowline && (
                <div className="flex justify-between text-stone-500">
                  <span>Shadowline Reglets:</span>
                  <span className="text-stone-900 dark:text-white">{shadowlineMeters}m (${shadowlineCost} USD)</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E7DFD5] dark:border-[#2A2622] flex justify-between items-center text-stone-900 dark:text-white">
                <span className="font-bold">Calculated USD Total:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold text-base">${totalCostUSD.toLocaleString()} USD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/263777063455?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Instantly on WhatsApp (+263 77 706 3455)</span>
              </a>

              <button
                onClick={() => setSubmittedRef(null)}
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold uppercase tracking-wider bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl hover:opacity-90 cursor-pointer transition-colors"
              >
                Calculate Another Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Estimator Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Select Services (with individual toggle + presets) */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <label className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold">
                    1. Select Services Needed
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                    <span className="text-stone-400 mr-1">Presets:</span>
                    <button
                      type="button"
                      onClick={() => applyPreset('deck-package')}
                      className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-stone-700 dark:text-stone-300"
                    >
                      Deck Drop + Skim + Paint ($17/m²)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('roof-package')}
                      className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-stone-700 dark:text-stone-300"
                    >
                      Roof Traces + Skim + Paint ($14/m²)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('skim-paint')}
                      className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-stone-700 dark:text-stone-300"
                    >
                      Skim &amp; Paint ($9/m²)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('all')}
                      className="px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-stone-700 dark:text-stone-300"
                    >
                      All ($22/m²)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((srv) => {
                    const Icon = srv.icon;
                    const isChecked = selectedServices[srv.id];
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.id)}
                        className={`p-4 text-left rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked
                            ? 'border-amber-600 bg-white dark:bg-[#1C1A17] ring-1 ring-amber-600/40 shadow-xs'
                            : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-stone-50 dark:bg-[#151413] opacity-75'
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                          isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-400 dark:border-stone-600'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-stone-900 dark:text-[#F5F2EB]">
                              {srv.name}
                            </span>
                            <span className="font-mono font-bold text-xs text-amber-700 dark:text-amber-400">
                              ${srv.ratePerM2}/m²
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                            {srv.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Surface Area Slider */}
              <div className="p-6 rounded-3xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold">
                    2. Surface Area
                  </label>
                  <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-[#151413] p-1 rounded-lg border border-[#E7DFD5] dark:border-[#2A2622] text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setUnit('m2')}
                      className={`px-2.5 py-0.5 rounded-md cursor-pointer ${unit === 'm2' ? 'bg-amber-600 text-white font-bold' : 'text-stone-500'}`}
                    >
                      m²
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('sqft')}
                      className={`px-2.5 py-0.5 rounded-md cursor-pointer ${unit === 'sqft' ? 'bg-amber-600 text-white font-bold' : 'text-stone-500'}`}
                    >
                      sq ft
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-3xl font-bold font-mono tracking-tight text-stone-900 dark:text-[#F5F2EB] tabular-nums">
                    {displayArea} {unit}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    {unit === 'm2' ? `~${Math.round(areaM2 * 10.7639)} sq ft` : `~${areaM2} m²`}
                  </span>
                </div>

                <input
                  type="range"
                  min="20"
                  max="600"
                  step="5"
                  value={areaM2}
                  onChange={(e) => setAreaM2(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2 bg-[#E7DFD5] dark:bg-[#2A2622] rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-2">
                  <span>20 m² (Single Room)</span>
                  <span>120 m² (Standard Home)</span>
                  <span>600+ m² (Luxury Villa)</span>
                </div>
              </div>

              {/* 3. Substrate Condition */}
              <div>
                <label className="block text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold mb-3">
                  3. Substrate Condition
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSubstrate('rhinoboard')}
                    className={`p-3.5 text-left rounded-2xl border text-xs transition-all cursor-pointer ${
                      substrate === 'rhinoboard'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Gyproc RhinoBoard</div>
                    <div className="text-[10px] opacity-80 mt-0.5">Tapered Drywall</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubstrate('plastered-wall')}
                    className={`p-3.5 text-left rounded-2xl border text-xs transition-all cursor-pointer ${
                      substrate === 'plastered-wall'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Plastered Wall</div>
                    <div className="text-[10px] opacity-80 mt-0.5">Cement Sand Base</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubstrate('textured')}
                    className={`p-3.5 text-left rounded-2xl border text-xs transition-all cursor-pointer ${
                      substrate === 'textured'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Heavy Texture</div>
                    <div className="text-[10px] opacity-80 mt-0.5">Tyrolean Stipple</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubstrate('concrete')}
                    className={`p-3.5 text-left rounded-2xl border text-xs transition-all cursor-pointer ${
                      substrate === 'concrete'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Concrete Slab</div>
                    <div className="text-[10px] opacity-80 mt-0.5">Cretestone Prep</div>
                  </button>
                </div>
              </div>

              {/* 4. Finish Grade */}
              <div>
                <label className="block text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold mb-3">
                  4. Desired Finish Grade
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFinishLevel('level5')}
                    className={`p-4 text-left rounded-2xl border transition-all cursor-pointer ${
                      finishLevel === 'level5'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center justify-between">
                      <span>Level 5 RhinoSet Monolith</span>
                      <span className="text-[10px] font-mono uppercase opacity-85">Recommended</span>
                    </div>
                    <div className="text-[11px] opacity-85 mt-1 leading-snug">
                      100% full gypsum coverage. Zero joint flashing under Harare raking sun.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFinishLevel('level4')}
                    className={`p-4 text-left rounded-2xl border transition-all cursor-pointer ${
                      finishLevel === 'level4'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold text-xs">Level 4 Standard Jointing</div>
                    <div className="text-[11px] opacity-85 mt-1 leading-snug">
                      RhinoGlide over seams and screw points only. Standard paint-ready.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFinishLevel('cretestone')}
                    className={`p-4 text-left rounded-2xl border transition-all cursor-pointer ${
                      finishLevel === 'cretestone'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold text-xs">Cretestone High-Bond</div>
                    <div className="text-[11px] opacity-85 mt-1 leading-snug">
                      Specialized adhesion for concrete soffits and plastered walls.
                    </div>
                  </button>
                </div>
              </div>

              {/* 5. Shadowline Details Option */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17]">
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-[#F5F2EB]">
                    Include 15mm Shadowline Perimeter Reglets ($6/m)
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Replaces timber cornices with modern negative ceiling reveals
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {includeShadowline && (
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={shadowlineMeters}
                        onChange={(e) => setShadowlineMeters(Number(e.target.value))}
                        className="w-16 px-2 py-1 bg-[#FAF8F5] dark:bg-[#151413] border border-[#E7DFD5] dark:border-[#332E29] rounded-lg text-center"
                      />
                      <span className="text-stone-400">m</span>
                    </div>
                  )}

                  <input
                    type="checkbox"
                    checked={includeShadowline}
                    onChange={(e) => setIncludeShadowline(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Summary & Submission Form */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Cost & Materials Card in USD */}
              <div className="p-6 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl">
                <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Exact Quotation (USD)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold font-mono">
                    ${ratePerM2}/m² Combined
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-2 tabular-nums">
                  ${totalCostUSD.toLocaleString()} USD
                </div>

                <div className="text-xs text-stone-400 mb-4 leading-relaxed">
                  Calculated for <strong className="text-white">{areaM2} m²</strong> with verified Sean Ceilings rates.
                </div>

                {/* Itemized Line Items */}
                <div className="space-y-2 py-3 border-t border-stone-800 text-xs font-mono">
                  {selectedServiceList.map((srv) => (
                    <div key={srv.id} className="flex justify-between items-center text-stone-300">
                      <span>• {srv.name} (${srv.ratePerM2}/m²):</span>
                      <span className="font-bold text-white">${(areaM2 * srv.ratePerM2).toLocaleString()} USD</span>
                    </div>
                  ))}

                  {includeShadowline && (
                    <div className="flex justify-between items-center text-stone-300">
                      <span>• Shadowline Reglets ({shadowlineMeters}m @ $6):</span>
                      <span className="font-bold text-white">${shadowlineCost.toLocaleString()} USD</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Est. Time: ~{estimatedDays} Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    <span>~{estimatedBags} Bags RhinoSet</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-800">
                  <a
                    href={`https://wa.me/263777063455?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send this Estimate on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Inquiry & Contact Form */}
              <form 
                onSubmit={handleSubmit}
                className="p-6 rounded-3xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] space-y-4 shadow-xs"
              >
                <div className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-bold tracking-wider">
                  Request Formal Written Quote
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tendai Chidzero"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-[#FAF8F5] dark:bg-[#151413] text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tendai@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-[#FAF8F5] dark:bg-[#151413] text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+263 77 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-[#FAF8F5] dark:bg-[#151413] text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Project Location / Suburb *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Borrowdale Brooke"
                      value={projectSuburb}
                      onChange={(e) => setProjectSuburb(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-[#FAF8F5] dark:bg-[#151413] text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-[#FAF8F5] dark:bg-[#151413] text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option>Immediate (Within 1 week)</option>
                      <option>Within 2-4 weeks</option>
                      <option>Planning stage (1-2 months)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Ceiling Notes (e.g. Tray design, LED coves, bulkhead details)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe room heights, desired stepped bulkheads, or lighting preferences..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-[#FAF8F5] dark:bg-[#151413] text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Calculating Specification...' : 'Request Quotation From Sean Ceilings'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
