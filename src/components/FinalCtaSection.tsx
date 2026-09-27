import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenQuickStart: () => void;
  onHoverSection?: (active: boolean) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenQuickStart,
  onHoverSection,
}) => {
  return (
    <section
      onMouseEnter={() => onHoverSection?.(true)}
      onMouseLeave={() => onHoverSection?.(false)}
      className="relative py-32 sm:py-48 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-center flex flex-col items-center justify-center border-t border-white/10"
    >
      {/* Concentrated Aurora Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/25 via-teal-400/20 to-violet-600/25 rounded-full blur-[160px] pointer-events-none animate-pulse duration-1000" />

      {/* Subtle Aurora Concentric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-cyan-500/20 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-cyan-500/10 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 text-cyan-300 font-bold text-xs sm:text-sm tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>پایان یک دوره، آغاز یک افسانه</span>
        </div>

        {/* Huge Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight"
        >
          نسخه بعدی تو آماده است.
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-300 text-lg sm:text-2xl font-medium max-w-xl mx-auto leading-relaxed"
        >
          وقتشه محدودیت‌های خودت رو کنار بزنی.
        </motion.p>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-4"
        >
          <button
            onClick={onOpenQuickStart}
            type="button"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 text-slate-950 font-black text-lg tracking-wide hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <span>شروع با AURORA-FIT</span>
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1.5" />
          </button>
        </motion.div>

        {/* Quiet assurance text */}
        <p className="text-xs text-slate-500 pt-4">
          پشتیبانی بیومتریک ۲۴/۷ · گارانتی بازگشت وجه ۱۴ روزه · عضویت فوری
        </p>

      </div>
    </section>
  );
};
