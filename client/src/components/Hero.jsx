"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.png';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.png';

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const imageFiles = [
  img1, img2, img3, img4, img5, img6,
  img7, img8, img9, img10, img11, img12
];

// Improved positioning with better visual hierarchy and layers
const collagePositions = [
  // Background layer (furthest)
  { top: "15%", left: "5%", rotate: -12, scale: 0.8, layer: 1, speed: 0.3 },
  { top: "60%", left: "75%", rotate: 15, scale: 0.7, layer: 1, speed: 0.25 },
  { top: "70%", left: "10%", rotate: -8, scale: 0.75, layer: 1, speed: 0.35 },

  // Middle layer
  { top: "25%", left: "70%", rotate: 8, scale: 0.9, layer: 2, speed: 0.5 },
  { top: "45%", left: "15%", rotate: -15, scale: 0.85, layer: 2, speed: 0.45 },
  { top: "10%", left: "45%", rotate: 12, scale: 0.95, layer: 2, speed: 0.55 },
  { top: "80%", left: "50%", rotate: -6, scale: 0.8, layer: 2, speed: 0.4 },

  // Foreground layer (closest)
  { top: "35%", left: "35%", rotate: -5, scale: 1.1, layer: 3, speed: 0.8 },
  { top: "20%", left: "20%", rotate: 10, scale: 1.05, layer: 3, speed: 0.75 },
  { top: "55%", left: "60%", rotate: -10, scale: 1.0, layer: 3, speed: 0.7 },
  { top: "5%", left: "75%", rotate: 7, scale: 1.15, layer: 3, speed: 0.85 },
  { top: "75%", left: "30%", rotate: -12, scale: 1.08, layer: 3, speed: 0.65 },
]

export default function HeroParallax() {
  const images = imageFiles;
  const collageRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!images.length || !collageRef.current || !headlineRef.current || !subRef.current) return

    const ctx = gsap.context(() => {
      // Enhanced entrance animations
      const tl = gsap.timeline()

      // Headline with more sophisticated glitch effect
      tl.fromTo(
        headlineRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          onComplete: () => {
            // Continuous subtle glitch
            gsap.to(headlineRef.current, {
              textShadow: "2px 0 #ff0080, -2px 0 #00ffff, 0 0 20px #ffffff",
              duration: 0.1,
              repeat: -1,
              yoyo: true,
              repeatDelay: 3,
              ease: "power2.inOut",
            })
          },
        },
      )

      // Subtitle with typewriter effect
      tl.fromTo(subRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5")

      // Enhanced image animations with staggered entrance
      const imageElements = Array.from(collageRef.current.children)

      imageElements.forEach((img, i) => {
        const pos = collagePositions[i]
        if (!pos) return

        // Set initial transform based on layer
        gsap.set(img, {
          scale: pos.scale * 0.3,
          opacity: 0,
          rotation: pos.rotate + (Math.random() - 0.5) * 30,
          y: 100 + Math.random() * 100,
          x: (Math.random() - 0.5) * 200,
          zIndex: pos.layer * 10,
        })

        // Entrance animation with elastic effect
        tl.to(
          img,
          {
            scale: pos.scale,
            opacity: 1,
            rotation: pos.rotate,
            y: 0,
            x: 0,
            duration: 1.2 + Math.random() * 0.8,
            ease: "elastic.out(1, 0.5)",
            delay: i * 0.1,
          },
          "-=1",
        )

        // Continuous floating animation with different patterns per layer
        gsap.to(img, {
          y: `+=${5 + pos.layer * 3}`,
          x: `+=${3 + pos.layer * 2}`,
          rotation: `+=${2 + pos.layer}`,
          repeat: -1,
          yoyo: true,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        })

        // Parallax scroll effect
        if (!isMobile) {
          gsap.to(img, {
            y: `-=${50 * pos.speed}`,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [images, isMobile])

  const handleImageHover = (e, index) => {
    const pos = collagePositions[index]
    if (!pos) return

    gsap.to(e.currentTarget, {
      scale: pos.scale * 1.3,
      rotation: pos.rotate + (Math.random() > 0.5 ? 15 : -15),
      zIndex: 999,
      boxShadow: "0 20px 40px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 0, 128, 0.3)",
      duration: 0.4,
      ease: "power2.out",
    })
  }

  const handleImageLeave = (e, index) => {
    const pos = collagePositions[index]
    if (!pos) return

    gsap.to(e.currentTarget, {
      scale: pos.scale,
      rotation: pos.rotate,
      zIndex: pos.layer * 10,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      duration: 0.6,
      ease: "power2.out",
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-14 sm:py-20 md:py-32 bg-gradient-to-b from-cyan-950/80 to-gray-950/90 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Enhanced headline */}
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-orbitron text-cyan-400 mb-6 sm:mb-10 glitch drop-shadow-[0_0_32px_#00fff7] tracking-wider"
        >
          Welcome to MemeHustle
        </h1>

        {/* Enhanced subtitle */}
        <p
          ref={subRef}
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-share-tech-mono mb-4 sm:mb-8 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-200 text-transparent bg-clip-text drop-shadow-[0_0_18px_#00fff7]"
          style={{ WebkitTextStroke: "0.5px #00fff7" }}
        >
          Buy Low, Meme High. Because JPEGs Deserve a Fighting Chance Too.
        </p>

        {/* Enhanced collage container */}
        <div
          ref={collageRef}
          className="relative mx-auto"
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: isMobile ? "400px" : "600px",
            perspective: "1000px",
          }}
        >
          {(isMobile ? images.slice(0, 6) : images).map((src, i) => {
            const pos = collagePositions[i]
            if (!pos) return null

            return (
              <img
                key={i}
                src={src}
                alt={`Meme ${i + 1}`}
                className="absolute rounded-2xl border-2 border-white/20 shadow-2xl cursor-pointer transition-all duration-300 object-cover"
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: isMobile ? "120px" : "180px",
                  height: isMobile ? "120px" : "180px",
                  transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                  zIndex: pos.layer * 10,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(1px)",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={(e) => handleImageHover(e, i)}
                onMouseLeave={(e) => handleImageLeave(e, i)}
                loading="lazy"
              />
            )
          })}
        </div>


      </div>
    </section>
  )
}
