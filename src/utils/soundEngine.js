// Royal Audio Engine - Disabled per user design requirements (No audio on website)
class SoundEngine {
  constructor() {
    this.enabled = false;
  }
  init() {}
  toggle() { return false; }
  playSilkChord() {}
  playZariShimmer() {}
  playBoxLatch() {}
  playLoomShuttle() {}
}

export const royalAudio = new SoundEngine();
