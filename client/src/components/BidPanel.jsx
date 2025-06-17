import { useState } from 'react';
import { motion } from 'framer-motion';

const BidPanel = ({ memeId, currentHighestBid = 0, onBid }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount)) return;
    const credits = parseInt(bidAmount);
    if (credits <= currentHighestBid) {
      alert('Bid must be higher than current highest bid!');
      return;
    }
    onBid(memeId, credits);
    setBidAmount('');
  };

  return (
    <div className="bg-gray-800/50 p-3 rounded-lg">
      <p className="text-cyan-300 font-share-tech-mono text-sm mb-2">
        Current Highest Bid: {currentHighestBid} credits
      </p>
      <form onSubmit={handleBidSubmit} className="flex gap-2">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount..."
          className="flex-1 bg-gray-700/50 border border-cyan-500/30 rounded px-3 py-2
                   text-cyan-100 focus:outline-none focus:border-cyan-400"
          min={currentHighestBid + 1}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white
                   font-orbitron px-4 py-2 rounded-lg shadow-lg shadow-cyan-500/20"
        >
          Bid
        </motion.button>
      </form>
    </div>
  );
};

export default BidPanel;