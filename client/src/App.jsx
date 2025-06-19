import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import MemeForm from './components/MemeForm';
import MemeCard from './components/MemeCard';
import Leaderboard from './components/Leaderboard';
import { useMemes } from './hooks/useMemes';
import MemeDuel from './components/MemeDuel';
import HackerHUD from './components/HackerHUD';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddMemePage from './pages/AddMemePage';
import TrendingPage from './pages/TrendingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutPage from './pages/AboutPage';
import { FaArrowUp, FaArrowDown, FaUpload, FaCoins, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

// Toast context and provider
const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const showToast = (message, type = 'info') => {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  };

  // Icon and color per type (inspired by your screenshot)
  const toastIcon = (type) => {
    switch (type) {
      case 'success': return <FaCheckCircle className="text-emerald-400" size={15} />;
      case 'upvote': return <FaArrowUp className="text-cyan-400" size={15} />;
      case 'downvote': return <FaArrowDown className="text-purple-400" size={15} />;
      case 'upload': return <FaUpload className="text-blue-400" size={15} />;
      case 'bid': return <FaCoins className="text-[#ffb300]" size={15} />;
      case 'error': return <FaExclamationTriangle className="text-red-400" size={15} />;
      default: return <FaCheckCircle className="text-slate-400" size={15} />;
    }
  };
  const toastBorder = (type) => {
    switch (type) {
      case 'success': return 'border-emerald-400/70';
      case 'upvote': return 'border-cyan-400/70';
      case 'downvote': return 'border-purple-400/70';
      case 'upload': return 'border-blue-400/70';
      case 'bid': return 'border-[#ffb300]';
      case 'error': return 'border-red-400/70';
      default: return 'border-slate-400/70';
    }
  };
  const toastBg = (type) => {
    switch (type) {
      case 'success': return 'bg-emerald-950/90';
      case 'upvote': return 'bg-cyan-950/90';
      case 'downvote': return 'bg-purple-950/90';
      case 'upload': return 'bg-blue-950/90';
      case 'bid': return 'bg-[#181f2a]/95';
      case 'error': return 'bg-red-950/90';
      default: return 'bg-slate-950/90';
    }
  };
  const toastText = (type) => {
    switch (type) {
      case 'success': return 'text-emerald-100';
      case 'upvote': return 'text-cyan-100';
      case 'downvote': return 'text-purple-100';
      case 'upload': return 'text-blue-100';
      case 'bid': return 'text-[#ffb300]';
      case 'error': return 'text-red-100';
      default: return 'text-slate-100';
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-7 right-4 z-[99999] flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-toast-in ${toastBg(toast.type)} backdrop-blur-md shadow-md rounded-xl px-4 py-2 min-w-[180px] max-w-[340px] font-orbitron text-sm pointer-events-auto select-none flex items-center gap-2 border ${toastBorder(toast.type)} ${toastText(toast.type)} ${toast.type === 'bid' ? 'shadow-[0_2px_16px_0_#ffb30055] border-2' : ''}`}
            style={{
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)',
              letterSpacing: '0.01em',
              fontWeight: 500,
              borderWidth: 1,
            }}
          >
            <span className="flex-shrink-0 flex items-center justify-center opacity-80" style={{marginTop: 1}}>
              {toastIcon(toast.type)}
            </span>
            <span className="flex-1 text-left">{toast.message}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-toast-in {
          animation: toast-in 0.28s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

function PremiumLoader() {
  const [percent, setPercent] = useState(0);
  const [logStep, setLogStep] = useState(0);
  const [done, setDone] = useState(false);
  const logs = [
    'Loading user interface . . .',
    'Summoning the meme gods . . .',
    'Optimizing dankness levels . . .',
    'Almost there, don\'t rage quit! . . .',
  ];

  useEffect(() => {
    let p = 0;
    let l = 0;
    setPercent(0);
    setLogStep(0);
    setDone(false);
    const interval = setInterval(() => {
      p += 1.2 + Math.random() * 3.5;
      if (p > 100) p = 100;
      setPercent(Math.floor(p));
      if (l < logs.length && p > (l + 1) * (100 / logs.length)) {
        l++;
        setLogStep(l);
      }
      if (p === 100) {
        setTimeout(() => setDone(true), 1100);
        clearInterval(interval);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${done ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ pointerEvents: done ? 'none' : 'auto' }}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="matrix-rain w-full h-full absolute inset-0 opacity-30" />
      </div>
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-8 flex flex-col items-center z-10">
        <div className="flex items-center w-full mb-2">
          <p className="loading-text-glitch text-lg sm:text-2xl font-orbitron tracking-[0.3em] text-white drop-shadow-[0_0_8px_#00fff7]">LOADING</p>
          <div className="therefore text-2xl ml-2 animate-therefore" style={{color:'#b5eaff', textShadow:'0 0 8px #00fff7'}}>
            ∴
          </div>
          <p className="loading-number-glitch ml-auto text-lg sm:text-2xl font-orbitron text-white" style={{minWidth: '3.5rem'}}>{percent}%</p>
        </div>
        <div className="w-full bg-white/10 rounded border-t border-b border-white/40 py-1 px-1 mb-2">
          <div className="loading-bar h-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-400 rounded transition-all duration-300 shadow-lg" style={{width: `${percent}%`}} />
        </div>
        <div className="flex items-center mt-2 mb-2 w-full">
          <div className="exclamation w-6 h-6 flex items-center justify-center bg-white text-black rounded mr-2 font-bold text-base shadow">!</div>
          <span className="font-orbitron text-xs sm:text-base text-white tracking-wide">CAUTION, Do not turn off.</span>
        </div>
        <div className="w-full flex flex-col items-end mt-6">
          {logs.slice(0, logStep).map((line, i) => (
            <div key={i} className="font-share-tech-mono text-xs sm:text-sm md:text-base text-right text-gray-300/90 mb-1 animate-logline" style={{textShadow:'0 0 8px #00fff7'}}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes therefore {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-therefore {
          animation: therefore 1.2s linear infinite;
        }
        @keyframes logline {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-logline {
          animation: logline 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .loading-bar {
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .loading-text-glitch, .loading-number-glitch {
          position: relative;
          color: #b5eaff;
          text-shadow: 0 0 8px #00fff7, 2px 0 #00fff7, -2px 0 #a855f7;
          animation: glitch 1.2s infinite linear alternate-reverse;
        }
        @keyframes glitch {
          0% { text-shadow: 0 0 8px #00fff7, 2px 0 #00fff7, -2px 0 #a855f7; }
          20% { text-shadow: 2px 0 #00fff7, -2px 0 #a855f7; }
          40% { text-shadow: -2px 0 #00fff7, 2px 0 #a855f7; }
          60% { text-shadow: 0 2px #00fff7, 0 -2px #a855f7; }
          80% { text-shadow: 2px 2px #00fff7, -2px -2px #a855f7; }
          100% { text-shadow: 0 0 8px #00fff7, 2px 0 #00fff7, -2px 0 #a855f7; }
        }
        .matrix-rain {
          pointer-events: none;
          position: absolute;
          width: 100vw;
          height: 100vh;
          top: 0; left: 0;
          z-index: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(34,211,238,0.08) 0px,
            rgba(34,211,238,0.13) 2px,
            transparent 4px,
            transparent 20px
          );
          animation: matrix-move 1.7s linear infinite;
        }
        @keyframes matrix-move {
          0% { background-position-y: 0; }
          100% { background-position-y: 40px; }
        }
      `}</style>
    </div>
  );
}

