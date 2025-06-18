import { FaFire, FaTrophy, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const fireGlowKeyframes = `
@keyframes fire-glow {
  0%, 100% { filter: drop-shadow(0 0 8px #ff6a00) drop-shadow(0 0 16px #ffb300); color: #ffb300; }
  30% { filter: drop-shadow(0 0 16px #ff3c00) drop-shadow(0 0 32px #fff3a0); color: #ff6a00; }
  60% { filter: drop-shadow(0 0 12px #ffb300) drop-shadow(0 0 24px #ff3c00); color: #ff3c00; }
}`;

if (typeof document !== 'undefined' && !document.getElementById('fire-glow-keyframes')) {
  const style = document.createElement('style');
  style.id = 'fire-glow-keyframes';
  style.innerHTML = fireGlowKeyframes;
  document.head.appendChild(style);
}

const Navbar = () => (
  <nav className="flex items-center justify-between px-4 py-2 bg-cyan-900/30 backdrop-blur-md border-b-2 border-cyan-400/40 shadow-none relative z-50">
    <Link to="/" className="font-orbitron text-2xl md:text-3xl text-cyan-300 tracking-widest select-none drop-shadow-[0_0_8px_#00fff7] flex items-center gap-2 hover:text-cyan-400 transition">
      <span className="text-cyan-400 text-2xl">&#60;/&#62;</span>
      <span className="">MEMEHUSTLE</span>
    </Link>
    <div className="flex gap-8 md:gap-14 font-share-tech-mono text-cyan-200 text-base md:text-lg items-center">
      <Link
        to="/trending"
        className="relative flex items-center gap-2 px-2 py-1 transition text-orange-300 hover:text-orange-400 after:content-[''] after:block after:h-0.5 after:bg-orange-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
        style={{ textShadow: '0 0 12px #ff6a00, 0 0 24px #ffb300, 0 0 32px #ff3c00' }}
      >
        <FaFire className="text-lg" style={{ color: '#ffb300', animation: 'fire-glow 1.2s infinite alternate' }} />
        Trending Now
      </Link>
      <a
        href="#leaderboard"
        className="relative flex items-center gap-2 px-2 py-1 transition text-cyan-200 hover:text-cyan-400 after:content-[''] after:block after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
        style={{ textShadow: '0 0 8px #00fff7' }}
      >
        <FaTrophy className="text-yellow-400 text-lg drop-shadow-[0_0_6px_#ffe066]" />
        Leaderboard
      </a>
      <a
        href="/add-meme"
        className="relative flex items-center gap-2 px-2 py-1 transition text-green-300 hover:text-green-400 after:content-[''] after:block after:h-0.5 after:bg-green-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
        style={{ textShadow: '0 0 8px #22c55e' }}
      >
        <FaPlus className="text-green-400 text-lg" />
        Add Meme
      </a>
      <a
        href="#about"
        className="relative flex items-center gap-2 px-2 py-1 transition text-cyan-200 hover:text-cyan-400 after:content-[''] after:block after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
        style={{ textShadow: '0 0 8px #00fff7' }}
      >
        <FaInfoCircle className="text-purple-400 text-lg drop-shadow-[0_0_6px_#a855f7]" />
        About
      </a>
    </div>
    <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 blur-sm opacity-80 pointer-events-none" />
  </nav>
);

export default Navbar;