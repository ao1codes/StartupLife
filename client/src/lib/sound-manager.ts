
// Sound manager for startup game audio effects
type SoundType = 'click' | 'hover' | 'startup' | 'success' | 'crisis' | 'opportunity' | 'milestone' | 'achievement' | 'statChange' | 'gameOver';

export class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private currentBgMusic: OscillatorNode | null = null;
  private musicGainNode: GainNode | null = null;

  constructor() {
    this.initAudioContext();
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Handle autoplay policy - context starts suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (error) {
      console.warn('AudioContext not supported:', error);
    }
  }

  private generateTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3): void {
    if (!this.audioContext || !this.enabled) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);

      // Clean up oscillator reference
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      console.warn('Sound generation failed:', error);
    }
  }

  private playSequence(notes: Array<{freq: number, duration: number}>, type: OscillatorType = 'sine'): void {
    let currentTime = 0;
    notes.forEach(note => {
      setTimeout(() => {
        this.generateTone(note.freq, note.duration, type);
      }, currentTime * 1000);
      currentTime += note.duration;
    });
  }

  private playStartupSound(): void {
    this.playSequence([
      {freq: 659, duration: 0.15},
      {freq: 880, duration: 0.15},
      {freq: 1047, duration: 0.2}
    ]);
  }

  private playSuccessSound(): void {
    this.playSequence([
      {freq: 523, duration: 0.1},
      {freq: 659, duration: 0.1},
      {freq: 784, duration: 0.15}
    ]);
  }

  private playCrisisSound(): void {
    this.playSequence([
      {freq: 400, duration: 0.15},
      {freq: 300, duration: 0.15},
      {freq: 200, duration: 0.2}
    ], 'sawtooth');
  }

  private playOpportunitySound(): void {
    this.playSequence([
      {freq: 440, duration: 0.1},
      {freq: 554, duration: 0.1},
      {freq: 659, duration: 0.15}
    ]);
  }

  private playMilestoneSound(): void {
    this.playSequence([
      {freq: 523, duration: 0.08},
      {freq: 698, duration: 0.08},
      {freq: 880, duration: 0.08},
      {freq: 1047, duration: 0.08},
      {freq: 1319, duration: 0.12}
    ], 'triangle');
  }

  private playAchievementSound(): void {
    this.playSequence([
      {freq: 523, duration: 0.1},
      {freq: 659, duration: 0.1},
      {freq: 784, duration: 0.1},
      {freq: 1047, duration: 0.15}
    ], 'triangle');
  }

  private playStatChangeSound(): void {
    this.generateTone(600, 0.1, 'square', 0.2);
  }

  private playGameOverSound(): void {
    this.playSequence([
      {freq: 880, duration: 0.15},
      {freq: 784, duration: 0.15},
      {freq: 698, duration: 0.15},
      {freq: 622, duration: 0.15},
      {freq: 523, duration: 0.3}
    ], 'triangle');
  }

  public play(soundType: SoundType): void {
    if (!this.enabled || !this.audioContext) return;

    try {
      switch (soundType) {
        case 'click':
          this.generateTone(800, 0.1, 'square', 0.2);
          break;
        case 'hover':
          this.generateTone(1200, 0.05, 'sine', 0.1);
          break;
        case 'startup':
          this.playStartupSound();
          break;
        case 'success':
          this.playSuccessSound();
          break;
        case 'crisis':
          this.playCrisisSound();
          break;
        case 'opportunity':
          this.playOpportunitySound();
          break;
        case 'milestone':
          this.playMilestoneSound();
          break;
        case 'achievement':
          this.playAchievementSound();
          break;
        case 'statChange':
          this.playStatChangeSound();
          break;
        case 'gameOver':
          this.playGameOverSound();
          break;
      }
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  public startBackgroundMusic(phase: 'idea' | 'building' | 'scaling' | 'endgame'): void {
    if (!this.enabled || !this.audioContext) return;

    this.stopBackgroundMusic();

    try {
      const baseFreq = this.getPhaseFrequency(phase);
      this.currentBgMusic = this.audioContext.createOscillator();
      this.musicGainNode = this.audioContext.createGain();

      this.currentBgMusic.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
      this.currentBgMusic.type = 'sine';

      // Very low volume for background music
      this.musicGainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);

      this.currentBgMusic.connect(this.musicGainNode);
      this.musicGainNode.connect(this.audioContext.destination);

      this.currentBgMusic.start();

      // Add some subtle frequency modulation for ambiance
      this.currentBgMusic.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
      this.currentBgMusic.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, this.audioContext.currentTime + 10);
    } catch (error) {
      console.warn('Background music failed:', error);
    }
  }

  public stopBackgroundMusic(): void {
    if (this.currentBgMusic) {
      try {
        this.currentBgMusic.stop();
        this.currentBgMusic.disconnect();
      } catch (error) {
        // Oscillator might already be stopped
      }
      this.currentBgMusic = null;
    }
    if (this.musicGainNode) {
      this.musicGainNode.disconnect();
      this.musicGainNode = null;
    }
  }

  private getPhaseFrequency(phase: string): number {
    switch (phase) {
      case 'idea': return 220; // A3 - calm, thoughtful
      case 'building': return 261.63; // C4 - energetic
      case 'scaling': return 329.63; // E4 - intense
      case 'endgame': return 440; // A4 - dramatic
      default: return 220;
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
