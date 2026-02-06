/**
 * PageDots - Shows progress indicator dots (1 per story page).
 * The active page gets a highlighted, scaled dot.
 */

function PageDots({ total, current, onDotClick }) {
  return (
    <div className="page-dots">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`page-dot ${i === current ? 'active' : ''}`}
          onClick={() => onDotClick(i)}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default PageDots;
