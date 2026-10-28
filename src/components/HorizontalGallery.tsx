import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, Maximize2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface HorizontalGalleryProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onRequestQuoteForProject?: (project: Project) => void;
}

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = scrollWidth - clientWidth > 0 
        ? (scrollLeft / (scrollWidth - clientWidth)) * 100 
        : 0;
      setScrollProgress(progress);
    }
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -480 : 480;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="py-24 border-b border-[#E7DFD5] dark:border-[#262420] bg-white dark:bg-[#151413] transition-colors">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7DFD5] dark:border-[#262420]">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-2 font-semibold">
              Sean Ceilings &middot; Zimbabwe Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 dark:text-[#F5F2EB]">
              Our Architectural Ceilings &amp; Bulkhead Projects
            </h2>
          </div>

          {/* Filter Controls & Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] dark:bg-[#1E1C19] border border-[#E7DFD5] dark:border-[#2E2A25] rounded-xl">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                All Works
              </button>
              <button
                onClick={() => setActiveFilter('ceilings')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === 'ceilings'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Ceiling Design &amp; Install
              </button>
              <button
                onClick={() => setActiveFilter('curved')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === 'curved'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Deck Dropping &amp; Bulkheads
              </button>
              <button
                onClick={() => setActiveFilter('walls')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === 'walls'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Wall Skimming &amp; Painting
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollByAmount('left')}
                className="p-2 rounded-xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                className="p-2 rounded-xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-white dark:bg-[#1C1A17] text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Skimming Reel */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6 max-w-full pb-6 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
          style={{ scrollPaddingLeft: '24px', scrollPaddingRight: '24px' }}
        >
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="group relative flex-none w-[340px] sm:w-[420px] lg:w-[480px] snap-start rounded-3xl bg-[#FAF8F5] dark:bg-[#1C1A17] border border-[#E7DFD5] dark:border-[#2E2A25] overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/70 transition-all duration-300 flex flex-col cursor-pointer"
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s backwards`,
              }}
            >
              {/* Real Demo Photography Image Container */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="px-4 py-2 rounded-xl bg-white/95 text-stone-900 text-xs font-semibold flex items-center gap-2 backdrop-blur-xs shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>View Full High-Res Case Study</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-[10px] font-mono text-amber-300 border border-white/10">
                  {project.rakingAngle}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 mb-2">
                    <span className="text-amber-700 dark:text-amber-400 font-semibold">{project.categoryLabel}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{project.areaM2}m²</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-stone-900 dark:text-[#F5F2EB] group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E7DFD5] dark:border-[#2A2622] space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-1.5 truncate">
                      <Camera className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span className="truncate">{project.exif.camera} &middot; {project.exif.lens}</span>
                    </div>
                    <span className="shrink-0 text-amber-600 font-semibold">{project.finishLevel.split(' ')[0]} {project.finishLevel.split(' ')[1]}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Raking Sun Tested</span>
                    </div>

                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Inspect Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Progress Bar & Instructions */}
        <div className="max-w-7xl mx-auto px-6 mt-4 flex items-center justify-between text-xs text-stone-400 font-mono">
          <div className="flex items-center gap-3">
            <span>Scroll or drag horizontally to skim through gallery</span>
          </div>
          <div className="w-32 sm:w-48 h-1.5 bg-[#E7DFD5] dark:bg-[#2A2622] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all duration-150"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
