import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenQuickStart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuickStart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setAudioActive(newState);
  };

  const navLinks = [
    { name: 'خانه', href: '#hero' },
    { name: 'تمرین‌ها', href: '#workouts' },
    { name: 'برنامه‌ها', href: '#programs' },
    { name: 'عملکرد', href: '#performance' },
    { name: 'درباره ما', href: '#about' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#03060a]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (display face, clean single element) */}
          <a
            href="#hero"
            className="flex items-center gap-2 group text-white tracking-widest font-black text-xl sm:text-2xl transition-transform duration-200 hover:scale-105"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:bg-cyan-300 transition-colors" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              AURORA-FIT
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-slate-300 hover:text-cyan-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Sound toggle + Primary CTA) */}
          <div className="flex items-center gap-3">
            {/* Ambient Sound Atmosphere Button */}
            <button
              onClick={toggleSound}
              type="button"
              title={audioActive ? 'قطع صدای محیطی' : 'پخش اتمسفر سینمایی صوتی'}
              aria-label="تغییر وضعیت صدای زمینه"
              className={`p-2 rounded-lg transition-all border ${
                audioActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary CTA (In RTL, the arrow points left ←) */}
            <button
              onClick={onOpenQuickStart}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-wide hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>شروع تمرین</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#03060a]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10 border-b border-white/10">
          <nav className="flex flex-col gap-5 text-base font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-slate-200 hover:text-cyan-400 text-lg border-b border-white/5 pb-3 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-500 font-mono">←</span>
              </a>
            ))}
          </nav>

          <div className="space-y-4 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickStart();
              }}
              type="button"
              className="w-full py-3.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-center tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>شروع تمرین</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-slate-500">
              AURORA-FIT • نسل آینده ورزش و تندرستی
            </p>
          </div>
        </div>
      )}
    </>
  );
};
