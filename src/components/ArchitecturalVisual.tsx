import React, { useState } from 'react';

interface ArchitecturalVisualProps {
  type: 'ceiling' | 'wall' | 'curved' | 'heritage' | 'shadowline' | 'raking-test' | 'magnific-reference';
  title?: string;
  className?: string;
  rakingAngle?: number; // 0 to 90 degrees
  showRakingLightSim?: boolean;
}

export const ArchitecturalVisual: React.FC<ArchitecturalVisualProps> = ({
  type,
  title,
  className = '',
  rakingAngle = 15,
  showRakingLightSim = false,
}) => {
  const [interactiveAngle, setInteractiveAngle] = useState(rakingAngle);
  const [viewMode, setViewMode] = useState<'finish' | 'raking' | 'substrate'>('finish');

  if (type === 'magnific-reference') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 ${className}`}>
        <img
          src="/public/assets/aistudio/image_c6668882.png"
          alt="Magnific UI Reference Inspiration"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-xs font-mono text-neutral-300">Magnific Inspired Architecture · Interactive Suite</span>
        </div>
      </div>
    );
  }

  // Calculate shadow projection based on raking angle
  const shadowOpacity = Math.max(0.05, (90 - interactiveAngle) / 90 * 0.7);
  const lightPositionX = Math.cos((interactiveAngle * Math.PI) / 180) * 100;
  const lightPositionY = 20;

  return (
    <div className={`relative group overflow-hidden bg-neutral-900 text-neutral-100 rounded-xl select-none ${className}`}>
      {/* Background Plaster Plane Simulation */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: viewMode === 'substrate'
            ? 'repeating-linear-gradient(90deg, #1f1f23 0px, #1f1f23 120px, #27272a 120px, #27272a 124px)'
            : viewMode === 'raking'
            ? `radial-gradient(ellipse at ${lightPositionX}% ${lightPositionY}%, rgba(255,255,255,0.4) 0%, rgba(30,30,30,0.95) 80%)`
            : 'radial-gradient(circle at 50% 30%, #262626 0%, #171717 100%)',
        }}
      >
        {/* Plaster texture micro-stipple SVG pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none">
          <filter id="plasterGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.15 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#plasterGrain)" />
        </svg>

        {/* Architectural Composition per type */}
        {type === 'ceiling' && (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="w-full flex justify-between items-start opacity-70">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Monolithic Gypsum Soffit</span>
              <span className="text-[10px] font-mono text-neutral-400">ASTM C840 · Level 5</span>
            </div>

            {/* Recessed Architectural Linear Shadowline Slot */}
            <div className="relative w-full my-auto flex items-center justify-center">
              <div className="w-full h-1 bg-neutral-950 shadow-[0_2px_12px_rgba(0,0,0,0.9)] relative">
                <div className="absolute inset-x-0 -top-4 h-4 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                <div className="absolute inset-x-0 top-1 h-3 bg-gradient-to-b from-neutral-950/80 to-transparent" />
                <div className="absolute left-1/4 right-1/4 h-[1px] bg-neutral-400/80 blur-[0.5px]" />
              </div>
            </div>

            <div className="flex justify-between items-end text-xs text-neutral-400 font-mono">
              <span>Featheredge 2.5mm</span>
              <span>Joint Flash: 0.00%</span>
            </div>
          </div>
        )}

        {type === 'shadowline' && (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="w-full flex justify-between items-start opacity-70">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Perimeter Reveal Detailing</span>
              <span className="text-[10px] font-mono text-neutral-400">12mm Negative Reveal</span>
            </div>

            {/* Shadow gap corner detail */}
            <div className="relative w-full h-32 flex items-center justify-center">
              <div className="w-4/5 h-20 border-b border-r border-neutral-600 relative bg-neutral-800/40 backdrop-blur-xs">
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-l border-t border-neutral-950 bg-neutral-950" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-neutral-950" />
                <div className="absolute -top-3 left-3 text-[9px] font-mono text-neutral-400">Gypsum Board 15mm</div>
                <div className="absolute bottom-2 left-3 text-[9px] font-mono text-neutral-300">Continuous 3mm Skim Finish</div>
              </div>
            </div>

            <div className="flex justify-between items-end text-xs text-neutral-400 font-mono">
              <span>Trim-Tex Architectural Bead</span>
              <span>Tolerances &plusmn;0.2mm</span>
            </div>
          </div>
        )}

        {type === 'curved' && (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="w-full flex justify-between items-start opacity-70">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Radial Bulkhead Geometry</span>
              <span className="text-[10px] font-mono text-neutral-400">R = 4.2m Arc</span>
            </div>

            {/* SVG Arc rendering */}
            <div className="relative w-full h-32 flex items-center justify-center">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 80">
                <path
                  d="M 10 70 Q 100 10 190 70"
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="3"
                />
                <path
                  d="M 10 74 Q 100 14 190 74"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            <div className="flex justify-between items-end text-xs text-neutral-400 font-mono">
              <span>Continuous Tangent</span>
              <span>Flexible Gyproc Core</span>
            </div>
          </div>
        )}

        {type === 'heritage' && (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="w-full flex justify-between items-start opacity-70">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Heritage Featheredge Transition</span>
              <span className="text-[10px] font-mono text-neutral-400">Georgian Cornice Intact</span>
            </div>

            <div className="relative w-full h-32 flex items-center justify-center">
              <div className="w-full flex items-center">
                <div className="w-1/3 h-16 border-t-4 border-l-2 border-neutral-500 bg-neutral-800/80 flex items-center justify-center text-[10px] font-mono text-neutral-300">
                  Historic Lath
                </div>
                <div className="w-1/3 h-16 bg-gradient-to-r from-neutral-800 to-neutral-700/50 flex items-center justify-center text-[10px] font-mono text-neutral-200">
                  Feather Zone
                </div>
                <div className="w-1/3 h-16 border-t-2 border-neutral-400 bg-neutral-700/80 flex items-center justify-center text-[10px] font-mono text-neutral-100">
                  Level 5 Skim
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end text-xs text-neutral-400 font-mono">
              <span>Breathable Gypsum Gauge</span>
              <span>Feathered to 0.0mm</span>
            </div>
          </div>
        )}

        {(type === 'wall' || type === 'raking-test') && (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="w-full flex justify-between items-start opacity-70">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Raking Light Field Analysis</span>
              <span className="text-[10px] font-mono text-neutral-400">{interactiveAngle}&deg; Angle</span>
            </div>

            {/* Simulated Drywall Joint vs Level 5 Comparison Line */}
            <div className="relative w-full my-auto flex flex-col items-center">
              <div 
                className="w-full h-24 rounded border border-neutral-700/60 relative overflow-hidden flex items-center justify-center"
                style={{
                  boxShadow: `inset ${(interactiveAngle - 45) * 2}px 0 30px rgba(0,0,0,${shadowOpacity})`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <div className="text-center">
                    <span className="block text-[11px] font-mono text-neutral-400">Standard Tape Joint</span>
                    <span className="text-[9px] font-mono text-amber-400/90">Visible Ridge Flashing</span>
                  </div>
                  <div className="h-full w-[1px] bg-neutral-500/50" />
                  <div className="text-center">
                    <span className="block text-[11px] font-mono text-neutral-100 font-semibold">Chalk & Trowel Level 5</span>
                    <span className="text-[9px] font-mono text-emerald-400">Zero Deflection Flawless</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end text-xs text-neutral-400 font-mono">
              <span>Glare Grazing: {interactiveAngle}&deg;</span>
              <span>Surface RMS: 0.12&mu;m</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Controls Overlay for Raking Simulator */}
      {showRakingLightSim && (
        <div className="absolute bottom-3 inset-x-3 p-3 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-800 flex items-center gap-4 z-10">
          <div className="flex-1 flex items-center gap-2">
            <label className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">Raking Beam:</label>
            <input
              type="range"
              min="5"
              max="85"
              value={interactiveAngle}
              onChange={(e) => setInteractiveAngle(Number(e.target.value))}
              className="w-full accent-white h-1 bg-neutral-800 rounded cursor-pointer"
            />
            <span className="text-[10px] font-mono text-neutral-200 tabular-nums w-8 text-right">{interactiveAngle}&deg;</span>
          </div>

          <div className="flex items-center gap-1 border-l border-neutral-800 pl-3">
            <button
              onClick={() => setViewMode('finish')}
              className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                viewMode === 'finish' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Finish
            </button>
            <button
              onClick={() => setViewMode('raking')}
              className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                viewMode === 'raking' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Raking
            </button>
            <button
              onClick={() => setViewMode('substrate')}
              className={`px-2 py-1 text-[10px] font-mono rounded transition-colors ${
                viewMode === 'substrate' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Substrate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
