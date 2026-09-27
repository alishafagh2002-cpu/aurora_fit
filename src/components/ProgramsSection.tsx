import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Zap, Target, Sparkles } from 'lucide-react';
import strengthImg from '../assets/images/program_strength_1790544368907.jpg';
import movementImg from '../assets/images/program_movement_1790544380103.jpg';
import enduranceImg from '../assets/images/program_endurance_1790544389767.jpg';
import { TrainingProgram } from '../types';

interface ProgramsSectionProps {
  onSelectProgram: (program: TrainingProgram) => void;
}

export const programsData: TrainingProgram[] = [
  {
    id: 'strength',
    title: 'قدرت',
    subtitle: 'ساخت عضلات چگال و توان انفجاری',
    description: 'تمرینات قدرتی برای ساخت عضلات قدرتمند، افزایش دانسیته استخوانی و ارتقای توان عضلانی با اصول اضافه بار پیشرونده.',
    image: strengthImg,
    duration: '۱۲ هفته',
    intensity: 'بسیار بالا',
    level: 'پیشرفته',
    features: [
      'تمرکز بر حرکات مادر (اسکات، ددلیفت، پرس سینه، بارفیکس)',
      'سیکل‌های موجی توان خروجی و هایپرتروفی تارها',
      'راهنمای ریکاوری عصبی و مصرف مکمل‌های اختصاصی',
    ],
    schedule: [
      { day: 'شنبه', focus: 'سینه و پشت بازو سنگین', exercises: ['پرس سینه هالتر ۴×۶', 'پرس بالاسینه دمبل ۳×۸', 'دیپ با وزنه ۳×۱۰', 'پشت بازو سیم‌کش ۴×۱۲'] },
      { day: 'یکشنبه', focus: 'زیربغل و جلوبازو انفجاری', exercises: ['ددلیفت قدرتی ۴×۵', 'بارفیکس دست باز با وزنه ۳×۸', 'زیربغل هالتر خم ۴×۸', 'جلوبازو هالتر EZ ۴×۱۰'] },
      { day: 'دوشنبه', focus: 'ریکاوری فعال و موبیلیتی', exercises: ['تمرینات تنفسی ۱۰ دقیقه', 'فوم رولر و کشش پویا ۲۰ دقیقه'] },
      { day: 'سه‌شنبه', focus: 'سرشانه و کول فوق سنگین', exercises: ['پرس سرشانه نظامی ۴×۶', 'نشر از جانب دمبل ایستاده ۴×۱۲', 'کول هالتر ۳×۱۰', 'فیس پول سیم‌کش ۴×۱۵'] },
      { day: 'چهارشنبه', focus: 'پا و زنجیره خلفی قدرت', exercises: ['اسکات سنگین ۵×۵', 'پرس پا ۴×۱۰', 'پشت پا دستگاه ۴×۱۲', 'ساق پا ایستاده ۵×۱۵'] },
    ],
  },
  {
    id: 'movement',
    title: 'حرکت',
    subtitle: 'انعطاف، کنترل و هماهنگی عصبی-عضلانی',
    description: 'تمرینات حرکتی برای انعطاف و کنترل بهتر بدن، رهایی از دردهای مفصلی و بازکردن دامنه حرکتی کامل مفاصل با کالیستنیکس و ژیمناستیک مدرن.',
    image: movementImg,
    duration: '۸ هفته',
    intensity: 'متوسط تا بالا',
    level: 'تمام سطوح',
    features: [
      'آزادسازی فاشیا و انعطاف‌پذیری پویا',
      'کنترل وزن بدن در فضا و ثبات مرکزی (Core)',
      'کاهش سفتی عضلانی ناشی از تمرینات سنگین',
    ],
    schedule: [
      { day: 'شنبه', focus: 'موبیلیتی ستون فقرات و شانه', exercises: ['چرخش قفسه سینه ۳×۱۰', 'حرکت گربه-گاو پویا ۳ دقیقه', 'کشش شانه با کش ۴×۱۵', 'پلانک هالو بادی ۳×۴۵ ثانیه'] },
      { day: 'یکشنبه', focus: 'انعطاف زنجیره خلفی و لگن', exercises: ['اسکات کوزاک ۳×۱۰ هر سمت', 'کشش پیجون پویا ۳ دقیقه', 'لانج روبه‌جلو با چرخش تنه ۴×۱۲', 'کیک‌بک باسن ۳×۱۵'] },
      { day: 'دوشنبه', focus: 'تعادل و پایداری مفاصل مچ و زانو', exercises: ['اسکات تک پا بدون وزنه ۳×۸', 'راه رفتن تیغه‌ای مچ پا ۳ ست', 'ایستادن تعادلی با چشمان بسته ۲ دقیقه'] },
      { day: 'سه‌شنبه', focus: 'جریان‌های حرکتی انیمال فلو', exercises: ['خزش خرس پویا ۴×۲۰ متر', 'انتقال کرب به بیست ۳×۱۰', 'اسکورپیون ریچ ۳×۸ هر طرف'] },
      { day: 'چهارشنبه', focus: 'کالیستنیکس پایه و بارفیکس', exercises: ['هول اسکات عمیق ۴×۱ دقیقه', 'ال-سیت روی پارالل ۳×۱۵ ثانیه', 'بارفیکس هول در بالا ۳×۲۰ ثانیه'] },
    ],
  },
  {
    id: 'endurance',
    title: 'استقامت',
    subtitle: 'انرژی پایدار و ظرفیت هوایی فرین',
    description: 'برنامه‌های حرفه‌ای برای افزایش استقامت و انرژی، چربی‌سوزی هدفمند و ارتقای حداکثر اکسیژن مصرفی (VO2 Max) با اینتروال‌های پرشدت.',
    image: enduranceImg,
    duration: '۱۰ هفته',
    intensity: 'بسیار بالا',
    level: 'متوسط تا حرفه‌ای',
    features: [
      'پروتکل‌های پیشرفته HIIT و تاباتا ورزشی',
      'ارتقای ضربان قلب هدف و ظرفیت شش‌ها',
      'چربی‌سوزی حداکثری با اثر پس‌سوزی EPOC تا ۳۶ ساعت',
    ],
    schedule: [
      { day: 'شنبه', focus: 'اینتروال دویدن پرشدت (HIIT)', exercises: ['گرم‌کردن ۱۰ دقیقه', 'اسپرینت ۱۰۰ متر با ۹۰٪ توان × ۸ تکرار', 'استراحت فعال بین ست‌ها ۱ دقیقه', 'سرد کردن پویا'] },
      { day: 'یکشنبه', focus: 'مجموعه متکام (Metabolic Conditioning)', exercises: ['کتل‌بل سوئینگ ۵×۲۰', 'برپی انفجاری ۵×۱۵', 'باکس جامپ ۵×۱۲', 'روئینگ دستگاه ۵۰۰ متر × ۴'] },
      { day: 'دوشنبه', focus: 'هوازی ملایم با ضربان ثابت (Zone 2)', exercises: ['دوچرخه ثابت یا الپتیکال با ضربان قلب ۱۲۰-۱۳۵ به مدت ۴۵ دقیقه'] },
      { day: 'سه‌شنبه', focus: 'استقامت عضلانی بی‌پایان', exercises: ['شنا سوئدی ۵×۲۰', 'اسکات پرشی ۴×۱۵', 'طناب زدن مداوم ۳×۳ دقیقه', 'مانتین کلایمبر ۴×۴۰ ثانیه'] },
      { day: 'چهارشنبه', focus: 'شبیه‌سازی مسابقه و تست VO2', exercises: ['تست کوپر ۱۲ دقیقه‌ای', 'تمرینات تنفسی باکسینگ ۵ دقیقه'] },
    ],
  },
];

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="programs" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs sm:text-sm tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>معماری بدنی مدرن</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              برنامه‌های تمرینی
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              طراحی شده توسط قهرمانان ورزشی و دانشمندان بیومکانیک. برنامه متناسب با هدف خود را انتخاب کنید و سفر تحول را آغاز نمایید.
            </p>
          </div>

          <div className="text-slate-400 text-sm font-medium hidden md:block">
            برای مشاهده جزئیات حرکات، روی هر کارت کلیک کنید.
          </div>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programsData.map((prog, index) => {
            const isHovered = hoveredCard === prog.id;

            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredCard(prog.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectProgram(prog)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-slate-900/60 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.3)] flex flex-col justify-between"
              >
                {/* Visual Image Container with Parallax & Hover Zoom */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Duration & Intensity Badges */}
                  <div className="absolute top-4 right-4 left-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{prog.duration}</span>
                    </span>
                    <span className="px-3 py-1 rounded-md bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 text-xs font-semibold text-cyan-300">
                      {prog.intensity}
                    </span>
                  </div>

                  {/* Program Main Title overlaid on visual bottom */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <h3 className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {prog.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content & Features */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {prog.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-cyan-400 mt-0.5">●</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-400 font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      <span>مشاهده جزئیات برنامه و برنامه هفتگی</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Top Corner Subtle Glow */}
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-400/20 blur-2xl transition-opacity duration-500 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
