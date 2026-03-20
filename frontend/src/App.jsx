import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import FlashcardPage from './pages/flashcards/FlashcardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/flashcards/:language" element={<FlashcardPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
