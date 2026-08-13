import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SummaryScreen({ score, total, streak, answers, onRestart }) {
  const percentage = Math.round((answers.filter(a => a.isCorrect).length / total) * 100);

  useEffect(() => {
    if (percentage >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  return (
    <motion.div 
      className="card summary-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Match Completed!</h2>

      <div className="stats-summary">
        <div className="stat-box">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Total Points</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{percentage}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">🔥 {streak}</span>
          <span className="stat-label">Max Streak</span>
        </div>
      </div>

      <h3>Match Log Breakdown</h3>
      <div className="answers-log">
        {answers.map((item, idx) => (
          <div key={idx} className={`log-item ${item.isCorrect ? 'pass' : 'fail'}`}>
            <p className="log-q"><strong>Q{idx + 1}:</strong> {item.question}</p>
            <p className="log-a">Your Answer: <span>{item.selected}</span></p>
            {!item.isCorrect && (
              <p className="log-c">Correct Answer: <span>{item.correct}</span></p>
            )}
          </div>
        ))}
      </div>

      <motion.button 
        className="cta-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRestart}
      >
        PLAY AGAIN
      </motion.button>
    </motion.div>
  );
}