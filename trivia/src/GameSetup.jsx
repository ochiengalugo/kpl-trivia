import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GameSetup({ onStart, loading, error }) {
  const [difficulty, setDifficulty] = useState('medium');
  const [amount, setAmount] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ difficulty, amount });
  };

  return (
    <motion.div 
      className="card setup-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2>Configure Match Parameters</h2>
      <p>Set difficulty and question limit to start your quiz session.</p>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Difficulty</label>
          <div className="radio-group">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                type="button"
                key={level}
                className={`select-btn ${difficulty === level ? 'active' : ''}`}
                onClick={() => setDifficulty(level)}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Questions: <strong>{amount}</strong></label>
          <input 
            type="range" 
            min="5" 
            max="20" 
            step="5" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <button 
          type="submit" 
          className="cta-button"
          disabled={loading}
        >
          {loading ? 'Fetching Questions...' : 'START MATCH'}
        </button>
      </form>
    </motion.div>
  );
}