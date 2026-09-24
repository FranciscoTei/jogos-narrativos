/**
 * Motor de Áudio e Efeitos Sonoros (Web Audio API)
 * O Mistério da Escola — 100% Offline
 */
window.SoundEngine = (() => {
  'use strict';

  let audioCtx = null;
  let bgmElement = null;
  let audioBtnElement = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function init(bgmEl, audioBtnEl) {
    bgmElement = bgmEl;
    audioBtnElement = audioBtnEl;
    if (bgmElement) bgmElement.volume = 0.38;
  }

  function playSfx(type) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'clue') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'passage') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(523, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'tab') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(349.23, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch (e) {
      // Suporte gracioso se o áudio estiver desativado no navegador
    }
  }

  function startBgm() {
    if (bgmElement && bgmElement.paused) {
      const p = bgmElement.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    }
    updateAudioButton();
  }

  function toggleBgm() {
    playSfx('click');
    if (!bgmElement) return;
    if (bgmElement.paused) startBgm();
    else {
      bgmElement.pause();
      updateAudioButton();
    }
  }

  function updateAudioButton() {
    if (!audioBtnElement || !bgmElement) return;
    audioBtnElement.textContent = bgmElement.paused ? '♫ Música' : '❚❚ Música';
  }

  return {
    init,
    playSfx,
    startBgm,
    toggleBgm,
    updateAudioButton
  };
})();