function App() {
  const { memes, loading, createMeme, voteMeme, bidMeme } = useMemes();
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [search, setSearch] = useState('');
  const subtitle = 'The Future of Meme Trading';
  const [loadingScreen, setLoadingScreen] = useState(true);

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

  useEffect(() => {
    if (!loadingScreen) return;
    const timer = setTimeout(() => setLoadingScreen(false), 4200);
    return () => clearTimeout(timer);
  }, [loadingScreen]);

  // Filter memes by search
  const filteredMemes = memes.filter(meme => {
    const q = search.toLowerCase();
    return (
      meme.title.toLowerCase().includes(q) ||
      (meme.tags && meme.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  return (
    <ToastProvider>
      {loadingScreen && <PremiumLoader />}
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gray-950 text-white p-0 md:p-0">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <div className="w-full flex justify-center mt-8 mb-2">
                  <h2 className="text-4xl md:text-5xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300 drop-shadow-[0_0_18px_#00fff7] glitch">
                    Today's Meme Duel
                  </h2>
                </div>
                <HackerHUD />
                <section id="duel">
                  <MemeDuel />
                </section>
              </>
            } />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/add-meme" element={<AddMemePage createMeme={createMeme} />} />
          </Routes>
        </div>
        <footer className="w-full mt-12">
          <div className="relative w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-4 sm:px-6 py-4 bg-cyan-900/60 backdrop-blur-md border-t-2 border-cyan-400/40 shadow-inner overflow-hidden">
            {/* Animated glowing top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 blur-sm opacity-80 animate-footer-glow" />
            {/* Left: Icon + Project */}
            <div className="flex items-center gap-2 sm:gap-3 z-10 text-base sm:text-lg">
              <span className="text-cyan-400 text-xl drop-shadow-[0_0_8px_#00fff7]">&#60;/&#62;</span>
              <span className="font-orbitron text-base sm:text-lg text-cyan-200 tracking-widest">MemeHustle</span>
              <span className="text-xs text-cyan-400/70 ml-2 font-share-tech-mono">© {new Date().getFullYear()}</span>
            </div>
            {/* Right: Socials */}
            <div className="flex items-center gap-4 sm:gap-6 z-10 text-base sm:text-lg">
              <a
                href="https://github.com/vipulkatwal/meme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-purple-400 font-orbitron transition drop-shadow-[0_0_8px_#00fff7] flex items-center gap-1"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.387 7.862 10.907.575.106.785-.25.785-.555 0-.274-.01-1.003-.015-1.97-3.198.695-3.875-1.542-3.875-1.542-.523-1.33-1.277-1.684-1.277-1.684-1.044-.714.08-.7.08-.7 1.155.081 1.763 1.187 1.763 1.187 1.026 1.758 2.693 1.25 3.35.956.104-.743.402-1.25.73-1.538-2.553-.29-5.238-1.277-5.238-5.686 0-1.256.448-2.283 1.184-3.088-.119-.29-.513-1.457.112-3.04 0 0 .966-.31 3.167 1.18.918-.255 1.904-.383 2.885-.388.98.005 1.967.133 2.886.388 2.2-1.49 3.165-1.18 3.165-1.18.626 1.583.232 2.75.114 3.04.737.805 1.183 1.832 1.183 3.088 0 4.42-2.688 5.393-5.25 5.678.413.355.78 1.056.78 2.13 0 1.538-.014 2.778-.014 3.158 0 .308.208.666.79.553C20.71 21.384 24 17.084 24 12c0-6.352-5.148-11.5-12-11.5z"/></svg>
                <span className="hidden md:inline">GitHub</span>
              </a>
              <a
                href="#"
                className="text-purple-400 hover:text-cyan-300 font-orbitron transition drop-shadow-[0_0_8px_#a855f7] flex items-center gap-1 opacity-60 cursor-not-allowed"
                title="Discord coming soon!"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.074.074 0 0 0-.079.037c-.342.607-.724 1.395-.99 2.01a18.524 18.524 0 0 0-5.614 0 12.51 12.51 0 0 0-.995-2.01.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.684 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.195 2.51 6.29 3.155a.077.077 0 0 0 .084-.027c.484-.66.915-1.356 1.289-2.084a.076.076 0 0 0-.041-.104c-.693-.263-1.353-.579-1.984-.953a.077.077 0 0 1-.008-.127c.133-.1.266-.204.392-.308a.074.074 0 0 1 .077-.01c4.176 1.908 8.68 1.908 12.822 0a.075.075 0 0 1 .078.009c.127.104.26.208.393.308a.077.077 0 0 1-.007.127 12.298 12.298 0 0 1-1.985.953.076.076 0 0 0-.04.105c.375.728.806 1.423 1.288 2.084a.076.076 0 0 0 .084.028c2.096-.645 4.163-1.59 6.291-3.155a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.549-13.625a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z"/></svg>
                <span className="hidden md:inline">Discord</span>
              </a>
            </div>
            {/* Neon glow effect */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ boxShadow: '0 0 48px #00fff7, 0 0 96px #a855f7' }} />
          </div>
          <style>{`
            @keyframes footer-glow {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
            .animate-footer-glow { animation: footer-glow 3s infinite ease-in-out; }
          `}</style>
        </footer>
      </Router>
    </ToastProvider>
  );
}

export default App;