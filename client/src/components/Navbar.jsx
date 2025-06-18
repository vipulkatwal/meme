import { FaFire, FaTrophy, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => (
  <nav className="flex items-center justify-between px-4 py-2 bg-cyan-900/30 backdrop-blur-md border-b-2 border-cyan-400/40 shadow-none relative z-50">
    <div className="font-orbitron text-2xl md:text-3xl text-cyan-300 tracking-widest select-none drop-shadow-[0_0_8px_#00fff7] flex items-center gap-2">
      <span className="text-cyan-400 text-2xl">&#60;/&#62;</span>
      <span className="">MEMEHUSTLE</span>
    </div>
    <div className="flex gap-8 md:gap-14 font-share-tech-mono text-cyan-200 text-base md:text-lg items-center">
      <a
        href="#marketplace"
        className="relative flex items-center gap-2 px-2 py-1 transition text-cyan-200 hover:text-cyan-400 after:content-[''] after:block after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
        style={{ textShadow: '0 0 8px #00fff7' }}
      >
        <FaFire className="text-cyan-400 text-lg drop-shadow-[0_0_6px_#00fff7]" />
        Trending Now
      </a>
      <a
        href="#leaderboard"
        className="relative flex items-center gap-2 px-2 py-1 transition text-cyan-200 hover:text-cyan-400 after:content-[''] after:block after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
        style={{ textShadow: '0 0 8px #00fff7' }}
      >
        <FaTrophy className="text-yellow-400 text-lg drop-shadow-[0_0_6px_#ffe066]" />
        Leaderboard
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