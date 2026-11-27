/* =========================================================================
 * WEB AUDIO API PROCEDURAL SOUND ENGINE (No external audio files required)
 * ========================================================================= */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.18, slideTo = null, delay = 0) {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(gainVal, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  jump() {
    this.playTone(320, 'sine', 0.18, 0.2, 640);
  }

  bookOpen() {
    this.playTone(523.25, 'triangle', 0.12, 0.18, null, 0);
    this.playTone(659.25, 'triangle', 0.16, 0.18, null, 0.08);
  }

  correct() {
    this.playTone(523.25, 'sine', 0.14, 0.22, null, 0);
    this.playTone(659.25, 'sine', 0.14, 0.22, null, 0.09);
    this.playTone(783.99, 'sine', 0.16, 0.22, null, 0.18);
    this.playTone(1046.5, 'triangle', 0.32, 0.25, null, 0.27);
  }

  wrong() {
    this.playTone(230, 'sawtooth', 0.22, 0.18, 160, 0);
    this.playTone(175, 'sawtooth', 0.32, 0.2, 120, 0.16);
  }

  hurt() {
    this.playTone(300, 'square', 0.15, 0.16, 110, 0);
  }

  checkpoint() {
    this.playTone(587.33, 'sine', 0.14, 0.2, null, 0);
    this.playTone(880, 'sine', 0.24, 0.22, null, 0.1);
  }

  angryOwl() {
    this.playTone(190, 'sawtooth', 0.18, 0.18, 140, 0);
    this.playTone(190, 'sawtooth', 0.22, 0.18, 130, 0.2);
  }

  victory() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    const times = [0, 0.11, 0.22, 0.33, 0.48, 0.6];
    notes.forEach((n, i) => {
      this.playTone(n, 'triangle', 0.25, 0.24, null, times[i]);
    });
  }
}

const sound = new SoundEngine();
