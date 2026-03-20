import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const TOPICS = [
  { language: 'python', emoji: '🐍', label: 'Python' },
  { language: 'java', emoji: '☕', label: 'Java' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!language) {
      setError('Please select a language.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        setError(registerData.error || 'Registration failed.');
        return;
      }
      const token = registerData.token;
      localStorage.setItem('token', token);

      const enrollRes = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skill_name: language,
          description: `100-day ${language} challenge`,
          start_date: new Date().toISOString().split('T')[0],
        }),
      });
      if (!enrollRes.ok) {
        const enrollData = await enrollRes.json();
        setError(enrollData.error || 'Enrollment failed.');
        return;
      }

      navigate(`/flashcards/${language}`);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Create Your Account</h1>
      <p className={styles.subtitle}>Start your 100-day challenge</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className={styles.languageLabel}>Choose your language</p>
        <div className={styles.grid}>
          {TOPICS.map(({ language: lang, emoji, label }) => (
            <button
              key={lang}
              type="button"
              className={`${styles.card} ${language === lang ? styles.cardSelected : ''}`}
              onClick={() => setLanguage(lang)}
            >
              <span className={styles.emoji}>{emoji}</span>
              <span className={styles.label}>{label}</span>
            </button>
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Get Started'}
        </button>
      </form>
    </div>
  );
}
