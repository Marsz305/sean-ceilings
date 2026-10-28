import React, { useState } from 'react';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  Clock, 
  Package, 
  MessageSquare
} from 'lucide-react';

export const QuotationCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'m2' | 'sqft'>('m2');
  const [areaM2, setAreaM2] = useState<number>(140);

  // Configuration options in Zimbabwe context
  const [projectType, setProjectType] = useState<'ceiling' | 'walls-ceiling' | 'commercial' | 'curved'>('walls-ceiling');
  const [substrate, setSubstrate] = useState<'rhinoboard' | 'brickwork' | 'textured' | 'concrete'>('rhinoboard');
  const [finishLevel, setFinishLevel] = useState<'level4' | 'level5' | 'cretestone'>('level5');
  const [includeShadowline, setIncludeShadowline] = useState<boolean>(true);
  const [shadowlineMeters, setShadowlineMeters] = useState<number>(45);

  // Contact Form state (Zimbabwean phone / WhatsApp)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectSuburb, setProjectSuburb] = useState('Borrowdale, Harare');
  const [timeline, setTimeline] = useState('Within 2-4 weeks');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Pricing formula in USD ($)
  const baseRatePerM2USD = 
    finishLevel === 'level5' ? 20 :
    finishLevel === 'cretestone' ? 22 : 14;

  const substrateMultiplier = 
    substrate === 'rhinoboard' ? 1.0 :
    substrate === 'brickwork' ? 1.25 :
    substrate === 'textured' ? 1.45 : 1.30;

  const projectMultiplier = 
    projectType === 'ceiling' ? 1.2 :
    projectType === 'curved' ? 1.5 : 1.05;

  const calculatedBase = areaM2 * baseRatePerM2USD * substrateMultiplier * projectMultiplier;
  const shadowlineCost = includeShadowline ? shadowlineMeters * 6 : 0;
  
  const estimatedMin = Math.round((calculatedBase + shadowlineCost) * 0.95);
  const estimatedMax = Math.round((calculatedBase + shadowlineCost) * 1.10);

  const estimatedBags = Math.ceil(areaM2 * (finishLevel === 'level5' ? 0.32 : 0.22));
  const estimatedDays = Math.max(2, Math.ceil(areaM2 / 40) + (includeShadowline ? 1 : 0));

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

  return (
    <section id="calculator" className="py-24 border-b border-[#E7DFD5] dark:border-[#262420] bg-[#FAF8F5] dark:bg-[#121110] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-2 font-semibold">
            Sean Ceilings Estimations &middot; USD Rates
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 dark:text-[#F5F2EB]">
            Get a Detailed Ceiling Quotation in USD
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Calculate estimated material requirements and pricing for Sean Ceilings drywall framing, multi-tier bulkheads, Gyproc RhinoBoard, or plastered brickwork anywhere in Harare or nationwide.
          </p>
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
              Thank you, <strong className="text-stone-900 dark:text-white">{fullName}</strong>. Sean Ceilings will review your project in <span className="text-amber-700 dark:text-amber-400 font-semibold">{projectSuburb}</span> and contact you via Phone or WhatsApp at <span className="font-semibold">+263 77 706 3455</span> shortly.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#151413] border border-[#E7DFD5] dark:border-[#2A2622] text-left text-xs font-mono space-y-2 mb-6">
              <div className="flex justify-between text-stone-500">
                <span>Scope:</span>
                <span className="text-stone-900 dark:text-white font-medium">{projectType} &middot; {areaM2}m²</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Ceiling Spec:</span>
                <span className="text-stone-900 dark:text-white font-medium">{finishLevel.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Estimated USD Budget:</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold text-sm">${estimatedMin.toLocaleString()} &ndash; ${estimatedMax.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Material Est:</span>
                <span className="text-stone-900 dark:text-white">~{estimatedBags} bags of 25kg Gyproc RhinoSet</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/263777063455?text=Hi%20Sean%20Ceilings%2C%20my%20quotation%20reference%20is%20${submittedRef}%20for%20${areaM2}m2%20in%20${encodeURIComponent(projectSuburb)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Instantly on WhatsApp (+263 77 706 3455)</span>
              </a>

              <button
                onClick={() => setSubmittedRef(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl hover:opacity-90 cursor-pointer"
              >
                Calculate Another
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Estimator Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Project Type */}
              <div>
                <label className="block text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold mb-3">
                  1. Project Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setProjectType('ceiling')}
                    className={`p-3 text-left rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                      projectType === 'ceiling'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Ceiling Install</div>
                    <div className="text-[10px] opacity-80 mt-0.5">&amp; Designing</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectType('curved')}
                    className={`p-3 text-left rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                      projectType === 'curved'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Deck Dropping</div>
                    <div className="text-[10px] opacity-80 mt-0.5">&amp; Bulkheads</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectType('commercial')}
                    className={`p-3 text-left rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                      projectType === 'commercial'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Wall Skimming</div>
                    <div className="text-[10px] opacity-80 mt-0.5">&amp; RhinoSet</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectType('walls-ceiling')}
                    className={`p-3 text-left rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                      projectType === 'walls-ceiling'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Full Package</div>
                    <div className="text-[10px] opacity-80 mt-0.5">Ceilings, Skim &amp; Paint</div>
                  </button>
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
                  min="25"
                  max="650"
                  step="5"
                  value={areaM2}
                  onChange={(e) => setAreaM2(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2 bg-[#E7DFD5] dark:bg-[#2A2622] rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-2">
                  <span>25 m² (Room)</span>
                  <span>180 m² (Suburban Home)</span>
                  <span>650+ m² (Luxury Estate)</span>
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
                    onClick={() => setSubstrate('brickwork')}
                    className={`p-3.5 text-left rounded-2xl border text-xs transition-all cursor-pointer ${
                      substrate === 'brickwork'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="font-bold">Plastered Brick</div>
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
                      Specialized adhesion for concrete soffits and plastered brickwork.
                    </div>
                  </button>
                </div>
              </div>

              {/* 5. Shadowline Details Option */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17]">
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-[#F5F2EB]">
                    Include 15mm Shadowline Perimeter Reglets
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
            <div className="lg:col-span-5 flex flex-col justify-between">
              {/* Cost & Materials Card in USD */}
              <div className="p-6 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl mb-6">
                <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Estimated Project Cost (USD)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Sean Ceilings Rates</span>
                </div>

                <div className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-2 tabular-nums">
                  ${estimatedMin.toLocaleString()} &ndash; ${estimatedMax.toLocaleString()} USD
                </div>

                <div className="text-xs text-stone-400 mb-6 leading-relaxed">
                  Calculated at approximately ${Math.round(calculatedBase / areaM2)}/m² USD inclusive of Gyproc RhinoSet plaster, bonding primer, and flawless finish.
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
              </div>

              {/* Inquiry & Contact Form */}
              <form 
                onSubmit={handleSubmit}
                className="p-6 rounded-3xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] space-y-4 shadow-xs"
              >
                <div className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-bold tracking-wider">
                  Contact Sean Ceilings Direct
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

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Project Suburb / City in Zimbabwe *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Borrowdale Brooke, Highlands, or Glen Lorne"
                    value={projectSuburb}
                    onChange={(e) => setProjectSuburb(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#E7DFD5] dark:border-[#332E29] bg-[#FAF8F5] dark:bg-[#151413] text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Ceiling Notes (e.g. Tray design, LED coves, brickwork)
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

                <div className="text-[10px] text-center text-stone-400 font-mono">
                  Direct WhatsApp: <a href="https://wa.me/263777063455" className="text-amber-600 hover:underline">+263 77 706 3455</a>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
