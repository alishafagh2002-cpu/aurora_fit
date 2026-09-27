import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Flame, BicepsFlexed, Home, Zap, HeartPulse, Check, ArrowLeft } from 'lucide-react';
import { WorkoutCategory } from '../types';

interface WorkoutTypesSectionProps {
  onSelectCategory: (category: WorkoutCategory) => void;
}

export const workoutCategoriesData: WorkoutCategory[] = [
  {
    id: 'bodybuilding',
    name: 'بدنسازی',
    tagline: 'حجم، تفکیک و تراشیدن ساختار عضلانی',
    description: 'برنامه‌های تخصصی ایزوله و ترکیبی برای تقارن کامل عضلانی، بهبود V-Taper و دستیابی به درصد چربی تک‌رقمی.',
    duration: '۶۰-۷۵ دقیقه',
    calories: '۵۵۰ کالری',
    level: 'متوسط تا پیشرفته',
    iconName: 'Dumbbell',
    exercises: [
      { name: 'پرس بالاسینه با دمبل زاویه ۳۰ درجه', sets: '۴ ست', reps: '۸-۱۰ تکرار', tip: 'کشش کامل در پایین و انقباض ۲ ثانیه در اوج دامنه' },
      { name: 'زیربغل سیم‌کش قایقی دست جمع', sets: '۴ ست', reps: '۱۰-۱۲ تکرار', tip: 'عقب کشیدن اسکاپولا قبل از شروع انقباض لتیسیموس' },
      { name: 'نشر از جانب دمبل ایستاده کنترل‌شده', sets: '۴ ست', reps: '۱۲-۱۵ تکرار', tip: 'زاویه دست کمی روبه‌جلو برای درگیری دلتوئید جانبی' },
      { name: 'سوپرست پشت بازو طنابی و جلوبازو لاری', sets: '۳ ست', reps: '۱۲ تکرار', tip: 'بدون استراحت بین دو حرکت برای پمپاژ خون حداکثری' },
    ],
  },
  {
    id: 'fat-burn',
    name: 'چربی‌سوزی',
    tagline: 'آتش متابولیک و حفظ عضلات خشک',
    description: 'ترکیب تمرینات تناوبی با وزنه و اینتروال‌های قلبی برای حداکثر کردن نرخ متابولیسم پایه (BMR) و چربی‌سوزی ۲۴ ساعته.',
    duration: '۴۵ دقیقه',
    calories: '۶۸۰ کالری',
    level: 'تمام سطوح',
    iconName: 'Flame',
    exercises: [
      { name: 'کتل‌بل سوئینگ تناوبی سنگین', sets: '۵ ست', reps: '۲۰ تکرار', tip: 'انفجار لگن رو به جلو بدون قوس دادن کمر' },
      { name: 'اسلم بال انفجاری با توپ سنگین', sets: '۴ ست', reps: '۱۵ تکرار', tip: 'کوبیدن توپ با تمام قدرت عضلات میان‌تنه' },
      { name: 'برپی با جامپ روی جعبه', sets: '۴ ست', reps: '۱۲ تکرار', tip: 'فرود نرم روی پنجه پا برای محافظت از مفاصل' },
      { name: 'بتل روپ (طناب سنگین) موج متناوب', sets: '۴ ست', reps: '۳۰ ثانیه', tip: 'حفظ موقعیت نیمه اسکات و تنفس ریتمیک' },
    ],
  },
  {
    id: 'hypertrophy',
    name: 'عضله‌سازی',
    tagline: 'افزایش حجم خالص تارها بدون چربی زائد',
    description: 'مهندسی بار مکانیکی و هایپرتروفی سارکوپلاسمی با تمرکز بر دامنه کشش تحت فشار (Time Under Tension).',
    duration: '۶۰ دقیقه',
    calories: '۴۸۰ کالری',
    level: 'متوسط',
    iconName: 'Biceps',
    exercises: [
      { name: 'اسکات هک پا با مکث ۲ ثانیه‌ای', sets: '۴ ست', reps: '۸-۱۰ تکرار', tip: 'دامنه عمیق برای کشش فیبرهای چهارسر ران' },
      { name: 'پرس زیرسینه دستگاه هامر', sets: '۴ ست', reps: '۱۰-۱۲ تکرار', tip: 'پرس یکنواخت با حفظ فشار مداوم روی پکتورالیس' },
      { name: 'بارفیکس خنثی با وزنه اضافه', sets: '۳ ست', reps: '۶-۸ تکرار', tip: 'بالا کشیدن چانه فراتر از میله با کنترل کامل' },
      { name: 'ددلیفت رومانیایی با دمبل', sets: '۴ ست', reps: '۱۰ تکرار', tip: 'عقب دادن باسن برای کشش شدید همسترینگ' },
    ],
  },
  {
    id: 'home-workout',
    name: 'تمرین در خانه',
    tagline: 'حداکثر کارایی بدون نیاز به تجهیزات باشگاهی',
    description: 'برنامه‌های هوشمند با وزن بدن، کش‌های مقاومتی و وسایل در دسترس برای کسانی که می‌خواهند در هر زمان و مکانی ورزش کنند.',
    duration: '۳۵ دقیقه',
    calories: '۳۸۰ کالری',
    level: 'مبتدی تا متوسط',
    iconName: 'Home',
    exercises: [
      { name: 'شنا سوئدی الماس و دست باز سوپرست', sets: '۴ ست', reps: '۱۵ تکرار', tip: 'حفظ انقباض شکم و باسن در یک خط مستقیم' },
      { name: 'اسکات پیستول (تک پا) با تکیه‌گاه صندلی', sets: '۳ ست', reps: '۸ تکرار هر پا', tip: 'کنترل کامل فرود و تکیه روی پاشنه' },
      { name: 'دیپ روی صندلی با پای کشیده', sets: '۴ ست', reps: '۱۵ تکرار', tip: 'پایین رفتن تا زاویه ۹۰ درجه آرنج' },
      { name: 'پلانک کوهنوردی ضربدری سرعتی', sets: '۴ ست', reps: '۴۰ ثانیه', tip: 'نزدیک کردن زانو به آرنج مخالف' },
    ],
  },
  {
    id: 'strength-power',
    name: 'تمرین قدرتی',
    tagline: 'لیفت‌های سنگین، رکوردزنی و چگالی استخوانی',
    description: 'پاورلیفتینگ مدرن و وزنه‌برداری المپیکی با تمرکز بر توان خروجی، ایمنی ستون فقرات و به حداکثر رساندن ۱RM.',
    duration: '۷۵ دقیقه',
    calories: '۵۲۰ کالری',
    level: 'پیشرفته',
    iconName: 'Zap',
    exercises: [
      { name: 'ددلیفت سنتی سنگین با میله هالتر', sets: '۵ ست', reps: '۳-۵ تکرار', tip: 'سفت کردن عضلات پشتی بزرگ و لانژ اولیه با پا' },
      { name: 'اسکات از پشت با کمربند مخصوص', sets: '۵ ست', reps: '۵ تکرار', tip: 'رانش زانوها به طرفین و حفظ سینه به سمت بالا' },
      { name: 'پرس سینه تخت هالتر پاورلیفتری', sets: '۵ ست', reps: '۵ تکرار', tip: 'لگ درایو قدرتمند و تثبیت کتف‌ها روی نیمکت' },
      { name: 'پرس نظامی ایستاده با میله المپیکی', sets: '۴ ست', reps: '۶ تکرار', tip: 'فشار عمودی خالص با قفل کردن کامل در انتها' },
    ],
  },
  {
    id: 'cardio',
    name: 'تمرین هوازی',
    tagline: 'سلامت قلب، عروق باز و استقامت تنفسی نامحدود',
    description: 'ترکیب تمرینات زون ۲ برای ساخت پایه میتوکندریایی و دوی سرعت اینتروال برای تقویت توان انفجاری قلبی-عروقی.',
    duration: '۵۰ دقیقه',
    calories: '۶۰۰ کالری',
    level: 'تمام سطوح',
    iconName: 'HeartPulse',
    exercises: [
      { name: 'دویدن اینتروال پیرامونی ۴۰۰ متر', sets: '۶ دور', reps: 'با ۹۰ ثانیه استراحت', tip: 'تنفس عمیق شکمی و گام‌های پیوسته ریتمیک' },
      { name: 'روئینگ با مقاومت سطح ۸', sets: '۴ ست', reps: '۵۰۰ متر زیر ۱:۴۵ دقیقه', tip: 'رانش قوی پاها سپس کشش بالاتنه' },
      { name: 'طناب زدن دابل آندر (دو دور چرخش)', sets: '۵ ست', reps: '۴۰ تکرار', tip: 'پرش کوتاه از مچ پا و چرخش سریع مچ دست' },
      { name: 'پله‌نوردی با سرعت متغیر و بار سبک', sets: '۲۰ دقیقه', reps: 'پیوسته', tip: 'گام گذاشتن با کل کف پا برای درگیری سرینی' },
    ],
  },
];

