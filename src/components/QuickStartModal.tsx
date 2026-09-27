import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Check, Dumbbell, Flame, Trophy, Activity, Calendar, Sparkles } from 'lucide-react';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickStartModal: React.FC<QuickStartModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('hypertrophy');
  const [level, setLevel] = useState('intermediate');
  const [days, setDays] = useState('4');
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setGenerated(true);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setGenerated(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={reset}
          type="button"
          className="absolute top-6 left-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پیکربندی هوشمند برنامه</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            شروع تمرین در AURORA-FIT
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            طراحی سیستم تمرینی اختصاصی منطبق بر اهداف فیزیولوژیک شما
          </p>
        </div>

        {/* Step Progress Line */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* STEP 1: GOAL */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">
              مرحله ۱ از ۳: هدف اصلی تمرینی خود را مشخص کنید:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'hypertrophy', title: 'عضله‌سازی و حجم خالص', desc: 'هایپرتروفی سارکوپلاسمی و تقارن بدنی', icon: Dumbbell },
                { id: 'fat-loss', title: 'چربی‌سوزی و تفکیک', desc: 'چربی‌سوزی متابولیک و نمایش رگ‌ها', icon: Flame },
                { id: 'strength', title: 'افزایش قدرت و توان رکورد', desc: 'افزایش توان ۱RM در حرکات مادر', icon: Trophy },
                { id: 'endurance', title: 'استقامت و چابکی ورزشی', desc: 'ارتقای VO2 Max و تنفس ورزشی', icon: Activity },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = goal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id)}
                    className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-slate-300'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </button>
                );
              })}
            </div>
            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 hover:bg-cyan-300 transition-all cursor-pointer"
              >
                <span>مرحله بعد</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE LEVEL */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">
              مرحله ۲ از ۳: سابقه تمرینات با وزنه شما چقدر است؟
            </h4>
            <div className="space-y-3">
              {[
                { id: 'beginner', title: 'تازه‌کار (کمتر از ۶ ماه)', desc: 'آشنایی با فرم صحیح حرکات و پایه‌ریزی زنجیره مفاصل' },
                { id: 'intermediate', title: 'متوسط (۶ ماه تا ۲ سال)', desc: 'سابقه تمرین مداوم و آمادگی برای اضافه بار پیشرونده' },
                { id: 'advanced', title: 'حرفه‌ای (بیش از ۲ سال)', desc: 'تمرین در نزدیکی ناتوانی و نیاز به تکنیک‌های سیستم شوک' },
              ].map((item) => {
                const isSelected = level === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLevel(item.id)}
                    className={`w-full p-4 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />}
                  </button>
                );
              })}
            </div>
            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                بازگشت
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 hover:bg-cyan-300 transition-all cursor-pointer"
              >
                <span>مرحله بعد</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DAYS PER WEEK */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-200">
              مرحله ۳ از ۳: چند روز در هفته می‌توانید تمرین کنید؟
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '3', title: '۳ روز در هفته', desc: 'فول بادی یا بالاتنه / پایین‌تنه' },
                { id: '4', title: '۴ روز در هفته', desc: 'تفکیک بهینه پوش / پول / لِگز' },
                { id: '5', title: '۵ روز در هفته', desc: 'حداکثر فرکانس و تفکیک عضلانی' },
              ].map((item) => {
                const isSelected = days === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDays(item.id)}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <Calendar className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <div className="font-bold text-sm mb-1">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                بازگشت
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-black text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>تولید برنامه اختصاصی</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GENERATED REGIMEN OVERVIEW */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h5 className="text-white font-bold text-sm">
                  برنامه اختصاصی شما با موفقیت کامپایل شد
                </h5>
                <p className="text-xs text-cyan-300">
                  سیستم تمرینی آرورا بر پایه {days} روز تمرین در هفته
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 block">فاز تمرینی</span>
                <span className="text-xs font-bold text-white">هایپرتروفی فشرده</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 block">دوره سازگاری</span>
                <span className="text-xs font-bold text-cyan-300">۸ هفته پیوسته</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 block">حجم ست هفتگی</span>
                <span className="text-xs font-bold text-white">۱۸ ست هر عضله</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-400 block">استراحت بین ست‌ها</span>
                <span className="text-xs font-bold text-teal-300">۷۵ تا ۹۰ ثانیه</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>نمونه برنامه جلسه اول (روز شنبه):</span>
              </div>
              <p className="text-slate-400">
                ۱. پرس سینه دمبل ۴×۸ (تمرکز بر مکث در کشش) · ۲. بارفیکس با وزنه ۴×۶ · ۳. پرس سرشانه دمبل نشسته ۳×۱۰ · ۴. فیس‌پول سیم‌کش ۳×۱۵
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={reset}
                className="flex-1 py-3.5 rounded-xl bg-white text-slate-950 font-black text-sm text-center hover:bg-cyan-300 transition-colors shadow-lg cursor-pointer"
              >
                شروع برنامه در پنل کاربری
              </button>
              <button
                type="button"
                onClick={reset}
                className="py-3.5 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                بستن و مرور سایت
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
