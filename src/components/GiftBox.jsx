
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Gift, Sparkles } from 'lucide-react';

function GiftBox({ onClose, onOpened }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBox = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpened();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="gift-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="gift-modal"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="gift-close" onClick={onClose}>
            <X size={20} />
          </button>

          <p className="gift-modal-eyebrow">
            <Sparkles size={13} /> YOUR FIRST SURPRISE
          </p>

          <h2>A little something <span>for you.</span></h2>

          <div className="physical-gift-scene">
            <motion.div
              className="physical-gift"
              animate={isOpen ? { y: 12 } : { y: 0 }}
            >
              <motion.div
                className="gift-lid"
                animate={
                  isOpen
                    ? { rotateX: -115, y: -65, z: 20 }
                    : { rotateX: 0, y: 0, z: 0 }
                }
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                <div className="lid-ribbon" />
                <div className="gift-bow">
                  <span />
                  <span />
                  <i />
                </div>
              </motion.div>

              <div className="gift-box-body">
                <div className="box-ribbon" />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="gift-reveal"
                      initial={{ opacity: 0, y: 25, scale: 0.6 }}
                      animate={{ opacity: 1, y: -35, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    >
                      <Sparkles size={40} />
                      <span>♡</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="gift-shadow" />
          </div>

          {!isOpen ? (
            <>
              <p className="gift-instruction">
                There's something waiting inside.
              </p>
              <motion.button
                className="gift-action-button"
                onClick={openBox}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gift size={16} />
                Untie the ribbon
              </motion.button>
            </>
          ) : (
            <motion.div
              className="gift-open-message"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <p>Your first little surprise is open. ♡</p>
              <button className="gift-action-button" onClick={onClose}>
                Back to the celebration
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GiftBox;
