import { motion } from 'framer-motion';
import { FaGithub, FaRobot, FaBolt, FaUserSecret } from 'react-icons/fa';

const techStack = [
  { name: 'React', icon: <FaBolt className="text-cyan-400 text-2xl" /> },
  { name: 'Supabase', icon: <FaRobot className="text-purple-400 text-2xl" /> },
  { name: 'Socket.IO', icon: <FaBolt className="text-yellow-400 text-2xl" /> },
  { name: 'Gemini AI', icon: <FaRobot className="text-pink-400 text-2xl" /> },
];

const AboutPage = () => (
  <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-cyan-950/90 via-gray-950/95 to-purple-950/90 overflow-hidden">
    {/* Animated Glitchy Hero Heading */}
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-6xl md:text-8xl font-orbitron text-cyan-400 mb-8 glitch drop-shadow-[0_0_32px_#00fff7] text-center tracking-widest"
    >
      About MemeHustle
    </motion.h1>
    {/* Short Story Card */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
      className="max-w-2xl w-full bg-cyan-900/60 border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-500/30 backdrop-blur-md p-8 mb-12 text-center"
    >
      <p className="text-cyan-200 font-share-tech-mono text-xl md:text-2xl mb-4">
        <span className="text-purple-400 font-bold">MemeHustle</span> is a next-gen cyberpunk meme marketplace where memes are more than just jokes—they're digital assets, social currency, and a battleground for internet glory.
      </p>
      <p className="text-cyan-300 font-orbitron text-lg mb-2">
        Buy, sell, and bid on memes in real time. Let AI generate captions and vibes. Compete for the leaderboard. Experience the future of meme trading.
      </p>
      <p className="text-cyan-400/70 font-share-tech-mono text-base">
        Born from a love of memes, tech, and a little bit of chaos.
      </p>
    </motion.div>
    {/* Tech Stack Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center mb-16"
    >
      <h2 className="text-3xl font-orbitron text-cyan-300 mb-6 tracking-wider">Tech Stack</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {techStack.map((tech, i) => (
          <div key={tech.name} className="flex flex-col items-center bg-gray-900/60 border border-cyan-400/20 rounded-xl px-6 py-4 shadow-lg shadow-cyan-500/20 backdrop-blur-md min-w-[120px]">
            {tech.icon}
            <span className="mt-2 text-cyan-200 font-orbitron text-lg tracking-wide">{tech.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
    {/* Team / Credits Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
      className="w-full max-w-xl mx-auto bg-gradient-to-br from-cyan-900/60 to-purple-900/40 border border-cyan-400/20 rounded-2xl shadow-xl shadow-purple-500/20 backdrop-blur-md p-8 text-center"
    >
      <h2 className="text-2xl font-orbitron text-purple-300 mb-4 tracking-wider">Team & Credits</h2>
      <div className="flex flex-col items-center gap-2 mb-4">
        <FaUserSecret className="text-cyan-400 text-3xl mb-1" />
        <span className="text-cyan-200 font-share-tech-mono text-lg">Vipul Katwal &amp; AI Sidekick</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <a
          href="https://github.com/piyush-katwal/memehustle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-cyan-300 hover:text-purple-400 font-orbitron text-base transition drop-shadow-[0_0_8px_#00fff7]"
        >
          <FaGithub className="text-xl" />
          View on GitHub
        </a>
      </div>
    </motion.div>
    {/* Animated background gradients */}
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-cyan-400/10 to-transparent blur-2xl" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-purple-400/10 to-transparent blur-2xl" />
    </div>
  </div>
);

export default AboutPage;