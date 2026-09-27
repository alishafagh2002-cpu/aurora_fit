import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Shield, Zap, Target } from 'lucide-react';
import heroAthleteImg from '../assets/images/hero_athlete_hoodie_1790544344929.jpg';

interface HeroSectionProps {
  onOpenQuickStart: () => void;
  onExplorePrograms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuickStart,
  onExplorePrograms,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* Background Radial Light Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/15 via-violet-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Right Column in RTL (Text & CTAs) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-right space-y-6 lg:space-y-8"
        >
          {/* Subtle Brand Tagline */}
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs sm:text-sm tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>نسل آینده بدنسازی و تناسب اندام ۲۰۳۰</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">سیستم تمرینی آرورا</span>
          </div>

          {/* Main Huge Typography */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] text-balance">
              فراتر از محدودیت‌ها
            </h1>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] bg-clip-text text-transparent bg-gradient-to-l from-white via-cyan-200 to-teal-400">
              قوی‌تر از دیروز
            </h2>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal max-w-2xl leading-relaxed text-balance">
            بدنت را بساز. ذهنت را قدرتمند کن. نسخه بهتر خودت را بساز.
          </p>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            ترکیبی از بیومکانیک پیشرفته، تمرینات هیبریدی و فناوری‌های هوشمند ورزشی برای دستیابی به حداکثر چگالی عضلانی، استقامت بی‌نهایت و انضباط پولادین.
          </p>

          {/* CTA Buttons (Section 8) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Button */}
            <button
              onClick={onOpenQuickStart}
              type="button"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-slate-950 font-extrabold text-base tracking-wide hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <span>شروع تمرین</span>
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={onExplorePrograms}
              type="button"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-white/5 border border-white/15 text-slate-200 font-semibold text-base hover:bg-white/10 hover:text-white hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>مشاهده برنامه‌ها</span>
            </button>
          </div>

          {/* Key Value Highlights */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full max-w-xl">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                +۸۵٪
              </span>
              <span className="text-xs text-slate-400 mt-1">توان عضلانی خالص</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 tabular-nums">
                ۳.۲X
              </span>
              <span className="text-xs text-slate-400 mt-1">سرعت ریکاورى سلولی</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                ۱۰۰٪
              </span>
              <span className="text-xs text-slate-400 mt-1">شخصی‌سازی بیومتریک</span>
            </div>
          </div>
        </motion.div>

        {/* Left Column in RTL (Central Visual: Athlete in Oversized Black Hoodie with Aurora Ring Backdrop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Glowing Aura Ring Frame Behind Athlete */}
          <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-b from-cyan-500/20 via-transparent to-violet-600/20 blur-xl pointer-events-none" />

          {/* Athlete Image Container */}
          <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-gradient-to-b from-slate-900 to-[#03060a]">
            {/* Cinematic Image of Athlete in Black Oversized Hoodie */}
            <img
              src={heroAthleteImg}
              alt="ورزشکار حرفه‌ای AURORA-FIT با هودی مشکی اورسایز در حال تمرین"
              referrerPolicy="no-referrer"
              className="w-full h-[460px] sm:h-[540px] lg:h-[600px] object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Cinematic Gradient Overlays to seamlessly blend into dark scene */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03060a] via-transparent to-transparent opacity-85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03060a]/60 via-transparent to-transparent opacity-40" />

            {/* Floating Live Bio-Indicator HUD Card */}
            <div className="absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-[#03060a]/80 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">وضعیت زیستی: اوج آمادگی</div>
                  <div className="text-slate-400 text-xs font-mono">AURORA BIO-PULSE · 98%</div>
                </div>
              </div>
              <div className="text-left">
                <span className="inline-block px-2 py-1 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 text-xs font-mono font-bold tabular-nums">
                  ۱۷۲ ضربان
                </span>
              </div>
            </div>

            {/* Subtle Corner Accents */}
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-cyan-400/70 bg-black/60 px-2.5 py-1 rounded border border-cyan-500/20">
              ATHLETE // 01
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
