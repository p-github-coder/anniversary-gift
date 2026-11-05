
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

import GiftObject from '../components/GiftObject';
import TimelineGift from '../components/TimelineGift';
import Envelope from '../components/Envelope';
import ScratchCard from '../components/ScratchCard';
import FinalGift from '../components/FinalGift';

import '../styles/room.css';
import '../styles/gifts.css';

function GiftRoom({ onRestart }) {
  const [openedGifts, setOpenedGifts] = useState([]);
  const [activeGift, setActiveGift] = useState(null);

  const gifts = [
    {
      id: 1,
      type: 'box',
      title: 'A Little Keepsake',
      subtitle: 'Our story, in little moments'
    },
    {
      id: 2,
      type: 'letter',
      title: 'A Letter For You',
      subtitle: 'A few words from my heart'
    },
    {
      id: 3,
      type: 'surprise',
      title: 'A Sweet Surprise',
      subtitle: 'Who you are to me'
    },
    {
      id: 4,
      type: 'final',
      title: 'A Thousand Tomorrows',
      subtitle: 'Our next chapter'
    }
  ];

  // Gift 4 unlocks after the first three have been opened.
  const finalUnlocked = [1, 2, 3].every(id =>
    openedGifts.includes(id)
  );

  // Record each gift as opened only once.
  const handleGiftOpened = (id) => {
    setOpenedGifts(previous =>
      previous.includes(id)
        ? previous
        : [...previous, id]
    );
  };

  // Decide which gift experience to display.
  const handleGiftClick = (id) => {
    if (id === 4 && !finalUnlocked) return;

    const giftScreens = {
      1: 'timeline',
      2: 'letter',
      3: 'scratch',
      4: 'final'
    };

    setActiveGift(giftScreens[id] || null);
  };

  return (
    <main className="anniversary-room">

      {/* BACKGROUND EFFECTS */}
      <div className="room-background-glow glow-one" />
      <div className="room-background-glow glow-two" />

      {/* HEADER */}
      <header className="room-header">
        <div className="room-logo">
          <span>୨୧</span> THE GIFT ROOM
        </div>

        <div className="room-progress">
          <p>YOUR LITTLE SURPRISES</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(openedGifts.length / 4) * 100}%`
              }}
            />
          </div>

          <span>
            {openedGifts.length} / 4 OPENED
          </span>
        </div>
      </header>

      {/* INTRODUCTION */}
      <section className="room-intro">

        <motion.p
          className="room-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          HAPPY ONE MONTH, HANDSOME
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Today is <span>all about us.</span>
        </motion.h1>

        <motion.p
          className="room-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Welcome to our little celebration.
          I've prepared a few things just for you.
        </motion.p>

        <div className="room-divider">
          <span />
          <Heart size={14} fill="currentColor" />
          <span />
        </div>

      </section>

      {/* GIFT DISPLAY */}
      <section className="party-room">

        {/* FLOATING BALLOONS */}
        <motion.div
          className="party-balloon balloon-pink"
          animate={{
            y: [0, -14, 0],
            rotate: [-4, 4, -4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity
          }}
        >
          ♡
        </motion.div>

        <motion.div
          className="party-balloon balloon-white"
          animate={{
            y: [0, -12, 0],
            rotate: [4, -4, 4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        >
          ♡
        </motion.div>

        <motion.div
          className="party-balloon balloon-black"
          animate={{
            y: [0, -16, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity
          }}
        >
          ♡
        </motion.div>

        {/* PARTY LIGHTS */}
        <div className="party-lights">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        {/* THE FOUR GIFTS */}
        <div className="gift-display">

          {gifts.map((gift, index) => (
            <GiftObject
              key={gift.id}
              type={gift.type}
              title={gift.title}
              subtitle={gift.subtitle}
              index={index}
              opened={openedGifts.includes(gift.id)}
              locked={gift.id === 4 && !finalUnlocked}
              onClick={() => handleGiftClick(gift.id)}
            />
          ))}

        </div>

        <div className="room-floor" />

        <div className="party-caption">
          <Sparkles size={13} />
          A LITTLE ROOM FULL OF LOVE
          <Sparkles size={13} />
        </div>

      </section>

      {/* FOOTER */}
      <footer className="room-footer">

        <p>
          Open the first three surprises to unlock
          something extra special.
        </p>

        <span>
          MADE WITH LOVE
          <Heart size={11} fill="currentColor" />
        </span>

      </footer>

      {/* GIFT 1: OUR LITTLE TIMELINE */}
      {activeGift === 'timeline' && (
        <TimelineGift
          onClose={() => setActiveGift(null)}
          onOpened={() => handleGiftOpened(1)}
        />
      )}

      {/* GIFT 2: LOVE LETTER */}
      {activeGift === 'letter' && (
        <Envelope
          onClose={() => setActiveGift(null)}
          onOpened={() => handleGiftOpened(2)}
        />
      )}

      {/* GIFT 3: SCRATCH CARDS */}
      {activeGift === 'scratch' && (
        <ScratchCard
          onClose={() => setActiveGift(null)}
          onOpened={() => handleGiftOpened(3)}
        />
      )}

      {/* GIFT 4: A THOUSAND TOMORROWS */}
      {activeGift === 'final' && (
  <FinalGift
    onOpened={() => handleGiftOpened(4)}
    onRestart={() => {
      setActiveGift(null);
      onRestart();
    }}
  />
)}

    </main>
  );
}

export default GiftRoom;
