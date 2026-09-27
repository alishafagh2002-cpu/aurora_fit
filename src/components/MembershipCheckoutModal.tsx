import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import { PricingPlan } from '../types';

interface MembershipCheckoutModalProps {
  plan: PricingPlan | null;
  isAnnual: boolean;
  onClose: () => void;
}

export const MembershipCheckoutModal: React.FC<MembershipCheckoutModalProps> = ({
  plan,
  isAnnual,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!plan) return null;

  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 left-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-cyan-400">عضویت انحصاری AURORA-FIT</span>
              <h3 className="text-2xl font-black text-white mt-1">
                تکمیل اشتراک پلن {plan.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                دسترسی فوری به محتوا و پلتفرم هوشمند تمرین
              </p>
            </div>

            {/* Plan Summary Box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">نوع صورت‌حساب</span>
                <span className="text-sm font-bold text-white">
                  {isAnnual ? 'اشتراک سالانه (۲۰٪ تخفیف اعمال شد)' : 'اشتراک ماهانه'}
                </span>
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-cyan-400 tabular-nums">
                  {price}
                </span>
                <span className="text-xs text-slate-400 mr-1">یورو / ماه</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  نام و نام خانوادگی ورزشکار:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: علی رضایی"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  پست الکترونیکی (جهت فعال‌سازی اکانت):
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-xs text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>۱۴ روز ضمانت بازگشت ۱۰۰٪ وجه بدون قید و شرط</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-black text-sm tracking-wide hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>تأیید و فعال‌سازی اشتراک</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">
              خوش آمدید به باشگاه AURORA-FIT
            </h3>

            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              عضویت شما در سطح <strong>{plan.name}</strong> با موفقیت فعال شد. اطلاعات دسترسی به آدرس <strong>{email}</strong> ارسال گردید.
            </p>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-400 text-right space-y-1">
              <div className="flex justify-between">
                <span>شناسه عضویت:</span>
                <span className="font-mono text-cyan-300">AF-2030-9842</span>
              </div>
              <div className="flex justify-between">
                <span>ورزشکار:</span>
                <span className="text-white font-bold">{name}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                ورود به پنل تمرینات
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
