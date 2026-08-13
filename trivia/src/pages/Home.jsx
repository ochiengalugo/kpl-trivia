import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="card home-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* <h1>Welcome to Sports Trivia Arcade</h1> */}
      <p>Test your knowledge on the Kenya Premier League seasons.</p>
      
      <div className="feature-list">
        <div className="feature-item">⚽ KPL Trivia seasons </div>
        <div className="feature-item">⚡ Dynamic Speed Bonus Scoring</div>
        <div className="feature-item">🔥 Streak Tracking & Live Analytics</div>
      </div>

      <motion.button 
        className="cta-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/arena')}
      >
        ENTER THE ARENA ➔
      </motion.button>
    </motion.div>
  );
}