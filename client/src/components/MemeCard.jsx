import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';
import BidPanel from './BidPanel';
import GlitchPlaceholder from './GlitchPlaceholder';

const MemeCard = ({ meme, onVote, onBid, cardSize }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [currentHighestBid, setCurrentHighestBid] = useState(0);
  const [regenerating, setRegenerating] = useState(false);
  const [localMeme, setLocalMeme] = useState(meme);
  const [voteFlash, setVoteFlash] = useState(null); // 'up' or 'down'
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Listen for bid updates
    socket.on('bid_update', ({ meme_id, highest_bid }) => {
      if (meme_id === meme.id) {
        setCurrentHighestBid(highest_bid);
      }
    });

    // Listen for vote updates
    socket.on('vote_update', ({ meme_id, upvotes }) => {
      if (meme_id === meme.id) {
        meme.upvotes = upvotes;
      }
    });

    return () => {
      socket.off('bid_update');
      socket.off('vote_update');
    };
  }, [socket, meme]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount)) return;

    const credits = parseInt(bidAmount);
    if (credits <= currentHighestBid) {
      alert('Bid must be higher than current highest bid!');
      return;
    }

    onBid(meme.id, credits);
    setBidAmount('');
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const response = await fetch(`http://localhost:3000/api/memes/${meme.id}/caption`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to regenerate caption/vibe');
      const updated = await response.json();
      setLocalMeme({ ...localMeme, caption: updated.caption, vibe: updated.vibe });
    } catch (err) {
      alert('Failed to regenerate caption/vibe.');
    } finally {
      setRegenerating(false);
    }
  };

  const handleVote = async (id, type) => {
    setVoteFlash(type);
    setTimeout(() => setVoteFlash(null), 400);
    await onVote(id, type);
  };

  const cardMaxWidth = cardSize === 'duel' ? 'max-w-md' : 'max-w-xl';
  const imgHeight = cardSize === 'duel' ? 'h-64' : 'h-80';
  const imgMaxHeight = cardSize === 'duel' ? '18rem' : '22rem';
  const imgMinHeight = cardSize === 'duel' ? '12rem' : '16rem';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl border-2 border-cyan-500/40
                 shadow-2xl shadow-cyan-500/30 overflow-hidden transition-all duration-300
                 w-full ${cardMaxWidth} mx-auto
                 ${voteFlash === 'up' ? 'ring-4 ring-cyan-400' : ''}
                 ${voteFlash === 'down' ? 'ring-4 ring-purple-500' : ''}`}
    >
      <div className="relative">
        {localMeme.image_url ? (
          <img
            src={localMeme.image_url}
            alt={localMeme.title}
            className={`w-full ${imgHeight} object-contain bg-black`}
            style={{ maxHeight: imgMaxHeight, minHeight: imgMinHeight, background: '#181a2a' }}
          />
        ) : (
          <GlitchPlaceholder width={cardSize === 'duel' ? 400 : 600} height={cardSize === 'duel' ? 220 : 320} />
        )}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-cyan-400 font-share-tech-mono">
          {localMeme.upvotes} votes
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-orbitron text-cyan-400 mb-2">{localMeme.title}</h3>

        <div className="space-y-2">
          <p className="text-cyan-300 font-share-tech-mono text-sm">{localMeme.caption}</p>
          <p className="text-purple-400 font-share-tech-mono text-xs italic">{localMeme.vibe}</p>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="mt-2 px-3 py-1 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-share-tech-mono rounded shadow hover:from-cyan-400 hover:to-purple-400 transition-all text-xs"
          >
            {regenerating ? 'Regenerating...' : 'Regenerate Caption/Vibe'}
          </button>
          <div className="flex flex-wrap gap-2 mt-2">
            {localMeme.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-cyan-900/50 text-cyan-300 rounded text-xs font-share-tech-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {/* Voting buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote(localMeme.id, 'up')}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white
                       font-orbitron py-2 rounded-lg shadow-lg shadow-cyan-500/20"
            >
              ↑ Upvote
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote(localMeme.id, 'down')}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white
                       font-orbitron py-2 rounded-lg shadow-lg shadow-purple-500/20"
            >
              ↓ Downvote
            </motion.button>
          </div>

          {/* Bidding section */}
          <BidPanel
            memeId={localMeme.id}
            currentHighestBid={localMeme.highest_bid || 0}
            highestBidder={localMeme.highest_bidder}
            onBid={onBid}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;