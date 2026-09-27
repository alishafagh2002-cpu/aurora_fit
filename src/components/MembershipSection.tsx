import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, ArrowLeft } from 'lucide-react';
import { PricingPlan } from '../types';

interface MembershipSectionProps {
  onSelectPlan: (plan: PricingPlan, isAnnual: boolean) => void;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'شروع',
    priceMonthly: 19,
    priceAnnual: 15,
    currency: 'یورو',
    period: 'ماه',
    description: 'مناسب برای ورزشکارانی که به دنبال شروع قدرتمند و ایجاد ثبات تمرینی هستند.',
    features: [
      'برنامه‌های پایه و دوره‌های مقدماتی',
      'کتابخانه تمرین با بیش از ۴۰۰ حرکت ۳D',
      'ثبت پیشرفت و رکوردهای وزنه',
      'دسترسی به اپلیکیشن در تمام پلتفرم‌ها',
      'پشتیبانی استاندارد',
    ],
    ctaText: 'انتخاب پلن شروع',
  },
  {
    id: 'pro',
    name: 'حرفه‌ای',
    priceMonthly: 39,
    priceAnnual: 31,
    currency: 'یورو',
    period: 'ماه',
    isPopular: true,
    description: 'انتخاب شماره یک ورزشکاران جدی که خواهان رشد سریع‌تر و تحلیل فیزیولوژیک هستند.',
    features: [
      'برنامه‌های پیشرفته هیبرید و هایپرتروفی',
      'برنامه شخصی‌سازی‌شده بر اساس هوش بیومتریک',
      'تحلیل عملکرد هفتگی و ریکاوری CNS',
      'راهنمای جامع تغذیه و ماکروشماری',
      'به‌روزرسانی هفتگی سیستم تمرینی',
      'پشتیبانی اولویت‌دار اختصاصی',
    ],
    ctaText: 'ارتقا به سطح حرفه‌ای',
  },
  {
    id: 'elite',
    name: 'الیت',
    priceMonthly: 69,
    priceAnnual: 55,
    currency: 'یورو',
    period: 'ماه',
    description: 'نهایت امکانات برای کسانی که سطحی جز بهترین را نمی‌پذیرند؛ هدایت مستقیم مربی ارشد.',
    features: [
      'تمام امکانات سطح حرفه‌ای',
      'مربی شخصی اختصاصی با چت مستقیم',
      'آنالیز پیشرفته ویدئویی فرم حرکات',
      'برنامه اختصاصی دوره‌ای و فصلی',
      'پروتکل اختصاصی مکمل و آزمایش خون',
      'مشاوره صوتی-تصویری ماهانه با تیم علمی',
    ],
    ctaText: 'عضویت در کلوپ الیت',
  },
];

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs sm:text-sm tracking-wider mb-3">
            <Zap className="w-4 h-4" />
            <span>پلن‌های عضویت انحصاری</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            سطح بعدی خودت را انتخاب کن
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            سرمایه‌گذاری روی قوی‌ترین نسخه جسم و روان شما. بدون قراردادهای پیچیده؛ لغو اشتراک در هر لحظه.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-xl bg-slate-900/90 border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              type="button"
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              پرداخت ماهانه
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              type="button"
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>پرداخت سالانه</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-black/20 text-slate-950">
                ۲۰٪ تخفیف
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-[#050c18] border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.25)] lg:-translate-y-3'
                    : 'bg-slate-900/40 border-white/10 hover:border-white/25 hover:bg-slate-900/60'
                }`}
              >
                {/* Visual Popular Ribbon */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 right-8">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 text-xs font-black tracking-wide shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      محبوب‌ترین انتخاب
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="mb-8 pb-6 border-b border-white/10 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tabular-nums tracking-tight">
                      {price}
                    </span>
                    <span className="text-slate-300 text-base font-bold">
                      {plan.currency}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold text-slate-400 tracking-wider block mb-4">
                      امکانات و مزایا:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                        <div
                          className={`mt-0.5 p-0.5 rounded-full shrink-0 ${
                            plan.isPopular
                              ? 'bg-cyan-400 text-slate-950'
                              : 'bg-white/10 text-cyan-400'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan, isAnnual)}
                  type="button"
                  className={`w-full py-4 rounded-xl font-black text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-white text-slate-950 hover:bg-cyan-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                      : 'bg-white/5 border border-white/15 text-white hover:bg-white/15 hover:border-cyan-400/40'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
