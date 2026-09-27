import React, { useState } from 'react';
import { Instagram, Youtube, Send, ArrowUp, Mail, Phone, MapPin, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#020408] border-t border-white/10 text-slate-400 text-sm relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              <span className="text-2xl font-black text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
                AURORA-FIT
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              پیشگام در ترکیب بیوتکنولوژی، تمرینات هایپرتروفی و فرهنگ اراده پولادین ورزشی. فراتر از محدودیت‌های ژنتیکی حرکت کنید.
            </p>

            {/* Newsletter */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-white block">
                عضویت در خبرنامه هفتگی علوم ورزشی و نکات تغذیه
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ایمیل خود را وارد کنید..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : 'ثبت'}
                </button>
              </form>
              {subscribed && (
                <span className="text-xs text-cyan-400 block">
                  ایمیل شما با موفقیت در خبرنامه هوشمند ثبت شد.
                </span>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              بخش‌های سایت
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">
                  خانه
                </a>
              </li>
              <li>
                <a href="#workouts" className="hover:text-cyan-400 transition-colors">
                  تمرین‌ها
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-cyan-400 transition-colors">
                  برنامه‌ها
                </a>
              </li>
              <li>
                <a href="#performance" className="hover:text-cyan-400 transition-colors">
                  عملکرد و فیزیولوژی
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  درباره ما
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              تماس با ما
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono text-xs">contact@aurora-fit.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono text-xs" dir="ltr">+۹۸ ۲۱ ۹۱۰۰ ۸۸۴۴</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>تهران، مجتمع تکنولوژی و ورزش ولنجک، برج آرورا</span>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider">
              شبکه‌های اجتماعی
            </h4>
            <p className="text-xs text-slate-400">
              ویدیوهای تمرینی روزانه، هایلایت ورزشکاران و برنامه‌های زنده:
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-medium text-slate-400">
            © ۱۴۰۵ AURORA-FIT — تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              قوانین و شرایط استفاده
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              حریم خصوصی ورزشکاران
            </span>
            <button
              onClick={scrollToTop}
              type="button"
              className="p-2 rounded-lg bg-white/5 hover:bg-cyan-400 hover:text-slate-950 transition-all text-slate-300 flex items-center gap-1.5 cursor-pointer"
              title="بازگشت به بالای صفحه"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>بالا</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
