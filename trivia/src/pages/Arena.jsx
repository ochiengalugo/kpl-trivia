import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import GameSetup from '../GameSetup';
import QuizCard from '../QuizCard';
import SummaryScreen from '../SummaryScreen';

export default function Arena() {
  const [gameState, setGameState] = useState('setup');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const fetchQuestions = async (config) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://opentdb.com/api.php?amount=${config.amount}&category=21&difficulty=${config.difficulty}&type=multiple`;
      const res = await fetch(url);
      
      if (!res.ok) throw new Error('Network error: Unable to reach Trivia API.');
      
      const data = await res.json();

      if (data.response_code !== 0 || !data.results || data.results.length === 0) {
        throw new Error('No trivia questions returned for these parameters. Try adjusting difficulty.');
      }

      const formatted = data.results.map((q) => {
        const answers = [...q.incorrect_answers, q.correct_answer];
        for (let i = answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return {
          question: q.question,
          correctAnswer: q.correct_answer,
          answers: answers
        };
      });

      setQuestions(formatted);
      setGameState('playing');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = (config) => {
    setScore(0);
    setUserAnswers([]);
    fetchQuestions(config);
  };

  const handleFinishQuiz = (finalScore, answerLog, maxStreak) => {
    setScore(finalScore);
    setUserAnswers(answerLog);
    setBestStreak(maxStreak);

    const existingLeaderboard = JSON.parse(localStorage.getItem('arcade_leaderboard') || '[]');
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      score: finalScore,
      accuracy: Math.round((answerLog.filter(a => a.isCorrect).length / answerLog.length) * 100)
    };
    localStorage.setItem('arcade_leaderboard', JSON.stringify([newEntry, ...existingLeaderboard]));

    setGameState('summary');
  };

  return (
    <AnimatePresence mode="wait">
      {gameState === 'setup' && (
        <GameSetup 
          key="setup" 
          onStart={handleStartGame} 
          loading={loading} 
          error={error} 
        />
      )}

      {gameState === 'playing' && (
        <QuizCard
          key="playing"
          questions={questions}
          onComplete={handleFinishQuiz}
        />
      )}

      {gameState === 'summary' && (
        <SummaryScreen
          key="summary"
          score={score}
          total={questions.length}
          streak={bestStreak}
          answers={userAnswers}
          onRestart={() => setGameState('setup')}
        />
      )}
    </AnimatePresence>
  );
}