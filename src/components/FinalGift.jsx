
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Heart,
  Sparkles,
  Gift,
  Stars,
  MapPin,
  Plane,
  Camera,
  MoonStar,
  HandHeart,
  Infinity,
  Flower2,
  Globe2
} from 'lucide-react';

import '../styles/gifts.css';

const sparkles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  delay: (index % 7) * 0.2,
  size: 9 + (index % 4) * 5
}));

const confetti = Array.from({ length: 55 }, (_, index) => ({
  id: index,
  left: `${(index * 29 + 5) % 100}%`,
  delay: (index % 11) * 0.08,
  duration: 2.2 + (index % 5) * 0.35,
  rotation: index * 53
}));

const futureDreams = [
  {
    icon: <MapPin size={20} />,
    label: 'PLACES TO DISCOVER',
    title: 'A world of places, with you.',
    description:
      'New cities, beautiful views, little restaurants, lovely beaches and places we can turn into our own favourite memories.'
  },
  {
    icon: <Camera size={20} />,
    label: 'MEMORIES TO MAKE',
    title: 'A thousand little firsts.',
    description:
      'Our first proper date, pictures together, spontaneous adventures, silly videos, long walks and moments we will talk about years later.'
  },
  {
    icon: <MoonStar size={20} />,
    label: 'THE LITTLE THINGS',
    title: 'Ordinary days, made special.',
    description:
      'Sharing meals, laughing at random things, having our favourite conversations, falling asleep after long calls and simply enjoying being together.'
  },
  {
    icon: <HandHeart size={20} />,
    label: 'WHAT I HOPE FOR US',
    title: 'A love that keeps growing.',
    description:
      'More understanding, patience, honesty, reassurance, laughter and the willingness to keep choosing each other through every new chapter.'
  }
];

const destinations = [
  {
    city: 'Paris',
    country: 'FRANCE',
    caption: 'A little romance in the City of Love.',
    memory:
      'The Eiffel Tower, pretty streets, cute cafés and a thousand pictures together.',
    symbol: '♡'
  },
  {
    city: 'Italy',
    country: 'ITALY',
    caption: 'La dolce vita, but with you.',
    memory:
      'Beautiful coastlines, delicious food, exploring lovely streets and making unforgettable memories.',
    symbol: '✧'
  },
  {
    city: 'New York',
    country: 'UNITED STATES',
    caption: 'Our own little movie moment.',
    memory:
      'City lights, late-night walks, exploring the streets and experiencing the magic of New York together.',
    symbol: '♥'
  }
];

const promises = [
  'To keep communicating, even when things get difficult.',
  'To make room for each other, even when life gets busy.',
  'To celebrate each other’s wins and support each other through the hard days.',
  'To keep learning each other instead of assuming we know everything.',
  'To never stop making the little moments feel special.'
];

