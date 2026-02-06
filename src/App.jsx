import { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import BackgroundMusic from './components/BackgroundMusic';
import StartPage from './pages/StartPage';
import StoryPage from './pages/StoryPage';
import ProposalPage from './pages/ProposalPage';
import storyPages from './data/storyContent';
import './styles/global.css';

/**
 * App — Root component that manages page navigation.
 *
 * Start page → Story pages → Proposal page
 */

function App() {
  const [started, setStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const totalStoryPages = storyPages.length;

  const goToNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToDot = (index) => {
    setCurrentPage(index);
  };

  const isProposalPage = currentPage >= totalStoryPages;

  return (
    <>
      {/* Animated gradient background */}
      <div className="app-background" />

      {/* Background music — starts on first click (the Start button) */}
      <BackgroundMusic />

      {/* Floating hearts / sparkles */}
      <FloatingHearts />

      {/* Page content */}
      {!started ? (
        <StartPage onStart={() => setStarted(true)} />
      ) : isProposalPage ? (
        <ProposalPage />
      ) : (
        <StoryPage
          page={storyPages[currentPage]}
          pageIndex={currentPage}
          totalPages={totalStoryPages}
          onNext={goToNext}
          onPrev={goToPrev}
          onDotClick={goToDot}
        />
      )}
    </>
  );
}

export default App;
