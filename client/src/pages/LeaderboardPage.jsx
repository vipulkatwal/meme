import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { mockUsers } from '../utils/userId';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/memes/leaderboard/bids`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      }
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center text-5xl md:text-6xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300 drop-shadow-[0_0_24px_#00fff7] glitch mb-12 mt-6 tracking-wider"
      >
        Leaderboard
      </motion.h1>
      <div className="bg-cyan-900/60 backdrop-blur-md rounded-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 p-8">
        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="text-cyan-300 text-center py-8 font-orbitron text-xl">Loading...</div>
          ) : leaderboard.length === 0 ? (
            <div className="text-cyan-300 text-center py-8 font-orbitron text-xl">No bids yet!</div>
          ) : leaderboard.map((user, i) => (
            <motion.div
              key={user.user_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`flex items-center gap-5 p-4 rounded-xl bg-gray-900/60 border border-cyan-500/20 shadow-lg ${i === 0 ? 'ring-4 ring-cyan-400/60' : ''}`}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400 shadow">
                <img src={user.user_avatar} alt={user.user_name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-orbitron text-xl text-cyan-200 truncate">{user.user_name}</span>
                  {i === 0 && <span className="ml-2 px-2 py-0.5 rounded bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold text-xs animate-pulse">TOP</span>}
                </div>
                <div className="text-cyan-400/80 font-share-tech-mono text-sm mt-1">{user.user_id}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-orbitron text-lg text-cyan-300">{user.total_credits} <span className="text-xs font-share-tech-mono text-cyan-400/70">credits</span></span>
                <span className="font-orbitron text-base text-purple-300">{user.total_bids} <span className="text-xs font-share-tech-mono text-purple-400/70">bids</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;