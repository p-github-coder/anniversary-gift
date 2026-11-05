
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Heart,
  Sparkles,
  CalendarDays,
  BookHeart,
  Phone,
  MessageCircleHeart,
  ChevronDown
} from 'lucide-react';

import '../styles/timeline.css';

const timelineEvents = [
  {
    id: 1,
    date: '09 JULY 2026',
    title: 'The day we met',
    description:
      'A seemingly ordinary day that became the beginning of a story I never knew I would treasure this much.',
    icon: <Sparkles size={19} />,
    label: 'THE BEGINNING'
  },
  {
    id: 2,
    date: '10 JULY 2026',
    title: 'Where it all began',
    description:
      'The day our classes began. Little did we know that this was the start of something that would become so much more.',
    icon: <BookHeart size={19} />,
    label: 'OUR FIRST CHAPTER'
  },
  {
    id: 3,
    date: 'SOMEWHERE ALONG THE WAY',
    title: 'From student-teacher to friends to lovers',
    description:
      'Somewhere between the lessons, conversations and getting to know each other, things changed. We went from student and teacher, to friends, and eventually, to something much sweeter.',
    icon: <Heart size={19} />,
    label: 'OUR STORY'
  },
  {
    id: 4,
    date: '06 OCTOBER 2026',
    title: 'The day we became us',
    description:
      'The day we officially started our relationship. The beginning of my favourite little adventure with you.',
    icon: <Heart size={19} />,
    label: 'OUR ANNIVERSARY DATE',
    featured: true
  }
];

const specialMemories = [
  {
    id: 1,
    title: 'Our first love call',
    description:
      'One of those moments that deserves a special place in our story.',
    icon: <Phone size={20} />
  },
  {
    id: 2,
    title: 'Our first “I love you”',
    description:
      'Three little words that made an already special connection feel even more meaningful.',
    icon: <MessageCircleHeart size={20} />
  }
];

function TimelineGift({ onClose, onOpened }) {
  const [expandedEvent, setExpandedEvent] = useState(1);
  const [showMemories, setShowMemories] = useState(false);

  const toggleEvent = (id) => {
    setExpandedEvent(current => current === id ? null : id);
  };

  return (
    <motion.div
      className="gift-modal-overlay timeline-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="gift-modal timeline-modal"
        initial={{ opacity: 0, y: 35, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 25, scale: 0.94 }}
        transition={{ duration: 0.5 }}
        onClick={event => event.stopPropagation()}
      >
        <button
          className="gift-close"
          onClick={onClose}
          aria-label="Close timeline"
        >
          <X size={20} />
        </button>

        <div className="timeline-decoration">
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ♡
          </motion.span>
          <Sparkles size={15} />
          <span>♡</span>
        </div>

        <p className="gift-modal-eyebrow">
          <Heart size={13} fill="currentColor" />
          GIFT ONE · A LITTLE LOOK BACK
        </p>

        <h2 className="timeline-heading">
          Our little <span>timeline.</span>
        </h2>

        <p className="timeline-intro">
          Every beautiful story has a beginning.
          Here's a little look at ours.
        </p>

        <div className="timeline-date-pill">
          <CalendarDays size={14} />
          JULY 09 — OCTOBER 06, 2026
        </div>

        <div className="timeline-list">
          {timelineEvents.map((item, index) => {
            const isExpanded = expandedEvent === item.id;

            return (
              <motion.div
                key={item.id}
                className={`timeline-event ${item.featured ? 'timeline-featured' : ''}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="timeline-rail">
                  <motion.div
                    className="timeline-marker"
                    animate={
                      item.featured
                        ? {
                            boxShadow: [
                              '0 0 0 0 #efa9c200',
                              '0 0 0 10px #efa9c222',
                              '0 0 0 0 #efa9c200'
                            ]
                          }
                        : {}
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity
                    }}
                  >
                    {item.icon}
                  </motion.div>

                  {index !== timelineEvents.length - 1 && (
                    <div className="timeline-connector" />
                  )}
                </div>

                <div className="timeline-event-content">
                  <button
                    className="timeline-event-button"
                    onClick={() => toggleEvent(item.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="timeline-event-label">
                      {item.label}
                    </span>

                    <span className="timeline-event-date">
                      {item.date}
                    </span>

                    <span className="timeline-event-title">
                      {item.title}
                    </span>

                    <span className="timeline-expand">
                      <ChevronDown
                        size={16}
                        className={isExpanded ? 'chevron-open' : ''}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="timeline-event-description"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <p>{item.description}</p>
                        <span className="timeline-little-heart">♡</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="timeline-memories">
          <button
            className="timeline-memories-toggle"
            onClick={() => setShowMemories(!showMemories)}
            aria-expanded={showMemories}
          >
            <span>
              <Sparkles size={16} />
              A few moments I'll always remember
            </span>

            <ChevronDown
              size={17}
              className={showMemories ? 'chevron-open' : ''}
            />
          </button>

          <AnimatePresence initial={false}>
            {showMemories && (
              <motion.div
                className="timeline-memory-list"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {specialMemories.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    className="timeline-memory-card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12 }}
                  >
                    <div className="timeline-memory-icon">
                      {memory.icon}
                    </div>

                    <div>
                      <h3>{memory.title}</h3>
                      <p>{memory.description}</p>
                    </div>

                    <Heart
                      size={15}
                      className="timeline-memory-heart"
                      fill="currentColor"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="timeline-ending"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>AND THIS IS ONLY THE BEGINNING</span>
          <Heart size={20} fill="currentColor" />
          <p>I'm so glad our paths crossed.</p>
        </motion.div>

        <div className="timeline-button-container">
  <button
    type="button"
    className="gift-action-button timeline-done-button"
    onClick={() => {
      onOpened();
      onClose();
    }}
  >
    Back to our celebration
    <Heart size={15} />
  </button>
</div>
      </motion.div>
    </motion.div>
  );
}

export default TimelineGift;
