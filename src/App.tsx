import React, { useState } from 'react';
import { AuroraCanvas } from './components/AuroraCanvas';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PerformanceSection } from './components/PerformanceSection';
import { ProgramsSection } from './components/ProgramsSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { WorkoutTypesSection } from './components/WorkoutTypesSection';
import { MembershipSection } from './components/MembershipSection';
import { MotivationalSection } from './components/MotivationalSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { QuickStartModal } from './components/QuickStartModal';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { MembershipCheckoutModal } from './components/MembershipCheckoutModal';
import { TrainingProgram, WorkoutCategory, PricingPlan } from './types';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isQuickStartOpen, setIsQuickStartOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<{ plan: PricingPlan; isAnnual: boolean } | null>(null);
  const [finalSectionBoost, setFinalSectionBoost] = useState(false);

  const handleOpenPrograms = () => {
    const el = document.getElementById('programs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: WorkoutCategory) => {
    setIsQuickStartOpen(true);
  };

  const handleEnrollProgram = (program: TrainingProgram) => {
    setSelectedProgram(null);
    setIsQuickStartOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#03060a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* 1. Cinematic Initial Loading Screen (Section 21) */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* 2. Interactive 3D WebGL Aurora Energy Ring & Particle Canvas (Sections 3, 4, 15) */}
      <AuroraCanvas intensityBoost={finalSectionBoost} />

      {/* Background Grid Accent Layer */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Main Interactive Application Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Navigation Bar (Section 5) */}
        <Navbar onOpenQuickStart={() => setIsQuickStartOpen(true)} />

        <main>
          {/* Hero Section (Sections 2, 6, 7, 8) */}
          <HeroSection
            onOpenQuickStart={() => setIsQuickStartOpen(true)}
            onExplorePrograms={handleOpenPrograms}
          />

          {/* Performance Section (Section 9) */}
          <PerformanceSection />

          {/* Training Programs (Section 10) */}
          <ProgramsSection onSelectProgram={(prog) => setSelectedProgram(prog)} />

          {/* Athlete Showcase (Section 11) */}
          <ShowcaseSection />

          {/* Workout Types (Section 12) */}
          <WorkoutTypesSection onSelectCategory={handleSelectCategory} />

          {/* Membership & Pricing (Section 13) */}
          <MembershipSection
            onSelectPlan={(plan, isAnnual) => setCheckoutPlan({ plan, isAnnual })}
          />

          {/* Motivational Section (Section 14) */}
          <MotivationalSection onOpenQuickStart={() => setIsQuickStartOpen(true)} />

          {/* Final CTA Section (Section 15) */}
          <FinalCtaSection
            onOpenQuickStart={() => setIsQuickStartOpen(true)}
            onHoverSection={(active) => setFinalSectionBoost(active)}
          />
        </main>

        {/* Footer (Section 16) */}
        <Footer />
      </div>

      {/* Modals & Dialogs */}
      <QuickStartModal
        isOpen={isQuickStartOpen}
        onClose={() => setIsQuickStartOpen(false)}
      />

      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onEnroll={handleEnrollProgram}
      />

      <MembershipCheckoutModal
        plan={checkoutPlan ? checkoutPlan.plan : null}
        isAnnual={checkoutPlan ? checkoutPlan.isAnnual : false}
        onClose={() => setCheckoutPlan(null)}
      />
    </div>
  );
}
