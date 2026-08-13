import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questionVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.35, staggerChildren: 0.08 } 
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.25 } }
};

const optionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function QuizCard({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answersLog, setAnswersLog] = useState([]);

  const currentQ = questions[currentIndex];

  
  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  
  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft === 0) {
      handleOptionSelect(null); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleOptionSelect = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    let newScore = score;
    let newStreak = streak;
    let newMaxStreak = maxStreak;

    if (isCorrect) {
      newScore += 100 + timeLeft * 10; 
      newStreak += 1;
      if (newStreak > newMaxStreak) newMaxStreak = newStreak;
    } else {
      newStreak = 0;
    }

    setScore(newScore);
    setStreak(newStreak);
    setMaxStreak(newMaxStreak);

    setAnswersLog((prev) => [
      ...prev,
      {
        question: decodeHTML(currentQ.question),
        selected: option ? decodeHTML(option) : 'Time Expired',
        correct: decodeHTML(currentQ.correctAnswer),
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      onComplete(score, answersLog, maxStreak);
    }
  };

  
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="card quiz-card">
      
      <div className="quiz-header">
        <div className="metric">
          <span className="label">SCORE</span>
          <span className="value">{score}</span>
        </div>
        <div className="metric">
          <span className="label">STREAK</span>
          <span className="value streak-val">🔥 {streak}</span>
        </div>
        <div className="metric">
          <span className="label">TIMER</span>
          <span className={`value ${timeLeft <= 5 ? 'warning' : ''}`}>{timeLeft}s</span>
        </div>
      </div>

      
      <div className="progress-track">
        <motion.div 
          className="progress-fill"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={questionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="question-block"
        >
          <span className="q-counter">Question {currentIndex + 1} of {questions.length}</span>
          <h3 className="question-text">{decodeHTML(currentQ.question)}</h3>

          <div className="options-grid">
            {currentQ.answers.map((opt, idx) => {
              const decodedOpt = decodeHTML(opt);
              let btnState = '';

              if (isAnswered) {
                if (opt === currentQ.correctAnswer) btnState = 'correct';
                else if (opt === selectedOption) btnState = 'incorrect';
                else btnState = 'dimmed';
              }

              return (
                <motion.button
                  key={idx}
                  variants={optionVariants}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  className={`option-btn ${btnState}`}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={isAnswered}
                >
                  {decodedOpt}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      
      {isAnswered && (
        <motion.div 
          className="action-bar"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="cta-button" onClick={handleNextQuestion}>
            {currentIndex + 1 === questions.length ? 'VIEW FINAL RESULTS' : 'NEXT QUESTION ➔'}
          </button>
        </motion.div>
      )}
    </div>
  );
}