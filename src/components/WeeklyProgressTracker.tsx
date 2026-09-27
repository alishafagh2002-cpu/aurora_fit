import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Activity, TrendingUp, Calendar, Zap, ShieldCheck, Flame, ChevronLeft } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface DayData {
  id: string;
  dayName: string;
  shortName: string;
  powerValue: number; // 0 - 100 scale
  enduranceValue: number; // 0 - 100 scale
  powerDetail: string;
  enduranceDetail: string;
  workoutTitle: string;
  caloriesBurned: number;
  rpeRating: number; // 1-10
}

interface WeekData {
  id: string;
  label: string;
  powerValue: number;
  enduranceValue: number;
  powerDetail: string;
  enduranceDetail: string;
  workoutTitle: string;
  caloriesBurned: number;
  rpeRating: number;
}

const DAILY_STATS: DayData[] = [
  {
    id: 'sat',
    dayName: 'شنبه',
    shortName: 'ش',
    powerValue: 62,
    enduranceValue: 55,
    powerDetail: 'افزایش ۱RM اسکات به ۱۴۰ ک‌گ',
    enduranceDetail: '۴۵ دقیقه دویدن در زون ۲',
    workoutTitle: 'پا و ریکاوری فعال',
    caloriesBurned: 620,
    rpeRating: 7,
  },
  {
    id: 'sun',
    dayName: 'یکشنبه',
    shortName: 'ی',
    powerValue: 68,
    enduranceValue: 63,
    powerDetail: 'پرس سینه سنگین ۵×۵',
    enduranceDetail: 'اینتروال تاباتا ۱۲ دقیقه',
    workoutTitle: 'سینه و سرشانه سرعتی',
    caloriesBurned: 710,
    rpeRating: 8,
  },
  {
    id: 'mon',
    dayName: 'دوشنبه',
    shortName: 'د',
    powerValue: 74,
    enduranceValue: 70,
    powerDetail: 'ددلیفت قدرتی ۱۸۰ ک‌گ',
    enduranceDetail: '۳۰ دقیقه شبیه‌ساز اسپرینت',
    workoutTitle: 'زنجیره خلفی و توان انفجاری',
    caloriesBurned: 840,
    rpeRating: 9,
  },
  {
    id: 'tue',
    dayName: 'سه‌شنبه',
    shortName: 'س',
    powerValue: 71,
    enduranceValue: 78,
    powerDetail: 'تمرین ایزومتریک و پرش جعبه',
    enduranceDetail: 'تمرین مداوم با دوچرخه ایربایک',
    workoutTitle: 'استقامت قلبی و سرعت گام',
    caloriesBurned: 680,
    rpeRating: 7.5,
  },
  {
    id: 'wed',
    dayName: 'چهارشنبه',
    shortName: 'چ',
    powerValue: 82,
    enduranceValue: 81,
    powerDetail: 'بارفیکس با اضافه وزن ۲۵ ک‌گ',
    enduranceDetail: '۴۰ دقیقه تمرین با دستگاه قایقی',
    workoutTitle: 'عضلات پشت و سیستم لاکتات',
    caloriesBurned: 790,
    rpeRating: 8.5,
  },
  {
    id: 'thu',
    dayName: 'پنج‌شنبه',
    shortName: 'پ',
    powerValue: 89,
    enduranceValue: 86,
    powerDetail: 'کلین و جرک قدرتی المپیکی',
    enduranceDetail: 'مسافت ۱۰ کیلومتر با پیس ۳:۵۵',
    workoutTitle: 'تمرین تلفیقی اوج توان',
    caloriesBurned: 960,
    rpeRating: 9.5,
  },
  {
    id: 'fri',
    dayName: 'جمعه',
    shortName: 'ج',
    powerValue: 85,
    enduranceValue: 92,
    powerDetail: 'ریکاوری عصبی و تحرک‌پذیری',
    enduranceDetail: 'تمرین هوازی با ضربان کنترل‌شده',
    workoutTitle: 'ریکاوری فعال و یوگای ورزشی',
    caloriesBurned: 450,
    rpeRating: 5,
  },
];

