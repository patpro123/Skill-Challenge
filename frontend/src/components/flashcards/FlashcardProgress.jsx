import styles from './FlashcardProgress.module.css';

export default function FlashcardProgress({ current, total }) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.counter}>
        Card {current} of {total}
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
