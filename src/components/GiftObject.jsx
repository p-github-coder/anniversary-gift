
import { motion } from 'framer-motion';
import { Gift, Mail, Sparkles, LockKeyhole, Check } from 'lucide-react';

function GiftObject({ type, title, subtitle, locked, opened, onClick, index }) {
  const icons = {
    box: <Gift size={55} strokeWidth={1} />,
    letter: <Mail size={55} strokeWidth={1} />,
    surprise: <Sparkles size={55} strokeWidth={1} />,
    final: <HeartIcon />
  };

  return (
    <motion.button
      className={`gift-object gift-${type}`}
      onClick={onClick}
      disabled={locked}
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      whileHover={locked ? {} : { y: -10, scale: 1.04 }}
      whileTap={locked ? {} : { scale: 0.96 }}
    >
      <span className="gift-status">
        {locked ? (
          <><LockKeyhole size={12} /> LOCKED</>
        ) : opened ? (
          <><Check size={12} /> OPENED</>
        ) : (
          <><Sparkles size={12} /> OPEN ME</>
        )}
      </span>

      <span className="gift-art">
        {icons[type]}
      </span>

      <span className="gift-title">{title}</span>
      <span className="gift-subtitle">{subtitle}</span>
    </motion.button>
  );
}

function HeartIcon() {
  return <Sparkles size={55} strokeWidth={1} />;
}

export default GiftObject;
