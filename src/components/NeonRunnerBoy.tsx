import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Zap,
  Heart,
  Gauge,
  Flame,
  Wind,
  RotateCcw,
  Sparkles,
  Camera,
  Layers,
  Activity,
  UserCheck,
} from 'lucide-react';
import { playClickSound, playWhooshSound } from '../utils/audio';

// Import cinematic running character assets generated for this exact character
import boyRunningCinematic from '../assets/images/boy_running_cinematic_1790545513307.jpg';
import boyRunningFocus from '../assets/images/boy_running_focus_1790545524986.jpg';

type SpeedMode = 'jog' | 'run' | 'sprint';
type ViewMode = 'interactive_canvas' | 'cinematic_3d';

interface SpeedConfig {
  label: string;
  speedMultiplier: number;
  velocityKmH: number;
  paceStr: string;
  heartRate: number;
  cadence: number;
  caloriesPerMin: number;
  leanAngle: number;
  color: string;
  glowColor: string;
}

const SPEED_CONFIGS: Record<SpeedMode, SpeedConfig> = {
  jog: {
    label: 'ریکاوری و نرم‌دوی',
    speedMultiplier: 0.9,
    velocityKmH: 8.4,
    paceStr: '۷:۰۸ دقیقه/کیلومتر',
    heartRate: 128,
    cadence: 154,
    caloriesPerMin: 9.8,
    leanAngle: 0.12,
    color: '#06b6d4', // cyan
    glowColor: 'rgba(6, 182, 212, 0.45)',
  },
  run: {
    label: 'ریتم سرعتی (تمپو)',
    speedMultiplier: 1.45,
    velocityKmH: 14.8,
    paceStr: '۴:۰۳ دقیقه/کیلومتر',
    heartRate: 158,
    cadence: 176,
    caloriesPerMin: 15.6,
    leanAngle: 0.24,
    color: '#a855f7', // violet
    glowColor: 'rgba(168, 85, 247, 0.5)',
  },
  sprint: {
    label: 'اسپرینت انفجاری (حداکثر توان)',
    speedMultiplier: 2.2,
    velocityKmH: 22.6,
    paceStr: '۲:۳۹ دقیقه/کیلومتر',
    heartRate: 184,
    cadence: 204,
    caloriesPerMin: 23.4,
    leanAngle: 0.38,
    color: '#10b981', // emerald
    glowColor: 'rgba(16, 185, 129, 0.55)',
  },
};

