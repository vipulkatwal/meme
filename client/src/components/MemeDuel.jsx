import { useState, useEffect } from 'react';
import { useMemes } from '../hooks/useMemes';
import MemeCard from './MemeCard';

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
    setPair(getRandomPair(memes));
  };

  if (!pair[0] || !pair[1]) return <div className="text-cyan-400">Not enough memes for a duel!</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center my-8">
      <div className="flex-1">
        <MemeCard meme={pair[0]} onVote={handleVote} onBid={bidMeme} />
      </div>
      <div className="text-4xl font-orbitron text-cyan-400">VS</div>
      <div className="flex-1">
        <MemeCard meme={pair[1]} onVote={handleVote} onBid={bidMeme} />
      </div>
    </div>
  );
};

export default MemeDuel;