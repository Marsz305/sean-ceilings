import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Camera, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestQuote: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl rounded-3xl bg-[#FAF8F5] dark:bg-[#1A1815] border border-[#E7DFD5] dark:border-[#2E2A25] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-6 border-b border-[#E7DFD5] dark:border-[#2E2A25] flex items-center justify-between bg-white dark:bg-[#151413]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span className="text-amber-700 dark:text-amber-400 font-semibold">{project.categoryLabel}</span>
              <span>&middot;</span>
              <span>{project.location}</span>
              <span>&middot;</span>
              <span>{project.year}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 dark:text-[#F5F2EB] mt-1">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full border border-[#E7DFD5] dark:border-[#2E2A25] text-stone-700 dark:text-stone-300 hover:border-amber-500 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main High-Res Photography Viewport */}
          <div className="rounded-3xl overflow-hidden border border-[#E7DFD5] dark:border-[#2E2A25] bg-stone-900 relative min-h-[340px] sm:min-h-[440px] shadow-lg">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover object-center max-h-[500px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-xs font-mono text-amber-300 border border-white/10">
              {project.rakingAngle}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Description & Case Study */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-bold mb-2">
                  Architectural Project Case Study
                </h3>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Highlight Proof */}
              <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-800 dark:text-amber-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-bold uppercase tracking-wider">Highveld Sunlight Quality Proof</span>
                </div>
                <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                  {project.highlight}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                <div className="p-3.5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#151413]">
                  <div className="text-stone-400 text-[10px] uppercase">Substrate</div>
                  <div className="text-stone-900 dark:text-white mt-1 truncate">{project.specDetails.substrate}</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#151413]">
                  <div className="text-stone-400 text-[10px] uppercase">Thickness</div>
                  <div className="text-stone-900 dark:text-white mt-1">{project.specDetails.thickness}</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#151413]">
                  <div className="text-stone-400 text-[10px] uppercase">Skim Passes</div>
                  <div className="text-stone-900 dark:text-white mt-1">{project.specDetails.passes} Trowel Passes</div>
                </div>
                <div className="p-3.5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#151413]">
                  <div className="text-stone-400 text-[10px] uppercase">Drying Cure</div>
                  <div className="text-stone-900 dark:text-white mt-1">{project.specDetails.dryingTime.split(' ')[0]}</div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Camera EXIF & Action */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-5 rounded-2xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#151413] space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Optical Photographic EXIF</span>
                </div>

                <div className="text-xs font-mono space-y-2 text-stone-600 dark:text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Camera:</span>
                    <span className="text-stone-900 dark:text-white font-medium">{project.exif.camera}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Lens:</span>
                    <span className="text-stone-900 dark:text-white font-medium">{project.exif.lens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Exposure:</span>
                    <span className="text-stone-900 dark:text-white">{project.exif.shutter} at {project.exif.aperture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">ISO:</span>
                    <span className="text-stone-900 dark:text-white">{project.exif.iso}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Architect:</span>
                    <span className="text-stone-900 dark:text-white font-medium">{project.architect}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuote(project);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Request USD Quote for this Finish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/263777063455?text=Hello%20Sean%20Ceilings!%20I%20am%20interested%20in%20a%20ceiling%20like%20${encodeURIComponent(project.title)}%20(${project.location})`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Chat on WhatsApp (+263 77 706 3455)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
