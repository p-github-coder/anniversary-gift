
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Sparkles,
  Heart,
  Stars,
  LockKeyhole
} from 'lucide-react';

import '../styles/gifts.css';

const cards = [
  {
    id: 1,
    title: 'My favourite person',
    message: 'Out of all the people in the world, you are the one I am happiest to call mine.',
    icon: '♡'
  },
  {
    id: 2,
    title: 'My safe place',
    message: 'Someone I can be myself with, feel comfortable around, and always look forward to talking to.',
    icon: '⌂'
  },
  {
    id: 3,
    title: 'My biggest distraction',
    message: 'Because somehow, even when I have a hundred things to do, you still find your way into my thoughts.',
    icon: '✧'
  },
  {
    id: 4,
    title: 'My answered prayer',
    message: 'A beautiful reminder that sometimes life brings you someone you never knew you needed.',
    icon: '♡'
  },
  {
    id: 5,
    title: 'My favourite notification',
    message: 'That little excitement I get when your name lights up my screen. Yes, it is always you.',
    icon: '✉'
  },
  {
    id: 6,
    title: 'My handsome headache',
    message: 'You know exactly how to make me smile, roll my eyes, and smile again. I would not trade it.',
    icon: '♡'
  },
  {
    id: 7,
    title: 'My personal happiness',
    message: 'You have a way of making ordinary moments feel a little brighter and my days a little sweeter.',
    icon: '☼'
  },
  {
    id: 8,
    title: 'My favourite human',
    message: 'Not because you are perfect, but because you are you, and that is someone I am glad to know.',
    icon: '♡'
  },
  {
    id: 9,
    title: 'My sweetest blessing',
    message: 'I am genuinely grateful that our paths crossed and that we get to share this little story.',
    icon: '✧'
  },
  {
    id: 10,
    title: 'My forever crush',
    message: 'One month in and you are still the handsome boy I cannot help but adore.',
    icon: '♥'
  }
];

function ScratchTile({ card, onReveal, isRevealed }) {
  const canvasRef = useRef(null);
  const isScratching = useRef(false);

  useEffect(() => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(
      0, 0, canvas.width, canvas.height
    );

    gradient.addColorStop(0, '#fff0f6');
    gradient.addColorStop(0.45, '#e995b6');
    gradient.addColorStop(1, '#bd718f');

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#713d56';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(
      'SCRATCH TO REVEAL',
      canvas.width / 2,
      canvas.height / 2 - 5
    );

    ctx.font = '25px serif';
    ctx.fillText(
      '✧  ♡  ✧',
      canvas.width / 2,
      canvas.height / 2 + 29
    );
  }, [isRevealed]);

  const scratch = (event) => {
    if (!isScratching.current || isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 38;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 19, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);

    const pixels = ctx.getImageData(
      0, 0, canvas.width, canvas.height
    ).data;

    let erased = 0;
    const total = canvas.width * canvas.height;

    // Sample pixels rather than checking every single pixel.
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 100) erased++;
    }

    const percentage = erased / (total / 4);

    if (percentage >= 0.42) {
      isScratching.current = false;
      onReveal(card.id);
    }
  };

  const handlePointerDown = (event) => {
    if (isRevealed) return;

    isScratching.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    scratch(event);
  };

  const stopScratching = () => {
    isScratching.current = false;
  };

  return (
    <motion.article
      className={`who-card ${isRevealed ? 'who-card-revealed' : ''}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="who-card-number">
        <span>0{card.id}</span>
        <Heart size={12} />
      </div>

      <div className="who-card-inner">
        <div className="who-card-message">
          <span className="who-card-icon">{card.icon}</span>
          <h3>{card.title}</h3>
          <p>{card.message}</p>
          <span className="who-card-little-heart">♡</span>
        </div>

        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="who-scratch-canvas"
            width={280}
            height={190}
            onPointerDown={handlePointerDown}
            onPointerMove={scratch}
            onPointerUp={stopScratching}
            onPointerCancel={stopScratching}
          />
        )}
      </div>

      <div className="who-card-footer">
        {isRevealed ? (
          <>
            <Heart size={11} fill="currentColor" />
            REVEALED WITH LOVE
          </>
        ) : (
          <>
            <Sparkles size={11} />
            A LITTLE MESSAGE FOR YOU
          </>
        )}
      </div>
    </motion.article>
  );
}

function ScratchCard({ onClose, onOpened }) {
  const [revealedCards, setRevealedCards] = useState([]);
  const hasCompleted = useRef(false);

  const progress = revealedCards.length;

  useEffect(() => {
    if (progress === cards.length && !hasCompleted.current) {
      hasCompleted.current = true;
      onOpened();
    }
  }, [progress, onOpened]);

  const revealCard = (id) => {
    setRevealedCards((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  return (
    <motion.div
      className="gift-modal-overlay who-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="gift-modal who-modal"
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 25 }}
        transition={{ duration: 0.5 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="gift-close"
          onClick={onClose}
          aria-label="Close scratch cards"
        >
          <X size={20} />
        </button>

        <div className="who-heading-decoration">
          <Sparkles size={17} />
          <Heart size={21} fill="currentColor" />
          <Sparkles size={17} />
        </div>

        <p className="gift-modal-eyebrow">
          <Stars size={13} />
          GIFT THREE · A LITTLE REMINDER
        </p>

        <h2>
          Who you are <span>to me.</span>
        </h2>

        <p className="who-intro">
          Ten little reminders of how special you are to me.
          Scratch each card and discover what's underneath.
        </p>

        <div className="who-progress">
          <div className="who-progress-top">
            <span>YOUR LITTLE LOVE COLLECTION</span>
            <strong>{progress} / 10</strong>
          </div>

          <div className="who-progress-track">
            <motion.div
              className="who-progress-fill"
              animate={{ width: `${progress * 10}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="who-card-grid">
          {cards.map((card) => (
            <ScratchTile
              key={card.id}
              card={card}
              isRevealed={revealedCards.includes(card.id)}
              onReveal={revealCard}
            />
          ))}
        </div>

        <AnimatePresence>
          {progress === cards.length && (
            <motion.div
              className="who-complete-message"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="who-complete-hearts">
                <Heart fill="currentColor" size={24} />
                <Sparkles size={20} />
                <Heart fill="currentColor" size={24} />
              </div>

              <h3>You are all of these things and more.</h3>
              <p>
                And I hope you never forget just how special
                you are to me, Victory.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="gift-action-button who-back-button"
          onClick={onClose}
        >
          Back to our celebration
          <Heart size={15} />
        </button>

        {progress < cards.length && (
          <p className="who-bottom-note">
            <LockKeyhole size={11} />
            Reveal all ten to complete this surprise.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ScratchCard;
