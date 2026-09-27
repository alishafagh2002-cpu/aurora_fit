import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Flame } from 'lucide-react';

interface MotivationalSectionProps {
  onOpenQuickStart: () => void;
}

export const MotivationalSection: React.FC<MotivationalSectionProps> = ({ onOpenQuickStart }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#03060a] via-slate-950 to-[#03060a]">
      {/* Background Volumetric Center Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Subtle Brand Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs sm:text-sm font-semibold"
        >
          <Flame className="w-4 h-4 text-cyan-400" />
          <span>تعهد بی‌قید و شرط به پیشرفت</span>
        </motion.div>

        {/* Dramatic Huge Typography */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight"
          >
            امروز شروع کن.
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-l from-white via-cyan-200 to-teal-400"
          >
            فردای تو منتظر تو نیست.
          </motion.h3>
        </div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-slate-300 text-base sm:text-xl lg:text-2xl font-normal max-w-2xl mx-auto leading-relaxed"
        >
          هر تکرار، هر قدم و هر قطره عرق تو را به نسخه قویتری از خودت نزدیک می‌کند.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="pt-4"
        >
          <button
            onClick={onOpenQuickStart}
            type="button"
            className="inline-flex items-center gap-3 px-9 py-4 sm:px-10 sm:py-5 rounded-2xl bg-white text-slate-950 font-black text-base sm:text-lg tracking-wide hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all duration-200 active:scale-95 group cursor-pointer"
          >
            <span>شروع تمرین</span>
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