export const NeonRunnerBoy: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speedMode, setSpeedMode] = useState<SpeedMode>('run');
  const [viewMode, setViewMode] = useState<ViewMode>('interactive_canvas');
  const [distanceKm, setDistanceKm] = useState<number>(3.84);
  const [activeCalories, setActiveCalories] = useState<number>(212);
  const [cameraZoom, setCameraZoom] = useState<boolean>(false);

  const speedRef = useRef<SpeedMode>('run');
  const runningRef = useRef<boolean>(true);
  const animFrameRef = useRef<number | null>(null);

  speedRef.current = speedMode;
  runningRef.current = isRunning;

  // Increment distance and calories in real time
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const cfg = SPEED_CONFIGS[speedRef.current];
      setDistanceKm((prev) => +(prev + (cfg.velocityKmH / 3600) * 0.5).toFixed(2));
      setActiveCalories((prev) => Math.round(prev + cfg.caloriesPerMin / 120));
    }, 500);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Main Canvas Rendering Loop for Kinematic Runner Boy matching uploaded character
  useEffect(() => {
    if (viewMode !== 'interactive_canvas') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle streaks & ambient speed dust
    interface TrailParticle {
      x: number;
      y: number;
      vx: number;
      size: number;
      alpha: number;
      color: string;
    }
    const particles: TrailParticle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * 900,
        y: Math.random() * 280 + 20,
        vx: -(Math.random() * 5 + 3),
        size: Math.random() * 2.8 + 0.8,
        alpha: Math.random() * 0.65 + 0.2,
        color: Math.random() > 0.4 ? '#06b6d4' : '#a855f7',
      });
    }

    let groundOffset = 0;
    let phase = 0;
    let lastTime = performance.now();

    // Motion blur ghost frames
    interface GhostFrame {
      phase: number;
      lean: number;
      color: string;
      alpha: number;
      offsetX: number;
    }
    const ghostFrames: GhostFrame[] = [];

    // Draw the stylized 3D boy character in running gait
    const drawRunnerBoy = (
      c: CanvasRenderingContext2D,
      rootX: number,
      rootY: number,
      runPhase: number,
      lean: number,
      accentColor: string,
      alpha = 1.0,
      scale = 1.05
    ) => {
      c.save();
      c.translate(rootX, rootY);
      // Flip horizontally so he runs forward to the left (← in RTL context)
      c.scale(-scale, scale);
      c.globalAlpha = alpha;

      const p = runPhase;
      const bob = Math.sin(p * 2) * 9 * (speedRef.current === 'sprint' ? 1.4 : 1.0);
      const hipY = -72 + bob;
      const hipX = 0;
      const currentLean = lean;

      // Limb dimensions
      const thighLength = 36;
      const shinLength = 38;
      const footLength = 17;

      // Draw Leg function
      const drawLeg = (legPhase: number, isFar: boolean) => {
        const thighAngle = Math.sin(legPhase) * 0.78 + currentLean * 0.52;
        const kneeFlex = Math.max(0, -Math.sin(legPhase + 0.2)) * 1.55 + 0.18;
        const shinAngle = thighAngle + kneeFlex;

        const hipJointX = isFar ? hipX - 5 : hipX + 5;
        const hipJointY = hipY;

        const kneeX = hipJointX + Math.sin(thighAngle) * thighLength;
        const kneeY = hipJointY + Math.cos(thighAngle) * thighLength;

        const ankleX = kneeX + Math.sin(shinAngle) * shinLength;
        const ankleY = kneeY + Math.cos(shinAngle) * shinLength;

        const footAngle = Math.sin(legPhase - 0.38) * 0.45;
        const toeX = ankleX + Math.cos(footAngle) * footLength;
        const toeY = ankleY + Math.sin(footAngle) * 5;

        // Pants / Trousers (matte black technical athletic pants)
        c.lineWidth = isFar ? 7.5 : 9.5;
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.strokeStyle = isFar ? '#090d16' : '#141a24';
        c.beginPath();
        c.moveTo(hipJointX, hipJointY);
        c.lineTo(kneeX, kneeY);
        c.lineTo(ankleX, ankleY);
        c.stroke();

        // Neon piping on pants
        c.lineWidth = 1.8;
        c.strokeStyle = isFar ? `${accentColor}44` : accentColor;
        c.beginPath();
        c.moveTo(hipJointX, hipJointY);
        c.lineTo(kneeX, kneeY);
        c.stroke();

        // Modern Low-Profile Running Shoe (matching character's black sneakers)
        c.lineWidth = 6.5;
        c.strokeStyle = isFar ? '#1e293b' : '#334155';
        c.beginPath();
        c.moveTo(ankleX, ankleY);
        c.lineTo(toeX, toeY);
        c.stroke();

        // Neon Cyan Sole Glow
        c.lineWidth = 2.5;
        c.strokeStyle = isFar ? '#38bdf8' : '#22d3ee';
        c.shadowColor = accentColor;
        c.shadowBlur = 9;
        c.beginPath();
        c.moveTo(ankleX - 3, ankleY + 2);
        c.lineTo(toeX + 2, toeY + 2);
        c.stroke();
        c.shadowBlur = 0;
      };

      // Draw Arm function
      const drawArm = (armPhase: number, isFar: boolean) => {
        const shoulderX = hipX + Math.sin(currentLean) * 36 + (isFar ? -6 : 6);
        const shoulderY = hipY - 36 + (isFar ? -2 : 2);

        const armAngle = -Math.sin(armPhase) * 0.88 + currentLean * 0.6;
        const elbowFlex = 1.38 + Math.sin(armPhase * 0.5) * 0.25;
        const forearmAngle = armAngle - elbowFlex;

        const upperArmLen = 23;
        const forearmLen = 21;

        const elbowX = shoulderX + Math.sin(armAngle) * upperArmLen;
        const elbowY = shoulderY + Math.cos(armAngle) * upperArmLen;

        const wristX = elbowX + Math.sin(forearmAngle) * forearmLen;
        const wristY = elbowY + Math.cos(forearmAngle) * forearmLen;

        // Oversized Black Hoodie Sleeve
        c.lineWidth = isFar ? 7.5 : 9.5;
        c.lineCap = 'round';
        c.strokeStyle = isFar ? '#0c101a' : '#171e2c';
        c.beginPath();
        c.moveTo(shoulderX, shoulderY);
        c.lineTo(elbowX, elbowY);
        c.lineTo(wristX, wristY);
        c.stroke();

        // Hand (natural stylized skin tone)
        c.lineWidth = 4.5;
        c.strokeStyle = isFar ? '#d49d79' : '#f0b793';
        c.beginPath();
        c.moveTo(wristX, wristY);
        c.lineTo(wristX + Math.sin(forearmAngle) * 5, wristY + Math.cos(forearmAngle) * 5);
        c.stroke();
      };

      // 1. Far Arm & Leg
      drawArm(p + Math.PI, true);
      drawLeg(p + Math.PI, true);

      // 2. Torso (Oversized Hoodie & Dark Inner T-Shirt)
      const neckX = hipX + Math.sin(currentLean) * 46;
      const neckY = hipY - 46;

      // Inner dark grey crewneck t-shirt
      c.fillStyle = '#262626';
      c.beginPath();
      c.moveTo(hipX - 6, hipY + 2);
      c.lineTo(hipX + 6, hipY + 2);
      c.lineTo(neckX + 6, neckY + 4);
      c.lineTo(neckX - 6, neckY + 4);
      c.closePath();
      c.fill();

      // Black Oversized Hoodie Body
      c.fillStyle = '#101522';
      c.beginPath();
      c.moveTo(hipX - 10, hipY + 4);
      c.lineTo(hipX + 10, hipY + 4);
      c.lineTo(neckX + 12, neckY);
      c.lineTo(neckX - 10, neckY);
      c.closePath();
      c.fill();

      // Front zipper line & pocket outline
      c.lineWidth = 2;
      c.strokeStyle = '#273142';
      c.beginPath();
      c.moveTo(hipX, hipY + 3);
      c.lineTo(neckX, neckY + 6);
      c.stroke();

      // Hoodie lower fold line
      c.lineWidth = 15;
      c.lineCap = 'round';
      c.strokeStyle = '#090d16';
      c.beginPath();
      c.moveTo(hipX - 1, hipY - 2);
      c.lineTo(neckX + 1, neckY + 4);
      c.stroke();

      // 3. Near Leg & Arm
      drawLeg(p, false);
      drawArm(p, false);

      // 4. Head & Character Face
      const headX = neckX + Math.sin(currentLean) * 11;
      const headY = neckY - 11;

      // Hoodie hood fabric resting around neck/back with wind flutter
      const hoodSway = Math.sin(p * 2 + 1.2) * 3;
      c.fillStyle = '#0a0d14';
      c.beginPath();
      c.arc(headX - 7 + hoodSway, headY + 1, 14, 0, Math.PI * 2);
      c.fill();

      // Character Neck
      c.fillStyle = '#e8aa83';
      c.beginPath();
      c.moveTo(neckX - 4, neckY);
      c.lineTo(neckX + 4, neckY);
      c.lineTo(headX + 3, headY + 5);
      c.lineTo(headX - 3, headY + 5);
      c.closePath();
      c.fill();

      // Stylized 3D Boy Head Shape
      c.fillStyle = '#f0b793';
      c.beginPath();
      c.ellipse(headX + 2, headY - 1, 7.5, 9.5, currentLean * 0.3, 0, Math.PI * 2);
      c.fill();

      // Focused Eyebrow and Eye
      c.fillStyle = '#1e293b';
      // Arched dark eyebrow
      c.fillRect(headX + 5, headY - 4, 5, 1.8);
      // Dark eye
      c.beginPath();
      c.arc(headX + 7, headY - 1.5, 1.6, 0, Math.PI * 2);
      c.fill();

      // Stylized Jet-Black Hair with Front Fringe (Matching Reference Character!)
      c.fillStyle = '#0f172a';
      c.beginPath();
      c.moveTo(headX - 6, headY - 3);
      c.quadraticCurveTo(headX - 3, headY - 14, headX + 3, headY - 13);
      c.quadraticCurveTo(headX + 9, headY - 12, headX + 10, headY - 6);
      // Front swept fringe bangs
      c.lineTo(headX + 8, headY - 2);
      c.lineTo(headX + 6, headY - 6);
      c.lineTo(headX + 4, headY - 3);
      c.lineTo(headX + 2, headY - 8);
      c.lineTo(headX - 1, headY - 4);
      c.closePath();
      c.fill();

      // Hoodie drawstring bounce with metallic tips
      const stringBounce = Math.sin(p * 2) * 5;
      c.lineWidth = 1.4;
      c.strokeStyle = '#e2e8f0';
      c.beginPath();
      c.moveTo(neckX + 3, neckY + 2);
      c.lineTo(neckX + 5, neckY + 14 + stringBounce);
      c.stroke();
      // Metallic tip
      c.fillStyle = '#38bdf8';
      c.fillRect(neckX + 4, neckY + 14 + stringBounce, 2, 4);

      c.restore();
    };

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const currentConfig = SPEED_CONFIGS[speedRef.current];

      if (runningRef.current) {
        phase += dt * 10 * currentConfig.speedMultiplier;
        groundOffset = (groundOffset + dt * 420 * currentConfig.speedMultiplier) % 60;
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Background ambient gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#0b0f19');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const floorY = height * 0.72;

      // Floor running track horizon line & neon grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(width, floorY);
      ctx.stroke();

      // Glowing Neon Floor Track Line
      ctx.strokeStyle = currentConfig.color;
      ctx.shadowColor = currentConfig.color;
      ctx.shadowBlur = 14;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, floorY + 2);
      ctx.lineTo(width, floorY + 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Moving distance markers
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      for (let x = -60 + (groundOffset % 60); x < width + 60; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, floorY + 3);
        ctx.lineTo(x - 25, floorY + 38);
        ctx.stroke();
      }

      // Neon lane marker beneath runner
      ctx.fillStyle = `${currentConfig.color}22`;
      ctx.fillRect(0, floorY + 2, width, 18);
      ctx.restore();

      // Atmospheric background particles & speed wind streaks
      ctx.save();
      particles.forEach((p) => {
        if (runningRef.current) {
          p.x += (p.vx - 3) * currentConfig.speedMultiplier;
          if (p.x < -20) {
            p.x = width + Math.random() * 40;
            p.y = Math.random() * (floorY - 20) + 15;
          }
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (speedRef.current === 'sprint' || speedRef.current === 'run') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + (speedRef.current === 'sprint' ? 36 : 18), p.y);
          ctx.stroke();
        }
      });
      ctx.restore();

      // Runner placement
      const runnerX = width * 0.52;
      const runnerY = floorY;

      // Runner Ground Shadow
      const shadowScale = 1 + Math.sin(phase * 2) * 0.15;
      const shadowGrad = ctx.createRadialGradient(
        runnerX,
        floorY + 2,
        3,
        runnerX,
        floorY + 2,
        45 * shadowScale
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      shadowGrad.addColorStop(0.5, currentConfig.glowColor);
      shadowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(runnerX, floorY + 4, 48 * shadowScale, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Motion blur ghosts
      if (runningRef.current && (speedRef.current === 'sprint' || speedRef.current === 'run')) {
        ghostFrames.push({
          phase: phase - 0.25,
          lean: currentConfig.leanAngle,
          color: currentConfig.color,
          alpha: speedRef.current === 'sprint' ? 0.35 : 0.2,
          offsetX: speedRef.current === 'sprint' ? 32 : 18,
        });

        if (speedRef.current === 'sprint') {
          ghostFrames.push({
            phase: phase - 0.5,
            lean: currentConfig.leanAngle,
            color: '#8b5cf6',
            alpha: 0.18,
            offsetX: 64,
          });
        }
      }

      while (ghostFrames.length > 3) {
        ghostFrames.shift();
      }

      // Draw Ghost trails
      ghostFrames.forEach((ghost) => {
        drawRunnerBoy(
          ctx,
          runnerX + ghost.offsetX,
          runnerY,
          ghost.phase,
          ghost.lean,
          ghost.color,
          ghost.alpha,
          1.0
        );
      });

      // Draw Active Main Runner Boy
      drawRunnerBoy(
        ctx,
        runnerX,
        runnerY,
        phase,
        currentConfig.leanAngle,
        currentConfig.color,
        1.0,
        1.05
      );

      // Cinematic Vignette
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.25,
        width / 2,
        height / 2,
        width * 0.65
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(2, 6, 23, 0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [viewMode]);

  const handleSpeedChange = (mode: SpeedMode) => {
    playWhooshSound();
    setSpeedMode(mode);
  };

  const toggleRun = () => {
    playClickSound();
    setIsRunning(!isRunning);
  };

  const handleResetMetrics = () => {
    playClickSound();
    setDistanceKm(0);
    setActiveCalories(0);
  };

  const currentCfg = SPEED_CONFIGS[speedMode];

  return (
    <div className="relative rounded-3xl bg-slate-900/85 border border-white/10 overflow-hidden shadow-2xl p-4 sm:p-7 backdrop-blur-xl">
      {/* Top Bar with Character Identity & View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3.5">
          {/* Character Avatar Thumbnail matching uploaded reference */}
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20 shrink-0 bg-slate-800">
            <img
              src={boyRunningFocus}
              alt="کرکتر پسر دونده آرورا"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white">
                کرکتر دونده اختصاصی AURORA-FIT
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                3D CHARACTER
              </span>
            </div>
            <p className="text-xs text-slate-400">
              پسر جوان با هودی مشکی و استایل ورزشی مدرن در حال دویدن با موتور انیمیشن بیومکانیک
            </p>
          </div>
        </div>

        {/* View Mode & Speed Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => {
                playClickSound();
                setViewMode('interactive_canvas');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'interactive_canvas'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>انیمیشن زنده ۶۰FPS</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setViewMode('cinematic_3d');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'cinematic_3d'
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>نمای سینمایی سه‌بعدی</span>
            </button>
          </div>

          {/* Speed Mode Selector */}
          <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
            {(['jog', 'run', 'sprint'] as SpeedMode[]).map((mode) => {
              const isSelected = speedMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => handleSpeedChange(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mode === 'jog' && 'آهسته'}
                  {mode === 'run' && 'تمپو'}
                  {mode === 'sprint' && 'اسپرینت'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Runner Stage Container */}
      <div className="relative w-full h-72 sm:h-84 rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner">
        {/* VIEW 1: Interactive Canvas Engine */}
        {viewMode === 'interactive_canvas' && (
          <div className="relative w-full h-full">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-pointer"
              onClick={toggleRun}
              title="برای توقف یا شروع کلیک کنید"
            />

            {/* In-Canvas Character Profile Tag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 pointer-events-none">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-bold text-slate-300">
                ورزشکار اختصاصی: هودی مشکی اورسایز
              </span>
            </div>
          </div>
        )}

        {/* VIEW 2: Cinematic 3D Action Render View of this exact character */}
        {viewMode === 'cinematic_3d' && (
          <div className="relative w-full h-full overflow-hidden group">
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{
                scale: isRunning ? (cameraZoom ? 1.15 : 1.08) : 1.0,
                x: isRunning ? [0, -4, 0, 4, 0] : 0,
                y: isRunning ? [0, -3, 0, 2, 0] : 0,
              }}
              transition={{
                repeat: Infinity,
                duration: speedMode === 'sprint' ? 0.35 : speedMode === 'run' ? 0.55 : 0.85,
                ease: 'easeInOut',
              }}
              src={boyRunningCinematic}
              alt="پسر دونده آرورا در حال اسپرینت"
              className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
            />

            {/* Glowing neon aura overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70 pointer-events-none" />

            {/* Dynamic speed streaks overlay on high speed */}
            {isRunning && (
              <div
                className={`absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent ${
                  speedMode === 'sprint'
                    ? 'via-cyan-500/10 to-transparent animate-pulse'
                    : 'via-violet-500/5 to-transparent'
                }`}
              />
            )}

            {/* Bottom-right Camera Control & Badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setCameraZoom(!cameraZoom)}
                className="bg-black/70 hover:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-xs text-white flex items-center gap-1.5 transition-all shadow-lg"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cameraZoom ? 'بزرگنمایی عادی' : 'زوم اکشن سینمایی'}</span>
              </button>
            </div>

            {/* Action Quote / Telemetry badge */}
            <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-500/30 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">اسپرینت در پیست هوشمند: </span>
              {currentCfg.label} ({currentCfg.velocityKmH} KM/H)
            </div>
          </div>
        )}

        {/* Dynamic Telemetry HUD Overlays (Visible on both views) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none z-10">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg">
            <span
              className={`w-2 h-2 rounded-full ${
                isRunning ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'
              }`}
            />
            <span className="text-[11px] font-mono font-bold text-slate-200">
              {isRunning ? 'انیمیشن در حال دویدن' : 'متوقف'}
            </span>
          </div>
        </div>

        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/40 flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-bold shadow-lg">
            <Wind className="w-3.5 h-3.5" />
            <span>{currentCfg.velocityKmH} KM/H</span>
          </div>
        </div>

        {/* Play/Pause Overlay indicator when paused */}
        {!isRunning && (
          <div
            onClick={toggleRun}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center cursor-pointer z-20"
          >
            <div className="px-5 py-2.5 rounded-2xl bg-slate-900/90 border border-white/20 text-white text-sm font-bold flex items-center gap-2.5 shadow-2xl hover:scale-105 transition-transform">
              <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              <span>ادامه حرکت کاراکتر (کلیک کنید)</span>
            </div>
          </div>
        )}
      </div>

      {/* Biometric Metrics Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Metric 1: Velocity */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>سرعت پیمایش</span>
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {currentCfg.velocityKmH}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">ک/ساعت</span>
          </div>
          <div className="text-[11px] text-cyan-400/90 mt-0.5">{currentCfg.paceStr}</div>
        </div>

        {/* Metric 2: Cadence */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-violet-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>ریتم گام (Cadence)</span>
            <Zap className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {currentCfg.cadence}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">گام/دقیقه</span>
          </div>
          <div className="text-[11px] text-violet-400/90 mt-0.5">فرکانس بهینه گام</div>
        </div>

        {/* Metric 3: Heart Rate */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-rose-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>ضربان قلب هدف</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {currentCfg.heartRate}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">BPM</span>
          </div>
          <div className="text-[11px] text-rose-400/90 mt-0.5">زون تمرینی هوازی</div>
        </div>

        {/* Metric 4: Distance & Calories */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>مسافت / کالری</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {distanceKm}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">کیلومتر</span>
          </div>
          <div className="text-[11px] text-amber-400/90 mt-0.5">
            {activeCalories} کالری مصرفی
          </div>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRun}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold flex items-center gap-2 transition-colors border border-white/10 shadow-sm"
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-cyan-400" />
                <span>توقف حرکت کاراکتر</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                <span>شروع دویدن کاراکتر</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetMetrics}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="بازنشانی آمار پیمایش"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-400">تنظیم فعال:</span>
          <span className="text-cyan-300 font-bold">{currentCfg.label}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">هودی مشکی اورسایز</span>
        </div>
      </div>
    </div>
  );
};
