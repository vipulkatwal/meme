import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MemeForm from './components/MemeForm';
import MemeCard from './components/MemeCard';
import Leaderboard from './components/Leaderboard';
import { useMemes } from './hooks/useMemes';
import MemeDuel from './components/MemeDuel';
import HackerHUD from './components/HackerHUD';

function App() {
  const { memes, loading, createMeme, voteMeme, bidMeme } = useMemes();
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [search, setSearch] = useState('');
  const subtitle = 'The Future of Meme Trading';

  useEffect(() => {
    let i = 0;
    setTypedSubtitle('');
    const interval = setInterval(() => {
      setTypedSubtitle((prev) => prev + subtitle[i]);
      i++;
      if (i >= subtitle.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Filter memes by search
  const filteredMemes = memes.filter(meme => {
    const q = search.toLowerCase();
    return (
      meme.title.toLowerCase().includes(q) ||
      (meme.tags && meme.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <HackerHUD />
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron text-transparent bg-clip-text
                       bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
            MEMEHUSTLE
          </h1>
          <p className="text-cyan-300 font-share-tech-mono glitch" style={{ minHeight: 28 }}>
            {typedSubtitle}
            <span className="animate-pulse">|</span>
          </p>
        </motion.header>

        <MemeDuel />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            <MemeForm onSubmit={createMeme} />

            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search memes by title or tag..."
                className="w-full bg-gray-800/50 border border-cyan-500/30 rounded px-4 py-2 text-cyan-100 font-share-tech-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
              />
            </div>

            {loading ? (
              <div className="text-center text-cyan-400 font-orbitron">
                Loading memes...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMemes.map(meme => (
                  <MemeCard
                    key={meme.id}
                    meme={meme}
                    onVote={voteMeme}
                    onBid={bidMeme}
                  />
                ))}
                {filteredMemes.length === 0 && (
                  <div className="col-span-2 text-center text-cyan-400 font-orbitron">No memes found.</div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;