function FinalGift({ onRestart, onOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const overlayRef = useRef(null);

  // Scroll to the top when the closing screen is activated.
  useEffect(() => {
    if (isClosing && overlayRef.current) {
      overlayRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [isClosing]);

  const openFinalGift = () => {
    if (isOpen || isClosing) return;

    setIsOpen(true);

    if (onOpened) {
      onOpened();
    }
  };

  const closeWithAnimation = () => {
    if (isClosing) return;

    setIsClosing(true);
  };

  return (
    <motion.div
      ref={overlayRef}
      className="gift-modal-overlay final-gift-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* MAIN GIFT CONTENT */}
      {!isClosing && (
        <motion.div
          className="gift-modal final-gift-modal"
          initial={{ opacity: 0, scale: 0.8, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 25 }}
          transition={{ duration: 0.6 }}
        >
          <button
            className="gift-close"
            onClick={closeWithAnimation}
            aria-label="Close final gift"
          >
            <X size={20} />
          </button>

          {/* BACKGROUND SPARKLES */}
          <div className="final-gift-sparkles">
            {sparkles.map((sparkle) => (
              <motion.span
                key={sparkle.id}
                className="final-floating-sparkle"
                style={{
                  left: sparkle.left,
                  top: sparkle.top,
                  fontSize: sparkle.size
                }}
                animate={{
                  opacity: [0.15, 1, 0.2],
                  scale: [0.5, 1.3, 0.5],
                  rotate: [0, 90, 180],
                  y: [0, -12, 0]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: sparkle.delay,
                  ease: 'easeInOut'
                }}
              >
                ✦
              </motion.span>
            ))}
          </div>

          {/* INTRO */}
          <div className="final-gift-heading">
            <p className="gift-modal-eyebrow">
              <Stars size={14} />
              THE LAST SURPRISE
            </p>

            <h2>
              A thousand <span>tomorrows.</span>
            </h2>

            <p className="final-gift-subtitle">
              Because my favourite part of our story is knowing
              there is still so much left to write.
            </p>
          </div>

          {/* GIFT BOX */}
          <div className="final-gift-stage">
            <motion.div
              className="final-gift-aura"
              animate={{
                scale: isOpen ? [1, 2, 2.7] : [1, 1.12, 1],
                opacity: isOpen ? [0.5, 0.9, 0] : [0.3, 0.65, 0.3]
              }}
              transition={{
                duration: isOpen ? 1.5 : 3,
                repeat: isOpen ? 0 : Infinity
              }}
            />

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="final-gift-light-burst"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0.2, 1.5, 2.7],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </AnimatePresence>

            <motion.div
              className="final-gift-box"
              animate={
                isOpen
                  ? { y: 20, rotate: 0, scale: 1.03 }
                  : { y: [0, -10, 0], rotate: [-1, 1, -1] }
              }
              transition={
                isOpen
                  ? { duration: 0.8 }
                  : {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
              }
            >
              <div className="final-gift-body">
                <div className="final-body-ribbon" />
                <div className="final-gift-inner-glow" />

                <AnimatePresence>
                  {isOpen && (
                    <>
                      <motion.div
                        className="final-gift-heart"
                        initial={{ opacity: 0, scale: 0.2, y: 25 }}
                        animate={{
                          opacity: 1,
                          scale: [0.2, 1.2, 1],
                          y: -100
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 0.45
                        }}
                      >
                        <Heart size={48} fill="currentColor" />
                        <Sparkles size={22} />
                      </motion.div>

                      <motion.div
                        className="final-box-message"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: -45 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        <span>♡</span>
                        <small>ALL MY TOMORROWS</small>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* ANIMATED LID */}
              <motion.div
                className="final-gift-lid"
                animate={
                  isOpen
                    ? {
                        y: -145,
                        x: 35,
                        rotateZ: -22,
                        rotateX: -25,
                        opacity: 0.9
                      }
                    : {
                        y: 0,
                        x: 0,
                        rotateZ: 0,
                        rotateX: 0,
                        opacity: 1
                      }
                }
                transition={{
                  duration: 1.15,
                  ease: [0.2, 0.8, 0.2, 1]
                }}
              >
                <div className="final-lid-ribbon" />

                <motion.div
                  className="final-gift-bow"
                  animate={
                    isOpen
                      ? {
                          y: -65,
                          x: 30,
                          rotate: 40,
                          scale: 0.3,
                          opacity: 0
                        }
                      : {
                          y: 0,
                          x: 0,
                          rotate: 0,
                          scale: 1,
                          opacity: 1
                        }
                  }
                  transition={{ duration: 0.65, delay: 0.15 }}
                >
                  <span className="bow-loop bow-loop-left" />
                  <span className="bow-loop bow-loop-right" />
                  <span className="bow-knot" />
                  <span className="bow-tail bow-tail-left" />
                  <span className="bow-tail bow-tail-right" />
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="final-gift-shadow" />
          </div>

          {/* CONFETTI */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="final-confetti"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {confetti.map((piece) => (
                  <motion.span
                    key={piece.id}
                    className={`confetti-piece confetti-${piece.id % 4}`}
                    style={{ left: piece.left }}
                    initial={{
                      y: -30,
                      rotate: 0,
                      opacity: 1
                    }}
                    animate={{
                      y: 750,
                      rotate: piece.rotation + 360,
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: piece.duration,
                      delay: piece.delay,
                      ease: 'easeIn'
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* OPEN BUTTON OR REVEAL */}
          {!isOpen ? (
            <div className="final-gift-controls">
              <p>One last little surprise is waiting for you.</p>

              <motion.button
                className="gift-action-button final-open-button"
                onClick={openFinalGift}
                whileHover={{
                  scale: 1.07,
                  boxShadow: '0 0 35px rgba(239,169,194,0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Gift size={17} />
                Open our final gift
                <Sparkles size={15} />
              </motion.button>
            </div>
          ) : (
            <motion.div
              className="final-gift-reveal"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <Sparkles size={18} />
              <p>THE BEGINNING OF SOMETHING BEAUTIFUL</p>
              <span>♡</span>
              <p className="final-reveal-caption">
                A little something for all the days still ahead of us.
              </p>
            </motion.div>
          )}

          {/* FUTURE COLLECTION */}
          <AnimatePresence>
            {isOpen && (
              <motion.section
                className="future-letter"
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.1,
                  duration: 0.9,
                  ease: 'easeOut'
                }}
              >
                <div className="future-letter-top">
                  <span>OUR NEXT CHAPTER</span>
                  <Heart size={17} fill="currentColor" />
                </div>

                <h3>
                  So much life <i>left to live.</i>
                </h3>

                <p className="future-letter-intro">
                  These are a few of the things I hope we get
                  to experience, one day at a time.
                </p>

                {/* FUTURE DREAMS */}
                <div className="future-dream-list">
                  {futureDreams.map((dream, index) => (
                    <motion.article
                      className="future-dream-card"
                      key={dream.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.12,
                        duration: 0.6
                      }}
                    >
                      <div className="future-dream-icon">
                        {dream.icon}
                      </div>

                      <div>
                        <span>{dream.label}</span>
                        <h4>{dream.title}</h4>
                        <p>{dream.description}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* TRAVEL WISHLIST */}
                <div className="future-destinations">
                  <div className="future-destinations-heading">
                    <Plane size={19} />
                    <span>OUR LITTLE TRAVEL WISHLIST</span>
                  </div>

                  <h4>Somewhere in the world, with you.</h4>

                  <p className="destination-intro">
                    Three places I hope we get to explore together someday.
                  </p>

                  <div className="destination-grid">
                    {destinations.map((place, index) => (
                      <motion.article
                        className="destination-card"
                        key={place.city}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.15,
                          duration: 0.6
                        }}
                      >
                        <div className={`destination-art destination-art-${index + 1}`}>
                          <Globe2 size={35} strokeWidth={1} />
                          <span>{place.symbol}</span>
                          <small>ONE DAY, TOGETHER</small>
                        </div>

                        <div className="destination-details">
                          <span>{place.country}</span>
                          <h5>{place.city}</h5>
                          <i>{place.caption}</i>
                          <p>{place.memory}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>

                {/* PROMISES */}
                <div className="future-promises">
                  <div className="future-promises-heading">
                    <Flower2 size={19} />
                    <span>A FEW LITTLE PROMISES</span>
                  </div>

                  <h4>Things I want us to keep choosing.</h4>

                  <ul>
                    {promises.map((promise, index) => (
                      <motion.li
                        key={promise}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.5
                        }}
                      >
                        <Heart size={13} fill="currentColor" />
                        {promise}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* FINAL DEDICATION */}
                <div className="future-dedication">
                  <div className="dedication-ornament">
                    <span />
                    <Infinity size={24} />
                    <span />
                  </div>

                  <p className="dedication-small">
                    TO MY FAVOURITE PERSON
                  </p>

                  <h3>
                    Here's to our little story, and all the beautiful
                    chapters still waiting for us. Happy Anniversary,
                    Handsome. ❤️
                  </h3>

                  <div className="dedication-signature">
                    <span>Always yours,</span>
                    <strong>Pamela ♡</strong>
                  </div>

                  <div className="dedication-hearts">
                    <Heart size={15} fill="currentColor" />
                    <Sparkles size={18} />
                    <Heart size={15} fill="currentColor" />
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* BACK BUTTON */}
          <motion.button
            className="gift-action-button final-back-button"
            onClick={closeWithAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to our celebration
            <Heart size={15} />
          </motion.button>
        </motion.div>
      )}

      {/* FULL-SCREEN CLOSING MESSAGE */}
      <AnimatePresence>
        {isClosing && (
          <motion.section
            className="love-goodbye-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="goodbye-heart"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1, 1.15, 1],
                opacity: 1
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut'
              }}
            >
              <Heart size={70} fill="currentColor" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              And this is only the beginning...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              Thank you for being part of my story.

              Here's to more laughter, more memories,
              more adventures and many more months of us.

              <br />
              <br />

              I am so happy it's you, Victory. ❤️
            </motion.p>

            <motion.span
              className="goodbye-signature"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7, duration: 1 }}
            >
              FOREVER YOUR GIRL · PAMELA
            </motion.span>

            <motion.div
              className="goodbye-sparkles"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.9, 1.15, 0.9]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              ✧ &nbsp; ♡ &nbsp; ✧
            </motion.div>

            {/* RETURN TO WELCOME SCREEN */}
            <motion.button
              className="gift-action-button goodbye-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              onClick={onRestart}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={16} fill="currentColor" />
              Back to the beginning
              <Sparkles size={16} />
            </motion.button>

            <motion.span
              className="goodbye-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8 }}
            >
              MADE WITH LOVE, JUST FOR YOU ♡
            </motion.span>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FinalGift;
