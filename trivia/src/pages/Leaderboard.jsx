import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('arcade_leaderboard') || '[]');
    setScores(data);
  }, []);

  return (
    <motion.div 
      className="card leaderboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2>Match History & High Scores</h2>

      {scores.length === 0 ? (
        <div className="empty-state">
          <p>No matches recorded yet. Visit the Arena to set your first score!</p>
        </div>
      ) : (
        <table className="score-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Accuracy</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.accuracy}%</td>
                <td><strong>{item.score} pts</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}