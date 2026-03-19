import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlashcardCard from '../../components/flashcards/FlashcardCard';
import FlashcardProgress from '../../components/flashcards/FlashcardProgress';
import FlashcardSummary from '../../components/flashcards/FlashcardSummary';
import styles from './FlashcardPage.module.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function FlashcardPage() {
  const { language = 'python' } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gotItCount, setGotItCount] = useState(0);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/flashcards?language=${encodeURIComponent(language)}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setCards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  function resetSession() {
    setCurrentIndex(0);
    setGotItCount(0);
  }

  function handleGotIt() {
    setGotItCount((n) => n + 1);
    setCurrentIndex((i) => i + 1);
  }

  function handleReviewAgain() {
    setCurrentIndex((i) => i + 1);
  }

  if (loading) return <div className={styles.center}>Loading cards…</div>;
  if (error) return <div className={styles.center}><p className={styles.error}>Error: {error}</p></div>;
  if (cards.length === 0) return <div className={styles.center}>No cards found for "{language}".</div>;

  const isDone = currentIndex >= cards.length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate('/')}>← Home</button>
        <h1 className={styles.title}>{language.charAt(0).toUpperCase() + language.slice(1)} Flashcards</h1>
      </header>

      {isDone ? (
        <FlashcardSummary
          total={cards.length}
          gotIt={gotItCount}
          onPracticeAgain={resetSession}
          onHome={() => navigate('/')}
        />
      ) : (
        <main className={styles.main}>
          <FlashcardProgress current={currentIndex + 1} total={cards.length} />
          <FlashcardCard
            key={currentIndex}
            card={cards[currentIndex]}
            onGotIt={handleGotIt}
            onReviewAgain={handleReviewAgain}
          />
        </main>
      )}
    </div>
  );
}
