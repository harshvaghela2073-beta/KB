import { useState, useRef, useEffect } from 'react';
import song from '../assets/songs/tane_joy_me_jyaarthi.mp3';

/**
 * BackgroundMusic — Plays a single song on infinite loop.
 *
 * - Starts on the user's first click/tap anywhere on the page.
 * - Shows a small speaker icon (top-right) to mute / unmute.
 */

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  // Start playback on first user interaction anywhere
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startPlayback = () => {
      if (!audio.paused) return; // already playing
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    document.addEventListener('click', startPlayback, { once: true });
    document.addEventListener('touchstart', startPlayback, { once: true });

    return () => {
      document.removeEventListener('click', startPlayback);
      document.removeEventListener('touchstart', startPlayback);
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation(); // don't count as the "first click" twice
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} src={song} loop preload="auto" />

      {playing && (
        <button
          className="music-toggle"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      )}
    </>
  );
}

export default BackgroundMusic;
