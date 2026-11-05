
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Heart,
  Sparkles,
  Mail,
  Feather
} from 'lucide-react';

function Envelope({ onClose, onOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);

  const openEnvelope = () => {
    if (isOpen) return;

    setIsOpen(true);
    onOpened();

    // Give the envelope time to open before showing the letter.
    setTimeout(() => {
      setLetterVisible(true);
    }, 1100);
  };

  return (
    <motion.div
      className="gift-modal-overlay letter-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`gift-modal love-letter-modal ${letterVisible ? 'letter-is-visible' : ''}`}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.5 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="gift-close"
          onClick={onClose}
          aria-label="Close letter"
        >
          <X size={20} />
        </button>

        <p className="gift-modal-eyebrow letter-eyebrow">
          <Heart size={13} fill="currentColor" />
          GIFT TWO · WORDS FROM MY HEART
        </p>

        {!isOpen ? (
          <>
            <h2>
              Something I've been <span>meaning to tell you.</span>
            </h2>

            <p className="letter-intro">
              A little letter, written with you in mind.
            </p>
          </>
        ) : (
          <h2 className="opened-letter-heading">
            To my <span>handsome Victory.</span>
          </h2>
        )}

        {/* ENVELOPE */}
        <div className="real-envelope-scene">
          <motion.div
            className="real-envelope"
            animate={
              isOpen
                ? { y: 45, scale: 0.86 }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 0.8 }}
          >
            <div className="real-envelope-back" />

            <motion.div
              className="real-letter-paper"
              animate={
                isOpen
                  ? {
                      y: -145,
                      opacity: 1,
                      scale: 1.05
                    }
                  : {
                      y: 0,
                      opacity: 1,
                      scale: 1
                    }
              }
              transition={{
                duration: 1,
                delay: isOpen ? 0.25 : 0,
                ease: 'easeInOut'
              }}
            >
              <Heart size={24} fill="currentColor" />
              <span>For you, with love</span>
            </motion.div>

            <div className="real-envelope-front">
              <div className="real-envelope-left" />
              <div className="real-envelope-right" />
              <div className="real-envelope-bottom" />
            </div>

            <motion.div
              className="real-envelope-flap"
              animate={
                isOpen
                  ? { rotateX: 180 }
                  : { rotateX: 0 }
              }
              transition={{ duration: 0.75 }}
            />

            <motion.div
              className="real-wax-seal"
              animate={
                isOpen
                  ? {
                      scale: 0,
                      opacity: 0,
                      rotate: 90
                    }
                  : {
                      scale: 1,
                      opacity: 1,
                      rotate: 0
                    }
              }
              transition={{ duration: 0.35 }}
            >
              <Heart size={19} fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>

        {!isOpen ? (
          <div className="letter-controls">
            <p className="gift-instruction">
              There's something special inside, just for you.
            </p>

            <motion.button
              className="gift-action-button"
              onClick={openEnvelope}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              Open your letter
            </motion.button>
          </div>
        ) : (
          <AnimatePresence>
            {letterVisible && (
              <motion.div
                className="actual-love-letter"
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.96
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut'
                }}
              >
                <div className="letter-paper-decoration">
                  <Feather size={18} />
                  <span>OCTOBER 6, 2026</span>
                </div>

                <h3>My dearest Victory,</h3>

                <div className="letter-body">
                  <p>
                    Happy one month anniversary, handsome. ❤️
                  </p>

                  <p>
                    I honestly don't think a month is enough time
                    to explain just how happy I am that our paths
                    crossed. When I think about how our story
                    started, from student and teacher, to friends,
                    and then to us, I can't help but smile. It is
                    such a beautiful thing to look back on.
                  </p>

                  <p>
                    I want you to know that I appreciate you.
                    I appreciate the person you are, the way you
                    make me smile, the conversations we share,
                    and all the little moments that make being
                    with you special.
                  </p>

                  <p>
                    I love how someone can become such an
                    important part of your everyday life without
                    you even realising how much space they've
                    taken up in your heart. Somehow, you've become
                    one of my favourite parts of my days.
                  </p>

                  <p>
                    I adore the little things about us: the calls,
                    the laughter, the sweet words, the random
                    conversations, and even the moments when
                    we're simply being ourselves. I love that
                    we're learning each other and creating
                    memories, one little moment at a time.
                  </p>

                  <p>
                    Even with the distance between us, I'm
                    grateful that we get to share something
                    meaningful. I hope we continue to choose
                    each other, communicate honestly, grow
                    together, laugh together, and make each
                    other feel appreciated.
                  </p>

                  <p>
                    I hope we get to experience so many beautiful
                    things together. More memories, more firsts,
                    more laughter, more adventures, and many
                    more months to celebrate.
                  </p>

                  <p>
                    Thank you for being part of my life and for
                    giving me a reason to smile at my phone.
                    I'm genuinely happy that it's you.
                  </p>

                  <p>
                    This is only our first month, and I can't
                    wait to see all the lovely things still
                    waiting for us.
                  </p>
                </div>

                <div className="letter-signature">
                  <span>With all my love,</span>
                  <strong>Your girl, Pamela ♡</strong>
                </div>

                <div className="letter-bottom-heart">
                  <Heart size={17} fill="currentColor" />
                  <Sparkles size={15} />
                  <Heart size={17} fill="currentColor" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {letterVisible && (
          <motion.button
            className="gift-action-button letter-back-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
          >
            Back to our celebration
            <Heart size={15} />
          </motion.button>
        )}

      </motion.div>
    </motion.div>
  );
}

export default Envelope;
