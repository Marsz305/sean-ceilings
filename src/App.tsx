/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HorizontalGallery } from './components/HorizontalGallery';
import { CraftsmanshipShowcase } from './components/CraftsmanshipShowcase';
import { PlasterSystemsSection } from './components/PlasterSystemsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuotationCalculator } from './components/QuotationCalculator';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('rhino_theme') : null;
    if (saved !== null) {
      return saved === 'dark';
    }
    return false;
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rhino_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rhino_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleOpenQuote = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedProject = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId) || null
    : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121110] text-stone-900 dark:text-[#F5F2EB] flex flex-col font-sans selection:bg-amber-600 selection:text-white transition-colors duration-200 relative">
      {/* 3-Zone Top Bar with Mega Menus and Dark Mode Toggle */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenQuote={handleOpenQuote}
        onSelectProject={(id) => setSelectedProjectId(id)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Split Screen Hero with Real Demo Photo & Zimbabwe Metrics */}
        <Hero
          onExploreGallery={handleExploreGallery}
          onOpenCalculator={handleOpenQuote}
        />

        {/* Smooth Horizontal Scrolling Gallery with FadeInUp animations & Demo Photos */}
        <HorizontalGallery
          projects={PROJECTS}
          onSelectProject={(id) => setSelectedProjectId(id)}
          onRequestQuoteForProject={() => handleOpenQuote()}
        />

        {/* 4-Stage Artisan Skimming Methodology with High-Res Process Photos */}
        <CraftsmanshipShowcase
          onOpenCalculator={handleOpenQuote}
        />

        {/* Gyproc RhinoSet & SAZ / ASTM C840 Standards & Formulations */}
        <PlasterSystemsSection
          onOpenCalculator={handleOpenQuote}
        />

        {/* Harare & Zimbabwean Client Testimonials */}
        <TestimonialsSection />

        {/* Zimbabwe USD Instant Quotation Calculator & Direct Contact */}
        <QuotationCalculator />
      </main>

      {/* Standards-Compliant Architectural Footer with Harare Studio Details */}
      <Footer />

      {/* Floating WhatsApp Widget in Bottom Right (Official WhatsApp Green) */}
      <WhatsAppWidget />

      {/* High-Resolution Project Lightbox Modal with EXIF Data */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
          onRequestQuote={() => {
            setSelectedProjectId(null);
            handleOpenQuote();
          }}
        />
      )}
    </div>
  );
}
