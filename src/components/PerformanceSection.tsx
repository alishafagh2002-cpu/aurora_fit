import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Activity, Compass, ArrowUpRight, Flame, Trophy, CheckCircle2 } from 'lucide-react';
import { WeeklyProgressTracker } from './WeeklyProgressTracker';
import { NeonRunnerBoy } from './NeonRunnerBoy';

export const PerformanceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'power' | 'endurance' | 'discipline'>('power');

  const metrics = [
    {
      id: 'power',
      title: 'قدرت',
      subtitle: 'افزایش قدرت و توان عضلانی',
      stat: '+۸۵٪',
      statLabel: 'رشد توان خروجی در ۸ هفته',
      description:
        'طراحی شده برای فعال‌سازی حداکثری فیبرهای عضلانی نوع دو (تند انقباض)، اضافه بار پیشرونده هوشمند و ثبت رکوردهای جدید در حرکات چندمفصلی.',
      icon: Dumbbell,
      accent: 'from-cyan-500/20 to-teal-500/5',
      borderColor: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
      bullets: [
        'تحریک سیستم عصبی مرکزی برای انفجار توان',
        'افزایش تراکم تارهای انقباضی و هایپرتروفی تارها',
        'کاهش احتمال آسیب‌دیدگی مفصلی با الگوی تصحیحی',
      ],
    },
    {
      id: 'endurance',
      title: 'استقامت',
      subtitle: 'بیشتر تمرین کن، دیرتر خسته شو',
      stat: '۳.۲X',
      statLabel: 'ظرفیت هوازی و آستانه لاکتات',
      description:
        'بهینه‌سازی سیستم‌های انرژی گلیکولیتیک و فسفاژن به همراه سازگاری قلبی-عروقی پیشرفته برای تحمل بارهای تمرینی با شدت فرین.',
      icon: Activity,
      accent: 'from-violet-500/20 to-indigo-500/5',
      borderColor: 'border-violet-500/30',
      textColor: 'text-violet-400',
      bullets: [
        'افزایش تراکم میتوکندریایی در سلول‌های ماهیچه',
        'تسریع پاکسازی اسید لاکتیک در حین تمرین سنگین',
        'بهبود جذب و توزیع اکسیژن با متد هیپوکسی کنترل‌شده',
      ],
    },
    {
      id: 'discipline',
      title: 'انضباط',
      subtitle: 'هر روز یک قدم جلوتر',
      stat: '۱۰۰٪',
      statLabel: 'استمرار روزانه و پیگیری بیومتریک',
      description:
        'انضباط ورزشی راز پایداری قهرمانان است. با تقویم هوشمند، اعلان‌های بیومتریک و نمودارهای ثبات عادت، هر روز یک قدم به نسخه آرمانی نزدیک‌تر شوید.',
      icon: Compass,
      accent: 'from-teal-500/20 to-emerald-500/5',
      borderColor: 'border-teal-500/30',
      textColor: 'text-teal-400',
      bullets: [
        'سیستم سنجش شاخص خستگی (HRV) و ریکاوری',
        'پاداش‌های مرحله‌ای برای پایداری زنجیره تمرینات',
        'تنظیم خودکار حجم تمرین بر اساس آمادگی بدنی روزانه',
      ],
    },
  ];

  const currentMetric = metrics.find((m) => m.id === activeTab) || metrics[0];

  return (
    <section id="performance" className="py-24 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs sm:text-sm font-bold tracking-widest text-cyan-400 uppercase">
              مهندسی بیومکانیک و فیزیولوژی
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              بدن تو. قدرت تو. تحول تو.
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              سه ستون بنیادین سیستم آرورا فیت که برای عبور از مرزهای معمول فیزیولوژی بدن انسان مهندسی شده‌اند.
            </p>
          </motion.div>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const isSelected = activeTab === metric.id;

            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => setActiveTab(metric.id as 'power' | 'endurance' | 'discipline')}
                className={`group relative rounded-2xl p-7 transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? `bg-slate-900/90 ${metric.borderColor} shadow-[0_10px_35px_-5px_rgba(6,182,212,0.25)]`
                    : 'bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.accent} opacity-60 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                  {/* Top Bar with Icon & Stat */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${metric.textColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">
                      {metric.stat}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1.5 flex items-center gap-2">
                      <span>{metric.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className={`text-sm font-semibold ${metric.textColor} mb-3`}>
                      {metric.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {metric.statLabel}
                    </p>
                  </div>

                  {/* Active Indicator Line */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isSelected ? 'bg-cyan-400 w-full' : 'w-0 group-hover:w-1/3 bg-white/40'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Interactive Metric Panel */}
        <motion.div
          key={currentMetric.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950 p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden mb-16"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-wider">
                <Flame className="w-4 h-4" />
                <span>بررسی عمیق مکانیزم: {currentMetric.title}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-white">
                {currentMetric.subtitle}
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentMetric.description}
              </p>
              
              <div className="space-y-2.5 pt-2">
                {currentMetric.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/40 rounded-xl p-5 sm:p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-white/10">
                <span>نمودار بازدهی هفتگی</span>
                <span className="text-cyan-400 font-mono">AURORA_CORE_METRICS</span>
              </div>

              {/* Synthetic Visual Performance Curves */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">راندمان انقباض عضلانی</span>
                    <span className="text-cyan-300 font-mono tabular-nums">۹۴٪</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full w-[94%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">سرعت تخلیه لاکتات</span>
                    <span className="text-violet-300 font-mono tabular-nums">۸۸٪</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full w-[88%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-300">شاخص آمادگی عصبی (CNS)</span>
                    <span className="text-emerald-300 font-mono tabular-nums">۹۷٪</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full w-[97%]" />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Trophy className="w-3.5 h-3.5" /> وضعیت: سازگاری فوق‌العاده
                </span>
                <span className="font-mono text-slate-500">ISO-2030 SPEC</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 1. WEEKLY PROGRESS TRACKER (نمایشگر پیشرفت هفتگی با نمودار خطی متحرک نئونی) */}
        <WeeklyProgressTracker />

        {/* 2. NEON RUNNER BOY ANIMATION (انیمیشن کاراکتر پسر دونده در پیست نئونی) */}
        <div className="mt-8">
          <NeonRunnerBoy />
        </div>

      </div>
    </section>
  );
};
