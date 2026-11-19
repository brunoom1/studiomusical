// Sintetizador acústico de violão baseado na Web Audio API
// Utiliza modelagem harmônica com decaimento exponencial e filtragem ressonante

class GuitarSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeTimeouts: number[] = [];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAll();
    }
  }

  public playNote(frequency: number, duration: number = 1.6, startTime?: number) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = startTime ?? ctx.currentTime;

      // 1. Oscilador Primário (Fundamental rica)
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(frequency, now);

      // 2. Oscilador Secundário (Harmônicos de corda metálica/nylon)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(frequency, now);

      // 3. Filtro Passa-Baixa Dinâmico (simula o ataque brilhante e amortecimento natural do violão)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(frequency * 5, 5500), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(frequency * 1.2, 180), now + duration);

      // 4. Ganho e Envelope de Amplitude (Ataque rápido, decaimento suave)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0001, now);
      // Ataque percussivo
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.008);
      // Decaimento natural de corda pinçada
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Mistura dos osciladores
      const osc1Gain = ctx.createGain();
      osc1Gain.gain.setValueAtTime(0.7, now);
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.3, now);

      osc1.connect(osc1Gain);
      osc2.connect(osc2Gain);

      osc1Gain.connect(filter);
      osc2Gain.connect(filter);

      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  }

  public playChord(frequencies: number[], strumSpeedMs: number = 38) {
    if (this.isMuted) return;
    this.stopAll();

    frequencies.forEach((freq, index) => {
      const tId = window.setTimeout(() => {
        this.playNote(freq, 2.2);
      }, index * strumSpeedMs);
      this.activeTimeouts.push(tId);
    });
  }

  public playSequence(
    frequencies: number[],
    stepDurationMs: number = 240,
    onStepCallback?: (index: number) => void
  ) {
    if (this.isMuted) return;
    this.stopAll();

    frequencies.forEach((freq, index) => {
      const tId = window.setTimeout(() => {
        this.playNote(freq, 1.2);
        if (onStepCallback) onStepCallback(index);
      }, index * stepDurationMs);
      this.activeTimeouts.push(tId);
    });
  }

  public stopAll() {
    this.activeTimeouts.forEach(tId => clearTimeout(tId));
    this.activeTimeouts = [];
  }
}

export const guitarAudio = new GuitarSynth();
