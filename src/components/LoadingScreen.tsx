import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        // Smooth logarithmic increment
        const step = Math.max(2, Math.floor((100 - prev) * 0.15));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03060a] select-none"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute w-64 h-64 rounded-full bg-violet-600/10 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Brand Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                AURORA-FIT
              </h1>
            </motion.div>

            {/* Persian subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-slate-400 text-sm sm:text-base font-normal tracking-wide mb-8"
            >
              در حال آماده‌سازی تجربه تمرینی...
            </motion.p>

            {/* Aurora Progress Bar */}
            <div className="w-56 sm:w-72 h-[3px] bg-slate-800/80 rounded-full overflow-hidden relative border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Numeric percentage */}
            <span className="mt-3 text-xs font-mono text-cyan-400/80 tabular-nums">
              {progress}٪
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
