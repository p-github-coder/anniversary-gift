
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Welcome from './pages/Welcome';
import GiftRoom from './pages/GiftRoom';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  const handleRestart = () => {
    setHasEntered(false);
  };

  return (
    <AnimatePresence mode="wait">
      {!hasEntered ? (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7 }}
        >
          <Welcome onEnter={handleEnter} />
        </motion.div>
      ) : (
        <motion.div
          key="gift-room"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8 }}
        >
          <GiftRoom onRestart={handleRestart} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
