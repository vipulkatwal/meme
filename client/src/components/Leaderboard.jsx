import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopMemes();
  }, []);

  const fetchTopMemes = async () => {
    try {
      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .order('upvotes', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTopMemes(data);
    } catch (error) {
      console.error('Error fetching top memes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30">
        <p className="text-cyan-400 font-orbitron">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30"
    >
      <h2 className="text-2xl font-orbitron text-cyan-400 mb-4 tracking-wider">
        TOP MEMES
      </h2>

      <div className="space-y-3">
        {topMemes.map((meme, index) => (
          <motion.div
            key={meme.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50
                     hover:bg-gray-800/70 transition-colors duration-200"
          >
            <div className="w-8 h-8 flex items-center justify-center
                          bg-gradient-to-r from-cyan-500 to-purple-600
                          rounded-full text-white font-orbitron">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-cyan-300 font-share-tech-mono truncate">
                {meme.title}
              </h3>
              <p className="text-cyan-400/70 text-sm font-share-tech-mono">
                {meme.upvotes} votes
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Leaderboard;