"use client"

import { FaFire, FaTrophy, FaInfoCircle, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const premiumCyberpunkStyles = `
@keyframes fire-glow {
  0%, 100% { filter: drop-shadow(0 0 8px #ff6a00) drop-shadow(0 0 16px #ffb300); color: #ffb300; }
  30% { filter: drop-shadow(0 0 16px #ff3c00) drop-shadow(0 0 32px #fff3a0); color: #ff6a00; }
  60% { filter: drop-shadow(0 0 12px #ffb300) drop-shadow(0 0 24px #ff3c00); color: #ff3c00; }
}

@keyframes subtle-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.7; filter: blur(3px); }
  50% { opacity: 1; filter: blur(2px); }
}

@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

@keyframes data-flow {
  0% { opacity: 0; transform: translateY(-10px); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(10px); }
}

@keyframes border-flow {
  0%, 100% { border-color: rgba(34, 211, 238, 0.4); }
  50% { border-color: rgba(34, 211, 238, 0.8); }
}

@keyframes rotate-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes noise {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.07; }
}
`

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Add the premium styles to the document
    if (typeof document !== "undefined" && !document.getElementById("premium-cyberpunk-styles")) {
      const style = document.createElement("style")
      style.id = "premium-cyberpunk-styles"
      style.innerHTML = premiumCyberpunkStyles
      document.head.appendChild(style)
    }

    // Add scroll listener for premium effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [window.location.pathname])

  return (
    <nav
      className={`relative flex items-center justify-between px-4 sm:px-6 py-3 transition-all duration-500 z-50 ${
        scrolled
          ? "bg-gradient-to-r from-cyan-900/90 via-cyan-900/95 to-cyan-900/90 backdrop-blur-lg"
          : "bg-gradient-to-r from-cyan-900/30 via-cyan-900/40 to-cyan-900/30 backdrop-blur-md"
      }`}
    >
      {/* Premium noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          animation: "noise 4s infinite",
        }}
      />

      {/* Premium top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0" />

      {/* Premium vertical divider with animation */}
      <div className="absolute top-1/2 left-[30%] h-[70%] w-[1px] -translate-y-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/60 to-cyan-400/0">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/80 to-cyan-400/0 blur-sm" />
        <div
          className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-cyan-400/0 via-cyan-400/60 to-cyan-400/0"
          style={{ animation: "data-flow 3s infinite" }}
        />
      </div>

      {/* Premium logo with enhanced effects */}
      <Link
        to="/"
        className="relative font-orbitron text-xl sm:text-2xl md:text-3xl text-cyan-300 tracking-widest select-none flex items-center gap-2 hover:text-cyan-400 transition-all duration-500 group"
        style={{ animation: "subtle-float 4s ease-in-out infinite" }}
      >
        {/* Premium glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Premium bracket with animation */}
        <span className="text-cyan-400 text-2xl relative">
          <span className="relative z-10">&#60;/&#62;</span>
          <div className="absolute inset-0 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Premium bracket glow */}
          <div
            className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 rounded-sm blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          />
        </span>

        {/* Premium text with shimmer effect */}
        <span className="relative">
          <span className="relative z-10">MEMEHUSTLE</span>

          {/* Premium underline with animation */}
          <div
            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ animation: "shimmer 3s infinite linear" }}
          />

          {/* Premium shimmer overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ animation: "shimmer 2s infinite linear" }}
          />
        </span>

        {/* Premium corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400/60 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400/60 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
      </Link>

      {/* Hamburger menu for mobile */}
      <button
        className="sm:hidden flex flex-col items-center justify-center w-10 h-10 rounded-md border border-cyan-400/30 bg-cyan-900/40 hover:bg-cyan-900/60 transition-all z-20"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Open navigation menu"
      >
        <span className={`block w-6 h-0.5 bg-cyan-300 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-cyan-300 rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-cyan-300 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Premium navigation with enhanced effects */}
      <div className={`hidden sm:flex gap-8 md:gap-14 font-share-tech-mono text-cyan-200 text-base md:text-lg items-center`}>
        {/* Trending Now - Premium Style */}
        <Link
          to="/trending"
          className="relative flex items-center gap-2 px-4 py-2 transition-all duration-500 text-orange-300 hover:text-orange-400 group"
        >
          {/* Premium glass background */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-orange-400/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm" />

          {/* Premium border glow */}
          <div
            className="absolute inset-0 rounded-md border border-orange-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{ animation: "border-flow 2s infinite" }}
          />

          {/* Premium icon with enhanced glow */}
          <div className="relative">
            <FaFire
              className="text-lg relative z-10"
              style={{ color: "#ffb300", animation: "fire-glow 1.2s infinite alternate" }}
            />
            <div className="absolute inset-0 bg-orange-400/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Premium text with glow */}
          <span
            className="relative z-10"
            style={{
              textShadow: "0 0 12px #ff6a00, 0 0 24px #ffb300, 0 0 32px #ff3c00",
              transition: "text-shadow 0.5s ease",
            }}
          >
            Trending Now
          </span>

          {/* Premium underline with animation */}
          <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </Link>

        {/* Leaderboard - Premium Style */}
        <Link
          to="/leaderboard"
          className="relative flex items-center gap-2 px-4 py-2 transition-all duration-500 text-cyan-200 hover:text-cyan-400 group"
        >
          {/* Premium glass background */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400/5 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm" />

          {/* Premium border glow */}
          <div
            className="absolute inset-0 rounded-md border border-cyan-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{ animation: "border-flow 2s infinite" }}
          />

          {/* Premium icon with enhanced glow */}
          <div className="relative">
            <FaTrophy className="text-yellow-400 text-lg relative z-10" />
            <div className="absolute inset-0 bg-yellow-400/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Premium text with glow */}
          <span
            className="relative z-10"
            style={{
              textShadow: "0 0 8px #00fff7",
              transition: "text-shadow 0.5s ease",
            }}
          >
            Leaderboard
          </span>

          {/* Premium underline with animation */}
          <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </Link>

        {/* Add Meme - Premium Style */}
        <a
          href="/add-meme"
          className="relative flex items-center gap-2 px-4 py-2 transition-all duration-500 text-green-300 hover:text-green-400 group"
        >
          {/* Premium glass background */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-green-400/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm" />

          {/* Premium border glow */}
          <div
            className="absolute inset-0 rounded-md border border-green-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{ animation: "border-flow 2s infinite" }}
          />

          {/* Premium icon with enhanced glow */}
          <div className="relative">
            <FaPlus className="text-green-400 text-lg relative z-10" />
            <div className="absolute inset-0 bg-green-400/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Premium text with glow */}
          <span
            className="relative z-10"
            style={{
              textShadow: "0 0 8px #22c55e",
              transition: "text-shadow 0.5s ease",
            }}
          >
            Add Meme
          </span>

          {/* Premium underline with animation */}
          <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </a>

        {/* About - Premium Style */}
        <Link
          to="/about"
          className="relative flex items-center gap-2 px-4 py-2 transition-all duration-500 text-cyan-200 hover:text-cyan-400 group"
        >
          {/* Premium glass background */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-purple-400/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm" />

          {/* Premium border glow */}
          <div
            className="absolute inset-0 rounded-md border border-purple-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{ animation: "border-flow 2s infinite" }}
          />

          {/* Premium icon with enhanced glow */}
          <div className="relative">
            <FaInfoCircle className="text-purple-400 text-lg relative z-10" />
            <div className="absolute inset-0 bg-purple-400/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Premium text with glow */}
          <span
            className="relative z-10"
            style={{
              textShadow: "0 0 8px #a855f7",
              transition: "text-shadow 0.5s ease",
            }}
          >
            About
          </span>

          {/* Premium underline with animation */}
          <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </Link>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cyan-900/95 border-b-2 border-cyan-400/30 shadow-lg flex flex-col items-center gap-2 py-4 z-40 sm:hidden animate-fade-in">
          <Link to="/trending" className="w-full text-center py-2 text-cyan-200 hover:text-orange-400 font-orbitron" onClick={() => setMenuOpen(false)}>
            <FaFire className="inline mr-2 text-orange-400" /> Trending Now
          </Link>
          <Link to="/leaderboard" className="w-full text-center py-2 text-cyan-200 hover:text-yellow-400 font-orbitron" onClick={() => setMenuOpen(false)}>
            <FaTrophy className="inline mr-2 text-yellow-400" /> Leaderboard
          </Link>
          <Link to="/add-meme" className="w-full text-center py-2 text-cyan-200 hover:text-green-400 font-orbitron" onClick={() => setMenuOpen(false)}>
            <FaPlus className="inline mr-2 text-green-400" /> Add Meme
          </Link>
          <Link to="/about" className="w-full text-center py-2 text-cyan-200 hover:text-purple-400 font-orbitron" onClick={() => setMenuOpen(false)}>
            <FaInfoCircle className="inline mr-2 text-purple-400" /> About
          </Link>
        </div>
      )}

      {/* Premium decorative elements */}
      <div className="absolute -bottom-1 left-0 right-0 h-[2px]">
        <div className="h-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-cyan-400/0" />
        <div className="h-[1px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 blur-sm" />
      </div>

      {/* Premium corner accents */}
      <div className="absolute top-0 left-0 w-12 h-[1px] bg-gradient-to-r from-cyan-400/80 to-transparent" />
      <div className="absolute top-0 left-0 w-[1px] h-12 bg-gradient-to-b from-cyan-400/80 to-transparent" />
      <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-cyan-400/80 to-transparent" />
      <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-cyan-400/80 to-transparent" />

      {/* Premium rotating accent */}
      <div
        className="absolute top-3 right-3 w-6 h-6 border border-cyan-400/20 rounded-full opacity-30"
        style={{ animation: "rotate-slow 10s linear infinite" }}
      >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-400/40" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-400/40" />
      </div>

      {/* Premium data points */}
      <div className="absolute top-1/2 left-[15%] w-1 h-1 bg-cyan-400/60 rounded-full" />
      <div className="absolute top-1/3 right-[25%] w-1 h-1 bg-cyan-400/40 rounded-full" />
      <div className="absolute bottom-1/3 left-[40%] w-1 h-1 bg-cyan-400/50 rounded-full" />
    </nav>
  )
}

export default Navbar
