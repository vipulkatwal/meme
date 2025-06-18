import { useState, useEffect } from 'react';
import { useMemes } from '../hooks/useMemes';
import MemeCard from './MemeCard';
import { motion } from 'framer-motion';

function getRandomPair(memes) {
  if (memes.length < 2) return [null, null];
  const idx1 = Math.floor(Math.random() * memes.length);
  let idx2 = Math.floor(Math.random() * memes.length);
  while (idx2 === idx1) idx2 = Math.floor(Math.random() * memes.length);
  return [memes[idx1], memes[idx2]];
}

const MemeDuel = () => {
  const { memes, voteMeme, bidMeme } = useMemes();
  const [pair, setPair] = useState([null, null]);

  useEffect(() => {
    if (memes.length >= 2) setPair(getRandomPair(memes));
  }, [memes]);

  const handleVote = (id, type) => {
    voteMeme(id, type);
  };

  const handleNextDuel = () => {
    setPair(getRandomPair(memes));
  };

  if (!pair[0] || !pair[1]) return <div className="text-cyan-400 my-16 text-center text-xl font-orbitron">Not enough memes for a duel!</div>;

  return (
    <div className="relative flex flex-col items-center justify-center my-10 sm:my-16 px-2 w-full">
      {/* Animated glowing divider */}
      <div className="w-full h-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 blur-md mb-8 sm:mb-12 animate-pulse" />
      <button
        onClick={handleNextDuel}
        className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-orbitron shadow-lg hover:from-cyan-400 hover:to-purple-400 transition-all text-base sm:text-lg"
      >
        Next Duel
      </button>
      <div className="w-full flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 items-center justify-center">
        <div className="flex-1 flex min-h-[320px] sm:min-h-[420px] max-w-xs sm:max-w-md mx-auto">
          <MemeCard meme={pair[0]} onVote={handleVote} onBid={bidMeme} cardSize="duel" />
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="flex items-center justify-center my-6 md:my-0"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-cyan-400 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-orbitron text-white shadow-2xl drop-shadow-[0_0_32px_#00fff7] animate-vs-glow select-none">
            VS
          </div>
          <style>{`
            @keyframes vs-glow {
              0%, 100% { box-shadow: 0 0 32px #00fff7, 0 0 64px #a855f7; opacity: 0.95; }
              50% { box-shadow: 0 0 64px #a855f7, 0 0 128px #00fff7; opacity: 1; }
            }
            .animate-vs-glow { animation: vs-glow 2.2s infinite alternate; }
          `}</style>
        </motion.div>
        <div className="flex-1 flex min-h-[320px] sm:min-h-[420px] max-w-xs sm:max-w-md mx-auto">
          <MemeCard meme={pair[1]} onVote={handleVote} onBid={bidMeme} cardSize="duel" />
        </div>
      </div>
    </div>
  );
};

export default MemeDuel;