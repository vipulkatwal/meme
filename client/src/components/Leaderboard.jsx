import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabaseClient';
import { socket } from '../services/socketClient';

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [topBidders, setTopBidders] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopMemes();
    // Real-time updates
    socket.on('bid_update', fetchTopMemes);
    socket.on('vote_update', fetchTopMemes);
    return () => {
      socket.off('bid_update', fetchTopMemes);
      socket.off('vote_update', fetchTopMemes);
    };
  }, []);

  const fetchTopMemes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .order('upvotes', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTopMemes(data);

      // For each meme, fetch its top bidder
      const bidders = {};
      await Promise.all(
        data.map(async (meme) => {
          const { data: bids } = await supabase
            .from('bids')
            .select('user_id, user_name, user_avatar, credits')
            .eq('meme_id', meme.id)
            .order('credits', { ascending: false })
            .limit(1);
          if (bids && bids.length > 0) {
            bidders[meme.id] = bids[0];
          }
        })
      );
      setTopBidders(bidders);
    } catch (error) {
      console.error('Error fetching top memes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/30">
        <p className="text-cyan-400 font-orbitron text-sm">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm p-2 rounded-xl border border-cyan-500/30 w-full"
    >
      <h2 className="text-xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300 drop-shadow-[0_0_24px_#00fff7] glitch mb-2 tracking-wider text-center">
        TOP MEMES
      </h2>

      <div className="space-y-2">
        {topMemes.map((meme, index) => {
          const bidder = topBidders[meme.id];
          return (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className={`flex flex-col gap-1.5 p-2 rounded-lg bg-gray-800/70 hover:bg-gray-800/90 transition-colors duration-200 border border-cyan-500/20 ${index < 3 ? 'ring-1 ring-cyan-400/60' : ''}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white font-orbitron text-sm ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-400 to-cyan-400' :
                  index === 1 ? 'bg-gradient-to-r from-cyan-400 to-purple-400' :
                  index === 2 ? 'bg-gradient-to-r from-purple-400 to-cyan-400' :
                  'bg-gradient-to-r from-cyan-500 to-purple-600'
                }`}>{index + 1}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-cyan-200 font-orbitron text-sm leading-tight">{meme.title}</h3>
                  <span className="text-cyan-400/80 font-share-tech-mono text-xs">{meme.upvotes} votes</span>
                </div>
              </div>
              <div className="flex items-center gap-2 min-h-[24px]">
                {bidder ? (
                  <div className="flex items-center gap-2 bg-cyan-900/60 px-2 py-0.5 rounded-md border border-cyan-500/30 w-full">
                    <img src={bidder.user_avatar} alt={bidder.user_name} className="w-5 h-5 rounded-full border border-cyan-400" />
                    <span className="text-cyan-200 font-share-tech-mono text-xs">{bidder.user_name}</span>
                    <span className="text-purple-300 font-orbitron text-xs ml-auto">{bidder.credits} cr</span>
                  </div>
                ) : (
                  <span className="text-cyan-500/60 font-share-tech-mono text-xs ml-2">No bids</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Leaderboard;