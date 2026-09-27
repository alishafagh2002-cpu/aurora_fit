import React from 'react';
import { X, Clock, Zap, Target, CheckCircle2, Calendar, Dumbbell, ArrowLeft } from 'lucide-react';
import { TrainingProgram } from '../types';

interface ProgramDetailModalProps {
  program: TrainingProgram | null;
  onClose: () => void;
  onEnroll: (program: TrainingProgram) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onEnroll,
}) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 left-5 z-20 p-2 rounded-xl bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          
          <div className="absolute bottom-6 right-6 left-6 z-10">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
              <span>سیستم تمرینی تخصصی</span>
              <span>·</span>
              <span>سطح: {program.level}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              برنامه تمرینی: {program.title}
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              {program.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Quick Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 text-center">
            <div>
              <span className="text-xs text-slate-400 block mb-1">طول دوره</span>
              <span className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{program.duration}</span>
              </span>
            </div>
            <div className="border-x border-white/10">
              <span className="text-xs text-slate-400 block mb-1">شدت محرک</span>
              <span className="text-sm sm:text-base font-bold text-cyan-300 flex items-center justify-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{program.intensity}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">پیش‌نیاز آمادگی</span>
              <span className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-1.5">
                <Target className="w-4 h-4 text-teal-400" />
                <span>{program.level}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {program.description}
          </p>

          {/* Weekly Schedule Breakdown */}
          <div className="space-y-4">
            <h4 className="text-base font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>تقویم و جزئیات جلسات هفتگی</span>
            </h4>

            <div className="space-y-3">
              {program.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-cyan-500/20 transition-colors"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-cyan-300">
                      {item.day}: {item.focus}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      جلسه {idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.exercises.map((ex, exIdx) => (
                      <span
                        key={exIdx}
                        className="text-xs px-2.5 py-1 rounded bg-black/40 border border-white/10 text-slate-300"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onEnroll(program)}
              type="button"
              className="flex-1 py-4 px-6 rounded-xl bg-cyan-400 text-slate-950 font-black text-sm text-center hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <span>ثبت‌نام و شروع این دوره</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              type="button"
              className="py-4 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              بستن
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