const MULTI_WEEK_STATS: WeekData[] = [
  { id: 'w1', label: 'هفته ۱', powerValue: 48, enduranceValue: 42, powerDetail: 'تثبیت الگوهای حرکتی اولیه', enduranceDetail: 'سنجش پایه VO2 Max', workoutTitle: 'هفته مقدماتی و تطبیق', caloriesBurned: 3200, rpeRating: 6 },
  { id: 'w2', label: 'هفته ۲', powerValue: 56, enduranceValue: 51, powerDetail: 'شروع اضافه بار خطی ۵٪', enduranceDetail: 'افزایش حجم تمرینات زون ۲', workoutTitle: 'پایه‌ریزی هایپرتروفی', caloriesBurned: 3800, rpeRating: 7 },
  { id: 'w3', label: 'هفته ۳', powerValue: 64, enduranceValue: 60, powerDetail: 'رشد خروجی توان بی‌هوازی', enduranceDetail: 'بهبود آستانه ترشح اسید لاکتیک', workoutTitle: 'فاز انباشت توان', caloriesBurned: 4100, rpeRating: 7.5 },
  { id: 'w4', label: 'هفته ۴', powerValue: 62, enduranceValue: 68, powerDetail: 'هفته باربرداری (Deload)', enduranceDetail: 'سازگاری میتوکندریایی عمقی', workoutTitle: 'تخلیه خستگی و ترمیم CNS', caloriesBurned: 3100, rpeRating: 5.5 },
  { id: 'w5', label: 'هفته ۵', powerValue: 75, enduranceValue: 74, powerDetail: 'ثبت رکورد جدید در اسکات', enduranceDetail: 'کاهش نرخ ضربان قلب استراحتی', workoutTitle: 'فاز تشدید شدت (Intensification)', caloriesBurned: 4500, rpeRating: 8.5 },
  { id: 'w6', label: 'هفته ۶', powerValue: 81, enduranceValue: 82, powerDetail: 'افزایش تارهای انقباضی تند', enduranceDetail: 'افزایش راندمان تنفس سلولی', workoutTitle: 'پیک استقامت عضلانی', caloriesBurned: 4850, rpeRating: 9 },
  { id: 'w7', label: 'هفته ۷', powerValue: 88, enduranceValue: 87, powerDetail: 'انفجار قدرت در حرکات کامپاند', enduranceDetail: 'دوام در آستانه حداکثری بدون افت', workoutTitle: 'تثبیت توان ماکزیمم', caloriesBurned: 5100, rpeRating: 9.5 },
  { id: 'w8', label: 'هفته ۸', powerValue: 95, enduranceValue: 93, powerDetail: 'اوج‌گیری و آزمون نهایی رکوردها', enduranceDetail: 'بهبود ۳.۲ برابری استقامت پایه', workoutTitle: 'تکمیل چرخه ابرانسان آرورا', caloriesBurned: 5400, rpeRating: 10 },
];

