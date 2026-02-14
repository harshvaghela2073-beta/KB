import { useState, useRef, useEffect } from 'react';

/**
 * BackgroundMusic — Plays a song per page on loop.
 *
 * Props:
 *   currentSong — imported audio URL for the current page
 *
 * - Starts on the user's first click/tap (the Start button).
 * - Switches song when the page changes.
 * - Shows a small speaker icon (top-right) to mute / unmute.
 */

function BackgroundMusic({ currentSong }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  // Start playback on first user interaction anywhere
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startPlayback = () => {
      if (!audio.paused) return;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    document.addEventListener('click', startPlayback, { once: true });
    document.addEventListener('touchstart', startPlayback, { once: true });

    return () => {
      document.removeEventListener('click', startPlayback);
      document.removeEventListener('touchstart', startPlayback);
    };
  }, []);

  // Switch song when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong;
    audio.load();

    // If already playing, continue with the new song
    if (playing) {
      audio.play().catch(() => {});
    }
  }, [currentSong]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" />

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
