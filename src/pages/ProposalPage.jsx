import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

/**
 * ============================================================
 *  ProposalPage — "Will you be my Valentine?"
 * ============================================================
 *
 *  Both buttons look identical (same size, same pink style).
 *
 *  HOW THE NO BUTTON DODGE WORKS
 *  ──────────────────────────────────────────────────
 *  - The button slides smoothly AWAY from the cursor/finger
 *    each time it's approached (70-110 px nudge).
 *  - On DESKTOP: onMouseEnter triggers the dodge.
 *  - On MOBILE: onTouchStart fires BEFORE the tap registers,
 *    so the button moves away before it can be pressed.
 *    The dodge is clamped to the full viewport (not just the
 *    card) so it has room to escape on small screens.
 *  - After 12 dodges it starts shrinking; after 18 it vanishes.
 * ============================================================
 */

/* ---------- helpers ---------- */

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function isMobile() {
  return window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches;
}

function fireCelebration() {
  const duration = 4000;
  const end = Date.now() + duration;
  const colors = ['#e91e63', '#f48fb1', '#ff80ab', '#ce93d8', '#f44336'];

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    shapes: ['circle'],
    scalar: 1.2,
  });

  const interval = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval);
    confetti({
      particleCount: 30,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.3, 0.7) },
      colors,
      shapes: ['circle'],
    });
  }, 250);
}

/* ---------- component ---------- */

function ProposalPage() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // NO button dodge state
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [noHidden, setNoHidden] = useState(false);

  const cardRef = useRef(null);
  const noRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  /**
   * dodgeNoButton
   *
   * Computes a direction AWAY from the cursor/touch point and
   * nudges the button in that direction. On mobile the clamp
   * boundary is the viewport; on desktop it's the card.
   */
  const dodgeNoButton = useCallback(
    (e) => {
      if (noHidden || accepted) return;

      const card = cardRef.current;
      const btn = noRef.current;
      if (!card || !btn) return;

      const cardRect = card.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      // Button centre (viewport coords)
      const btnCx = btnRect.left + btnRect.width / 2;
      const btnCy = btnRect.top + btnRect.height / 2;

      // Cursor / touch position
      let cursorX, cursorY;
      if (e?.touches?.length) {
        cursorX = e.touches[0].clientX;
        cursorY = e.touches[0].clientY;
      } else if (e?.clientX != null) {
        cursorX = e.clientX;
        cursorY = e.clientY;
      } else {
        cursorX = btnCx;
        cursorY = btnCy - 1;
      }

      // Direction away from cursor
      let dx = btnCx - cursorX;
      let dy = btnCy - cursorY;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      dx /= len;
      dy /= len;

      // Small random twist for variety
      const twist = randomInRange(-0.45, 0.45);
      const cos = Math.cos(twist);
      const sin = Math.sin(twist);
      const tdx = dx * cos - dy * sin;
      const tdy = dx * sin + dy * cos;

      const nudge = randomInRange(70, 110);

      let newX = noOffset.x + tdx * nudge;
      let newY = noOffset.y + tdy * nudge;

      // "Natural" position = where the button sits without any translate
      const naturalLeft = btnRect.left - noOffset.x;
      const naturalTop = btnRect.top - noOffset.y;

      // On mobile: clamp to viewport; on desktop: clamp to card
      const pad = 14;
      let boundsLeft, boundsRight, boundsTop, boundsBottom;

      if (isMobile()) {
        boundsLeft = pad;
        boundsRight = window.innerWidth - pad;
        boundsTop = pad;
        boundsBottom = window.innerHeight - pad;
      } else {
        boundsLeft = cardRect.left + pad;
        boundsRight = cardRect.right - pad;
        boundsTop = cardRect.top + pad;
        boundsBottom = cardRect.bottom - pad;
      }

      const minOffsetX = boundsLeft - naturalLeft;
      const maxOffsetX = boundsRight - naturalLeft - btnRect.width;
      const minOffsetY = boundsTop - naturalTop;
      const maxOffsetY = boundsBottom - naturalTop - btnRect.height;

      newX = clamp(newX, minOffsetX, maxOffsetX);
      newY = clamp(newY, minOffsetY, maxOffsetY);

      setNoOffset({ x: newX, y: newY });

      const next = noAttempts + 1;
      setNoAttempts(next);

      if (next >= 18) {
        setNoHidden(true);
      }
    },
    [noOffset, noAttempts, noHidden, accepted],
  );

  const handleYes = () => {
    if (accepted) return;
    setAccepted(true);
    fireCelebration();
  };

  // Gentle shrink after 12 dodges
  const noScale = noAttempts > 12 ? Math.max(0.4, 1 - (noAttempts - 12) * 0.1) : 1;

  /* ---- Celebration overlay ---- */
  if (accepted) {
    return (
      <div className="celebration-overlay">
        <div className="celebration-content">
          <div className="celebration-hearts">💖💕💖</div>
          <h1 className="celebration-title">Yay! 🥰</h1>
          <p className="celebration-message">
            I knew you'd say yes!<br />
            You just made me blush ( you don't have option to select NO btw). ❤️
          </p>
        </div>
      </div>
    );
  }

  /* ---- Proposal card ---- */
  return (
    <div className="page-wrapper">
      <div
        ref={cardRef}
        className={`proposal-card ${visible ? 'fade-enter-active' : 'fade-enter'}`}
      >
        <h1 className="proposal-title">Will you tolerate my tak tak, chaos, kich kich for this life ? 💝</h1>

        <div className="proposal-buttons">
          {/* ── YES button ── */}
          <button className="proposal-btn yes-button" onClick={handleYes}>
            Yes
          </button>

          {/* ── NO button (smooth dodge) ── */}
          {!noHidden && (
            <button
              ref={noRef}
              className="proposal-btn no-button"
              style={{
                transform: `translate(${noOffset.x}px, ${noOffset.y}px) scale(${noScale})`,
                opacity: noScale < 0.6 ? noScale + 0.2 : 1,
              }}
              onMouseEnter={dodgeNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                dodgeNoButton(e);
              }}
              onClick={(e) => {
                e.preventDefault();
                dodgeNoButton(e);
              }}
            >
              No
            </button>
          )}
        </div>

        {noAttempts >= 8 && !noHidden && (
          <p
            style={{
              marginTop: '24px',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: 'var(--rose-gold)',
              fontSize: '0.95rem',
              animation: 'celebrationFadeIn 0.5s ease',
            }}
          >
            Hmm… that button seems to have a mind of its own 😏
          </p>
        )}

        {noHidden && (
          <p
            style={{
              marginTop: '24px',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: 'var(--rose-gold)',
              fontSize: '1rem',
              animation: 'celebrationFadeIn 0.5s ease',
            }}
          >
            Looks like "No" isn't an option! 💁‍♀️
          </p>
        )}
      </div>
    </div>
  );
}

export default ProposalPage;