export const WorkoutTypesSection: React.FC<WorkoutTypesSectionProps> = ({ onSelectCategory }) => {
  const [selectedId, setSelectedId] = useState<string>('bodybuilding');

  const selectedCategory =
    workoutCategoriesData.find((c) => c.id === selectedId) || workoutCategoriesData[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Dumbbell': return <Dumbbell className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Biceps': return <BicepsFlexed className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      default: return <Dumbbell className="w-5 h-5" />;
    }
  };

  return (
    <section id="workouts" className="py-24 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-cyan-400 uppercase">
            دسته‌بندی‌های هدفمند
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3 mb-4">
            تمرین مناسب خودت را پیدا کن
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            فرقی نمی‌کند هدفتان رکوردزنی در باشگاه باشد یا کاهش سریع چربی در خانه؛ مسیر تمرینی اختصاصی شما اینجاست.
          </p>
        </div>

        {/* 6 Category Interactive Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {workoutCategoriesData.map((category) => {
            const isSelected = selectedId === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedId(category.id)}
                type="button"
                className={`flex flex-col items-center justify-center p-4 rounded-xl text-center transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/50 border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg mb-2 ${
                    isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-slate-300'
                  }`}
                >
                  {getIcon(category.iconName)}
                </div>
                <span className="font-bold text-sm tracking-wide">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Drilldown Showcase Card */}
        <motion.div
          key={selectedCategory.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Corner Blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Category Overview */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-wider">
                  پروتکل تمرینی انتخابی
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-2">
                  {selectedCategory.name}
                </h3>
                <p className="text-cyan-300 font-semibold text-sm">
                  {selectedCategory.tagline}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedCategory.description}
              </p>

              {/* Metrics Badge Row */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/40 border border-white/10">
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 block mb-1">مدت زمان</span>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {selectedCategory.duration}
                  </span>
                </div>
                <div className="text-center border-x border-white/10">
                  <span className="text-[11px] text-slate-400 block mb-1">کالری تقریبی</span>
                  <span className="text-sm font-bold text-cyan-400 tabular-nums">
                    {selectedCategory.calories}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 block mb-1">سطح دشواری</span>
                  <span className="text-sm font-bold text-white">
                    {selectedCategory.level}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectCategory(selectedCategory)}
                type="button"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-sm tracking-wide hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>شروع یا شخصی‌سازی این روتین</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Exercise Breakdown List */}
            <div className="lg:col-span-7 bg-black/40 rounded-2xl p-5 sm:p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">فهرست حرکات روتین نمونه</span>
                <span>۴ حرکت کلیدی با بیومکانیک دقیق</span>
              </div>

              <div className="space-y-3">
                {selectedCategory.exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-white">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <span>{ex.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 pr-7">
                        💡 نکته تکنیکی: {ex.tip}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pr-7 sm:pr-0 shrink-0">
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-300 font-mono tabular-nums">
                        {ex.sets}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-400/30 text-xs text-cyan-300 font-mono tabular-nums">
                        {ex.reps}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
