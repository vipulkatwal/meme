import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../App';

const BidPanel = ({ memeId, currentHighestBid = 0, highestBidder, onBid }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(false);
  const prevBid = useRef(currentHighestBid);
  const showToast = useToast();

  useEffect(() => {
    if (currentHighestBid !== prevBid.current) {
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
      prevBid.current = currentHighestBid;
    }
  }, [currentHighestBid]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount)) return;
    const credits = parseInt(bidAmount);
    if (credits <= currentHighestBid) {
      alert('Bid must be higher than current highest bid!');
      return;
    }
    setLoading(true);
    Promise.resolve(onBid(memeId, credits)).then(() => {
      // Funny toast
      const messages = [
        'Bid placed! You just flexed your meme wallet.',
        'You just outbid a crypto bro.',
        'Bidding war initiated. May the best meme win!',
        'Your credits are now in meme battle mode!',
        'Bid successful! You just became a meme investor.',
        'Meme market manipulation in progress...',
        'You just made it rain on this meme! 💰',
        'Bid deployed! The meme economy thanks you.',
        'You just bought the dip on this meme.',
        'Bid registered! Meme is now appreciating in value.',
        'You just became a meme whale! 🐋',
        'Bid successful! The meme gods are counting your money.',
        'You just made this meme go to the moon! 🚀',
        'Bid placed! Meme is now diamond hands certified.',
        'You just became a meme market maker!'
      ];
      showToast(messages[Math.floor(Math.random() * messages.length)], 'bid');
    }).finally(() => setLoading(false));
    setBidAmount('');
  };

  return (
    <div className="bg-gray-800/50 p-3 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          animate={flash ? { scale: 1.15, backgroundColor: '#22d3ee' } : { scale: 1, backgroundColor: '#0f172a' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="px-3 py-1 rounded-lg font-share-tech-mono text-cyan-300 text-sm font-bold shadow"
        >
          Current Highest Bid: {currentHighestBid} credits
        </motion.div>
        {highestBidder && (
          <div className="flex items-center gap-2 bg-cyan-900/40 px-2 py-1 rounded-lg">
            <img src={highestBidder.avatar} alt={highestBidder.name} className="w-7 h-7 rounded-full border border-cyan-400 shadow" />
            <span className="text-cyan-200 font-share-tech-mono text-xs">{highestBidder.name}</span>
          </div>
        )}
      </div>
      <form onSubmit={handleBidSubmit} className="flex gap-2">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount..."
          className="flex-1 bg-gray-700/50 border border-cyan-500/30 rounded px-3 py-2
                   text-cyan-100 focus:outline-none focus:border-cyan-400"
          min={currentHighestBid + 1}
          disabled={loading}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white
                   font-orbitron px-4 py-2 rounded-lg shadow-lg shadow-cyan-500/20 disabled:opacity-60"
        >
          {loading ? 'Bidding...' : 'Bid'}
        </motion.button>
      </form>
    </div>
  );
};

export default BidPanel;