export const WeeklyProgressTracker: React.FC = () => {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [activeMetric, setActiveMetric] = useState<'both' | 'power' | 'endurance'>('both');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentDataset = viewMode === 'daily' ? DAILY_STATS : MULTI_WEEK_STATS;
  const activeHoverData = hoveredIdx !== null ? currentDataset[hoveredIdx] : currentDataset[currentDataset.length - 1];

  // SVG Chart Geometry
  const svgWidth = 720;
  const svgHeight = 260;
  const paddingX = 45;
  const paddingY = 35;
  const graphWidth = svgWidth - paddingX * 2;
  const graphHeight = svgHeight - paddingY * 2;

  // Calculate coordinates
  const pointsPower = currentDataset.map((d, i) => {
    const x = paddingX + (i / (currentDataset.length - 1)) * graphWidth;
    const y = svgHeight - paddingY - (d.powerValue / 100) * graphHeight;
    return { x, y, val: d.powerValue };
  });

  const pointsEndurance = currentDataset.map((d, i) => {
    const x = paddingX + (i / (currentDataset.length - 1)) * graphWidth;
    const y = svgHeight - paddingY - (d.enduranceValue / 100) * graphHeight;
    return { x, y, val: d.enduranceValue };
  });

  // Create smooth bezier paths
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const pathPower = createSmoothPath(pointsPower);
  const pathEndurance = createSmoothPath(pointsEndurance);

  const fillPathPower = `${pathPower} L ${pointsPower[pointsPower.length - 1].x} ${svgHeight - paddingY} L ${pointsPower[0].x} ${svgHeight - paddingY} Z`;
  const fillPathEndurance = `${pathEndurance} L ${pointsEndurance[pointsEndurance.length - 1].x} ${svgHeight - paddingY} L ${pointsEndurance[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="relative rounded-3xl bg-slate-900/85 border border-white/10 overflow-hidden shadow-2xl p-4 sm:p-8 backdrop-blur-xl mb-12">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              ردیابی هوشمند بیومتریک
            </span>
            <span className="text-xs text-slate-400 font-mono">AURORA_BIOTRACK_V3</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>نمایشگر پیشرفت هفتگی</span>
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            روند نمودار خطی متحرک رشد همزمان قدرت عضلانی و ظرفیت استقامتی با تطبیق هوشمند
          </p>
        </div>

        {/* View Mode & Metric Filters */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Daily vs Weekly Toggle */}
          <div className="flex items-center p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => {
                playClickSound();
                setViewMode('daily');
                setHoveredIdx(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === 'daily'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              روزهای هفته
            </button>
            <button
              onClick={() => {
                playClickSound();
                setViewMode('weekly');
                setHoveredIdx(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === 'weekly'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              دوره ۸ هفته
            </button>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => {
                playClickSound();
                setActiveMetric('both');
              }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                activeMetric === 'both' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              هر دو
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActiveMetric('power');
              }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeMetric === 'power' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              قدرت
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActiveMetric('endurance');
              }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeMetric === 'endurance' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              استقامت
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="relative z-10 w-full overflow-hidden bg-slate-950/70 rounded-2xl border border-white/10 p-2 sm:p-5">
        {/* Metric Badges Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
          <div className="flex items-center gap-4 text-xs font-semibold">
            {(activeMetric === 'both' || activeMetric === 'power') && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                <span className="text-white">منحنی قدرت و خروجی توان (Power Index)</span>
              </div>
            )}
            {(activeMetric === 'both' || activeMetric === 'endurance') && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_10px_#c084fc]" />
                <span className="text-white">منحنی استقامت و ظرفیت هوازی (Endurance Index)</span>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            نقطه اوج این دوره: <span className="text-cyan-300 font-bold">۹۵٪ توان</span>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="w-full relative">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              {/* Cyan Gradient for Power Fill */}
              <linearGradient id="neonPowerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>

              {/* Violet Gradient for Endurance Fill */}
              <linearGradient id="neonEnduranceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32" />
                <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>

              {/* Neon Glow Filters */}
              <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="neonGlowViolet" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizontal Grid Lines */}
            {[20, 40, 60, 80, 100].map((val) => {
              const y = svgHeight - paddingY - (val / 100) * graphHeight;
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.07)"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    textAnchor="end"
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {val}٪
                  </text>
                </g>
              );
            })}

            {/* Vertical Guide lines for days/weeks */}
            {currentDataset.map((item, idx) => {
              const x = paddingX + (idx / (currentDataset.length - 1)) * graphWidth;
              const isHovered = hoveredIdx === idx;
              return (
                <g key={item.id}>
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={svgHeight - paddingY}
                    stroke={isHovered ? 'rgba(6, 182, 212, 0.45)' : 'rgba(255, 255, 255, 0.05)'}
                    strokeWidth={isHovered ? '2' : '1'}
                    strokeDasharray={isHovered ? 'none' : '3 3'}
                  />
                  {/* Bottom Day/Week Label */}
                  <text
                    x={x}
                    y={svgHeight - paddingY + 20}
                    textAnchor="middle"
                    fill={isHovered ? '#22d3ee' : '#94a3b8'}
                    fontSize="11"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    className="cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      playClickSound();
                      setHoveredIdx(idx);
                    }}
                  >
                    {'dayName' in item ? (item as DayData).dayName : (item as WeekData).label}
                  </text>
                </g>
              );
            })}

            {/* ENDURANCE AREA & LINE */}
            {(activeMetric === 'both' || activeMetric === 'endurance') && (
              <>
                <motion.path
                  d={fillPathEndurance}
                  fill="url(#neonEnduranceGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.path
                  d={pathEndurance}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3.2"
                  filter="url(#neonGlowViolet)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                {pointsEndurance.map((pt, idx) => {
                  const isHovered = hoveredIdx === idx;
                  return (
                    <g key={`endurance-dot-${idx}`} className="cursor-pointer">
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 6 : 4}
                        fill="#c084fc"
                        stroke="#2e1065"
                        strokeWidth="2"
                        filter="url(#neonGlowViolet)"
                        onMouseEnter={() => setHoveredIdx(idx)}
                      />
                    </g>
                  );
                })}
              </>
            )}

            {/* POWER AREA & LINE */}
            {(activeMetric === 'both' || activeMetric === 'power') && (
              <>
                <motion.path
                  d={fillPathPower}
                  fill="url(#neonPowerGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.path
                  d={pathPower}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3.2"
                  filter="url(#neonGlowCyan)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                {pointsPower.map((pt, idx) => {
                  const isHovered = hoveredIdx === idx;
                  return (
                    <g key={`power-dot-${idx}`} className="cursor-pointer">
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 6 : 4}
                        fill="#22d3ee"
                        stroke="#083344"
                        strokeWidth="2"
                        filter="url(#neonGlowCyan)"
                        onMouseEnter={() => setHoveredIdx(idx)}
                      />
                    </g>
                  );
                })}
              </>
            )}

            {/* Invisible full-height hover hitboxes */}
            {currentDataset.map((_, idx) => {
              const x = paddingX + (idx / (currentDataset.length - 1)) * graphWidth;
              const w = graphWidth / currentDataset.length;
              return (
                <rect
                  key={`hitbox-${idx}`}
                  x={x - w / 2}
                  y={paddingY}
                  width={w}
                  height={graphHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Floating Interactive Biometric Data Card (Changes with Hover) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${activeHoverData.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-2xl bg-black/60 border border-white/15 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center backdrop-blur-md"
        >
          {/* Day / Week Header & Workout */}
          <div className="md:col-span-4 space-y-1.5 border-b md:border-b-0 md:border-l border-white/10 pb-4 md:pb-0 md:pl-5">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {'dayName' in activeHoverData
                  ? `گزارش تمرین ${(activeHoverData as DayData).dayName}`
                  : `گزارش جامع ${(activeHoverData as WeekData).label}`}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              {activeHoverData.workoutTitle}
            </h4>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Flame className="w-3.5 h-3.5" /> {activeHoverData.caloriesBurned} کالری
              </span>
              <span>•</span>
              <span className="text-slate-300">
                شاخص فشار (RPE): <span className="text-white font-bold">{activeHoverData.rpeRating}/۱۰</span>
              </span>
            </div>
          </div>

          {/* Power Stat */}
          <div className="md:col-span-4 space-y-1.5 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5" /> شاخص قدرت عضلانی
              </span>
              <span className="font-mono text-sm">{activeHoverData.powerValue}٪</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${activeHoverData.powerValue}%` }}
              />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {activeHoverData.powerDetail}
            </p>
          </div>

          {/* Endurance Stat */}
          <div className="md:col-span-4 space-y-1.5 p-3 rounded-xl bg-violet-950/20 border border-violet-500/20">
            <div className="flex items-center justify-between text-xs text-violet-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> شاخص استقامت و تنفس
              </span>
              <span className="font-mono text-sm">{activeHoverData.enduranceValue}٪</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-400 rounded-full transition-all duration-500"
                style={{ width: `${activeHoverData.enduranceValue}%` }}
              />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {activeHoverData.enduranceDetail}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quick Summary Metrics Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">میانگین رشد قدرت</div>
            <div className="text-sm font-bold text-white font-mono">+۱۸.۴٪ هفتگی</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">افزایش ظرفیت VO2</div>
            <div className="text-sm font-bold text-white font-mono">+۲۲.۱٪ تثبیت</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">ثبات برنامه تمرینی</div>
            <div className="text-sm font-bold text-white font-mono">۷ از ۷ روز فعال</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400">مجموع کالری سوزانده</div>
            <div className="text-sm font-bold text-white font-mono">۵,۰۵۰ Kcal</div>
          </div>
        </div>
      </div>
    </div>
  );
};
