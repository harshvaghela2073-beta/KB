import { useState, useEffect } from 'react';

/**
 * StartPage — Landing page with "Are you ready?" and a Start button.
 * Clicking Start triggers the background music (first click event)
 * and transitions into the story.
 */

function StartPage({ onStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page-wrapper">
      <div className={`start-card ${visible ? 'fade-enter-active' : 'fade-enter'}`}>
        <p className="start-greeting">Hey you… 💌</p>
        <h1 className="start-title">Are you ready?</h1>
        <p className="start-subtitle">
          I made something just for you. Take a deep breath and tap start.
        </p>
        <button className="start-button" onClick={onStart}>
          Start
        </button>
      </div>
    </div>
  );
}

export default StartPage;
