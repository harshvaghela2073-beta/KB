import { useMemo } from 'react';

/**
 * FloatingHearts - Renders animated hearts & sparkles that float up from
 * the bottom of the screen. Uses pure CSS animations so the hearts keep
 * drifting without any JS timers or re-renders.
 */

const HEART_SYMBOLS = ['♥', '♡', '❤', '💕', '✨', '💗', '💖', '💘', '💝', '❣️'];

function FloatingHearts() {
  // Generate heart data once on mount — random sizes, positions, speeds
  const hearts = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
      left: `${Math.random() * 100}%`,
      size: `${14 + Math.random() * 26}px`,
      duration: `${8 + Math.random() * 16}s`,
      delay: `${Math.random() * 15}s`,
      opacity: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay,
            color: `hsl(${330 + Math.random() * 40}, 70%, ${65 + Math.random() * 20}%)`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;
