
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import '../styles/welcome.css';

function Welcome({ onEnter }) {
  const balloons = [
    'pink', 'black', 'white', 'black', 'pink',
    'white', 'pink', 'black', 'white', 'pink'
  ];

  return (
    <main className="welcome-screen">
      <div className="welcome-lights" />

      <div className="balloon-decor balloon-left">
        {balloons.slice(0, 5).map((color, i) => (
          <motion.div
            key={i}
            className={`balloon balloon-${color}`}
            animate={{ y: [0, -13, 0], rotate: [-4, 4, -4] }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
        <div className="balloon-ribbon" />
      </div>

      <div className="balloon-decor balloon-right">
        {balloons.slice(5).map((color, i) => (
          <motion.div
            key={i}
            className={`balloon balloon-${color}`}
            animate={{ y: [0, -12, 0], rotate: [4, -4, 4] }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
        <div className="balloon-ribbon" />
      </div>

      <div className="welcome-sparkle sparkle-one">✦</div>
      <div className="welcome-sparkle sparkle-two">✧</div>
      <div className="welcome-sparkle sparkle-three">✦</div>
      <div className="welcome-sparkle sparkle-four">✧</div>

      <motion.section
        className="welcome-content"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      >
        <div className="welcome-top-decoration">
          <span>✧</span>
          <Heart size={17} fill="currentColor" />
          <span>✧</span>
        </div>

        <p className="welcome-eyebrow">
          A CELEBRATION OF US
        </p>

        <h1>
          HAPPY ONE MONTH
          <span>ANNIVERSARY</span>
        </h1>

        <div className="welcome-name-divider">
          <span />
          <Heart size={19} fill="currentColor" />
          <span />
        </div>

        <h2>PAMELA <i>&</i> VICTORY</h2>

        <p className="welcome-date">
          06 . 10 . 2026 — 06 . 11 . 2026
        </p>

        <motion.button
          className="welcome-button"
          onClick={onEnter}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Our Celebration
          <ArrowRight size={17} />
        </motion.button>

        <div className="welcome-bottom-decoration">
          <Sparkles size={14} />
          <span>MADE WITH LOVE</span>
          <Sparkles size={14} />
        </div>
      </motion.section>
    </main>
  );
}

export default Welcome;
