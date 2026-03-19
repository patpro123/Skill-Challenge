import styles from './FlashcardSummary.module.css';

export default function FlashcardSummary({ total, gotIt, onPracticeAgain, onHome }) {
  const reviewAgain = total - gotIt;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Session complete!</h2>

      <div className={styles.score}>
        <span className={styles.scoreNum}>{gotIt}</span>
        <span className={styles.scoreDen}>/ {total}</span>
        <span className={styles.scoreLabel}>known</span>
      </div>

      <div className={styles.breakdown}>
        <div className={`${styles.pill} ${styles.pillGreen}`}>
          Got it: {gotIt}
        </div>
        <div className={`${styles.pill} ${styles.pillRed}`}>
          Review again: {reviewAgain}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onHome}>
          ← Back to home
        </button>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onPracticeAgain}>
          Practice again
        </button>
      </div>
    </div>
  );
}
