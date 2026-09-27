import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import athleteShowcaseImg from '../assets/images/athlete_discipline_showcase_1790544358257.jpg';

export const ShowcaseSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-28 sm:py-40 overflow-hidden bg-black flex items-center justify-center border-y border-white/5"
    >
      {/* Background Volumetric Fog & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-violet-600/15 via-cyan-500/10 to-transparent blur-[160px] pointer-events-none" />

      {/* Huge Background Typography "انضباط" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[18vw] font-black tracking-tighter text-white/[0.04] leading-none select-none">
          انضباط
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-slate-950">
          
          {/* Main Visual: Athlete in oversized hoodie performing workout movement */}
          <div className="relative min-h-[520px] sm:min-h-[620px] w-full flex items-end">
            <img
              src={athleteShowcaseImg}
              alt="ورزشکار حرفه‌ای AURORA-FIT در حال تمرین انضباطی"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />

            {/* Cinematic Gradient Overlays to preserve typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03060a] via-[#03060a]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03060a]/80 via-transparent to-transparent" />

            {/* Foreground Content Card with Quote */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-6">
              
              <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs sm:text-sm tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>فلسفه بنیادین برند</span>
              </div>

              {/* Discipline Heading */}
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                انضباط، پلی میان هدف و واقعیت
              </h3>

              {/* Quote from Brief */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl space-y-3">
                <Quote className="w-8 h-8 text-cyan-400 rotate-180 opacity-70 mb-2" />
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
                  «نتیجه، حاصل کاری است که هر روز تکرار می‌کنی.»
                </blockquote>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed pt-2">
                  در AURORA-FIT، ما انگیزه زودگذر را با سیستم‌های پایدار تمرینی جایگزین می‌کنیم. زمانی که هیچ‌کس تماشا نمی‌کند، عظمت ساخته می‌شود.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-white/10">
                  <span className="font-semibold text-slate-300">مانیفست تمرینی ۲۰۳۰</span>
                  <span className="font-mono text-cyan-400/80">ATHLETE_MINDSET</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
