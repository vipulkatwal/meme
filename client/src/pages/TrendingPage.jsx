import { useState } from 'react';
import { motion } from 'framer-motion';
import MemeCard from '../components/MemeCard';
import Leaderboard from '../components/Leaderboard';
import { useMemes } from '../hooks/useMemes';

const TrendingPage = () => {
  const { memes, loading, voteMeme, bidMeme } = useMemes();
  const [search, setSearch] = useState('');

  // Filter memes by search
  const filteredMemes = memes.filter(meme => {
    const q = search.toLowerCase();
    return (
      meme.title.toLowerCase().includes(q) ||
      (meme.tags && meme.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="relative max-w-7xl mx-auto px-2 md:px-6 pb-24">
      {/* Glowing section heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center text-5xl md:text-6xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300 drop-shadow-[0_0_24px_#00fff7] glitch mb-10 mt-10 tracking-wider"
      >
        Trending Memes
      </motion.h1>

      {/* Sticky, glassy search bar */}
      <div className="sticky top-4 z-30 mb-10 flex justify-center">
        <div className="w-full max-w-2xl bg-cyan-900/60 backdrop-blur-md rounded-xl border border-cyan-400/30 shadow-lg shadow-cyan-500/10 px-6 py-4 flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search memes by title or tag..."
            className="flex-1 bg-transparent border-none outline-none text-cyan-100 font-share-tech-mono text-lg placeholder-cyan-400"
          />
          <span className="text-cyan-400/70 font-orbitron text-base">🔍</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 blur-sm mb-10" />

      <section id="marketplace">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-12">
            {loading ? (
              <div className="text-center text-cyan-400 font-orbitron text-2xl py-24 animate-pulse">
                Loading memes...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredMemes.map(meme => (
                  <MemeCard
                    key={meme.id}
                    meme={meme}
                    onVote={voteMeme}
                    onBid={bidMeme}
                  />
                ))}
                {filteredMemes.length === 0 && (
                  <div className="col-span-2 text-center text-cyan-400 font-orbitron text-xl py-20">No memes found.</div>
                )}
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1" id="leaderboard">
            <div className="sticky top-24">
              <Leaderboard />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-purple-400/0 via-purple-400/40 to-purple-400/0 blur-sm mt-16 mb-10" />

      {/* About Section */}
      <section id="about" className="mt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="inline-block px-8 py-6 rounded-2xl bg-cyan-900/60 border border-cyan-400/30 shadow-xl shadow-cyan-500/20 backdrop-blur-md"
        >
          <h2 className="text-2xl md:text-3xl font-orbitron text-cyan-300 mb-2 tracking-wider">About MemeHustle</h2>
          <p className="text-cyan-200 font-share-tech-mono text-lg max-w-2xl mx-auto">
            This is a <span className="text-purple-400 font-bold">cyberpunk meme marketplace</span> demo project. Built with <span className="text-cyan-400 font-bold">React</span>, <span className="text-cyan-400 font-bold">Supabase</span>, <span className="text-cyan-400 font-bold">Socket.IO</span>, and <span className="text-cyan-400 font-bold">Gemini AI</span>.<br/>
            <span className="text-cyan-400/70">Buy, sell, and bid on memes in real time. Experience the future of meme trading.</span>
          </p>
        </motion.div>
      </section>

      {/* Subtle animated background effect */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-400/10 to-transparent blur-2xl" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-400/10 to-transparent blur-2xl" />
      </div>
    </div>
  );
};

export default TrendingPage;