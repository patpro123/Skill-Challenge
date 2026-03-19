import { useState } from 'react';
import styles from './FlashcardCard.module.css';

export default function FlashcardCard({ card, onGotIt, onReviewAgain }) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    if (!flipped) setFlipped(true);
  }

  function handleGotIt() {
    setFlipped(false);
    onGotIt();
  }

  function handleReviewAgain() {
    setFlipped(false);
    onReviewAgain();
  }

  return (
    <div className={styles.scene}>
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? 'Card showing answer' : 'Click to reveal answer'}
      >
        <div className={styles.face}>
          <span className={styles.label}>Question</span>
          <p className={styles.text}>{card.question}</p>
          {!flipped && <span className={styles.hint}>Tap to reveal answer</span>}
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <span className={styles.label}>Answer</span>
          <p className={styles.text}>{card.answer}</p>
        </div>
      </div>

      {flipped && (
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnReview}`} onClick={handleReviewAgain}>
            Review again
          </button>
          <button className={`${styles.btn} ${styles.btnGotIt}`} onClick={handleGotIt}>
            Got it ✓
          </button>
        </div>
      )}
    </div>
  );
}
