import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Star, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 border-b border-[#E7DFD5] dark:border-[#262420] bg-white dark:bg-[#151413] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono tracking-widest text-amber-700 dark:text-amber-400 uppercase mb-2 font-semibold">
            Zimbabwean Architect &amp; Builder Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 dark:text-[#F5F2EB]">
            Client Feedback &amp; Project Sign-Offs
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Verified testimonials from leading Harare architects, boutique developers, and interior designers across Zimbabwe.
          </p>
        </div>

        {/* 2x2 Clean Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl border border-[#E7DFD5] dark:border-[#2E2A25] bg-[#FAF8F5] dark:bg-[#1C1A17] flex flex-col justify-between hover:border-amber-500/50 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <blockquote className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#E7DFD5] dark:border-[#2A2622] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-stone-900 dark:text-[#F5F2EB] flex items-center gap-1.5">
                    <span>{item.author}</span>
                    {item.verified && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 inline" />
                    )}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {item.role} &middot; <span className="text-amber-700 dark:text-amber-400 font-medium">{item.company}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">{item.projectTitle}</div>
                  <div className="text-[10px] font-mono text-stone-400">{item.location} &middot; {item.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
