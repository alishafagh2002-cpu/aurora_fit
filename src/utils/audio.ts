class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private oscs: OscillatorNode[] = [];

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // Audio not supported
    }
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (!this.ctx) this.init();
    if (!this.ctx || this.isPlaying) return;

    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      // Deep drone osc 1 (55Hz - A1)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Harmonious 5th (82.4Hz - E2)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(82.41, this.ctx.currentTime);

      // Shimmer detune (110Hz - A2)
      const osc3 = this.ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(110.2, this.ctx.currentTime);

      const oscGain3 = this.ctx.createGain();
      oscGain3.gain.setValueAtTime(0.2, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(oscGain3);
      oscGain3.connect(filter);

      filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc3.start();

      this.oscs = [osc1, osc2, osc3];
      this.isPlaying = true;
    } catch {
      // Audio error handling
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.oscs.forEach(osc => {
          try { osc.stop(); } catch {}
        });
        this.oscs = [];
        this.isPlaying = false;
      }, 1200);
    } catch {
      this.isPlaying = false;
    }
  }

  public getState(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new AmbientSoundManager();

/**
 * Play a subtle futuristic UI click/tap sound
 */
export function playClickSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore audio context errors
  }
}

/**
 * Play a futuristic whoosh sound for speed shifts or transitions
 */
export function playWhooshSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch {
    // Ignore audio context errors
  }
}
