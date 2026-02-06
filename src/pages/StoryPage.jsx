import { useState, useEffect } from 'react';
import PageDots from '../components/PageDots';

/**
 * StoryPage — Renders one story/memory card.
 *
 * Props:
 *  - page      : { title, text, image }
 *  - pageIndex : current 0-based index
 *  - totalPages: total number of story pages
 *  - onNext    : go to next page
 *  - onPrev    : go to previous page
 *  - onDotClick: jump to a specific page
 */

function StoryPage({ page, pageIndex, totalPages, onNext, onPrev, onDotClick }) {
  const [visible, setVisible] = useState(false);

  // Trigger fade-in animation whenever the page changes
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [pageIndex]);

  const isFirstPage = pageIndex === 0;
  const isLastStory = pageIndex === totalPages - 1;

  return (
    <div className="page-wrapper">
      <div
        className={`story-card ${visible ? 'fade-enter-active' : 'fade-enter'}`}
      >
        {/* Image area */}
        <div className={`image-container${page.tall ? ' tall' : ''}`}>
          {page.image ? (
            <img src={page.image} alt={page.title} />
          ) : (
            <span className="image-placeholder-text">
              Your photo here
            </span>
          )}
        </div>

        {/* Text content */}
        <h2 className="story-title">{page.title}</h2>
        <p className="story-text">{page.text}</p>

        {/* Navigation buttons — Previous & Next */}
        <div className="nav-row">
          {!isFirstPage && (
            <button className="nav-button prev" onClick={onPrev}>
              <span className="arrow">&larr;</span>
              Previous
            </button>
          )}

          <button className="nav-button" onClick={onNext}>
            {isLastStory ? 'The Big Question' : 'Next'}
            <span className="arrow">&rarr;</span>
          </button>
        </div>

        {/* Progress dots */}
        <PageDots total={totalPages} current={pageIndex} onDotClick={onDotClick} />
      </div>
    </div>
  );
}

export default StoryPage;
