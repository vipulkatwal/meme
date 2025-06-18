import MemeForm from '../components/MemeForm';
import { motion } from 'framer-motion';

const AddMemePage = ({ createMeme }) => (
  <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 bg-gradient-to-b from-cyan-950/80 to-gray-950/90 overflow-hidden">
    {/* Animated pulsing and rotating neon glow behind card */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.08, 1],
        rotate: [0, 8, -8, 0],
      }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-400/30 via-cyan-400/10 to-purple-500/20 blur-3xl z-0 pointer-events-none"
    />
    {/* Hero-style heading */}
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-6xl md:text-8xl font-orbitron text-cyan-400 mb-8 glitch drop-shadow-[0_0_16px_#00fff7]"
    >
      Add a New Meme
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="text-cyan-200 font-share-tech-mono mb-10 text-xl md:text-2xl drop-shadow-[0_0_12px_#00fff7]"
    >
      One meme can destabilize the feed. Make it yours.
    </motion.p>
    {/* Floating card animation */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
      className="relative z-10 w-full max-w-md rounded-2xl border-2 border-cyan-400/70 bg-gray-900/80 shadow-2xl shadow-cyan-500/40 p-8 backdrop-blur-xl"
      style={{ boxShadow: '0 0 48px #00fff7, 0 0 96px #a855f7' }}
    >
      <MemeForm onSubmit={createMeme} />
    </motion.div>
  </div>
);

export default AddMemePage;