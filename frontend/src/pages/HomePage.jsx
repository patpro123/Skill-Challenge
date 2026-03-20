import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const TOPICS = [
  { language: 'python', emoji: '🐍', label: 'Python' },
  { language: 'java', emoji: '☕', label: 'Java' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>100-Day Challenge</h1>
      <p className={styles.subtitle}>Pick a topic to practice flashcards</p>
      <div className={styles.grid}>
        {TOPICS.map(({ language, emoji, label }) => (
          <button
            key={language}
            className={styles.card}
            onClick={() => navigate(`/flashcards/${language}`)}
          >
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.label}>{label}</span>
          </button>
        ))}
      </div>
      <button className={styles.cta} onClick={() => navigate('/register')}>
        Get Started
      </button>
    </div>
  );
}
