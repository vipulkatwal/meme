import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const imageFiles = [
  '1.jpg', '2.png', '3.jpg', '4.png', '5.jpg', '6.jpg',
  '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.png', '12.png'
];

// More spaced-out, less overlapping positions
const collagePositions = [
  { top: '10%', left: '2%', rotate: -8, z: 2 },
  { top: '0%', left: '15%', rotate: 6, z: 3 },
  { top: '18%', left: '28%', rotate: -5, z: 2 },
  { top: '5%', left: '41%', rotate: 10, z: 4 },
  { top: '20%', left: '54%', rotate: -7, z: 2 },
  { top: '0%', left: '67%', rotate: 5, z: 3 },
  { top: '25%', left: '80%', rotate: 7, z: 1 },
  { top: '35%', left: '8%', rotate: -10, z: 2 },
  { top: '32%', left: '22%', rotate: 8, z: 1 },
  { top: '38%', left: '36%', rotate: -6, z: 2 },
  { top: '30%', left: '60%', rotate: 6, z: 1 },
  { top: '20%', left: '75%', rotate: -8, z: 2 }
];

const Hero = () => {
  const [images, setImages] = useState([]);
  const collageRef = useRef();
  const headlineRef = useRef();
  const subRef = useRef();
  const btnRef = useRef();

  useEffect(() => {
    setImages(imageFiles.map(file => `/src/assets/${file}`));
  }, []);

  // GSAP entrance and floating
  useEffect(() => {
    gsap.fromTo(headlineRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
    const glitch = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    glitch
      .to(headlineRef.current, { textShadow: '0 0 24px #00fff7, 0 0 48px #a855f7', duration: 0.08, y: -2, x: 2 })
      .to(headlineRef.current, { textShadow: '0 0 12px #00fff7', duration: 0.08, y: 0, x: 0 })
      .to(headlineRef.current, { textShadow: '0 0 32px #a855f7', duration: 0.06, y: 1, x: -2 })
      .to(headlineRef.current, { textShadow: '0 0 12px #00fff7', duration: 0.1, y: 0, x: 0 });

    gsap.fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' });

    if (collageRef.current) {
      Array.from(collageRef.current.children).forEach((img, i) => {
        gsap.fromTo(img, {
          scale: 0.7, opacity: 0, y: 40, x: 0
        }, {
          scale: 1, opacity: 1, y: 0, x: 0, duration: 0.7, delay: 0.8 + i * 0.07, ease: 'back.out(1.7)'
        });
        gsap.to(img, {
          y: `+=${8 + (i % 3) * 4}`,
          x: `+=${6 - (i % 2) * 12}`,
          repeat: -1,
          yoyo: true,
          duration: 2.5 + (i % 4),
          ease: 'sine.inOut',
          delay: 1.5 + i * 0.05
        });
      });
    }

    gsap.to(btnRef.current, {
      boxShadow: '0 0 32px #00fff7, 0 0 64px #a855f7',
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut'
    });

    return () => {
      glitch.kill();
    };
  }, [images]);

  // Crazy hover effect
  const handleHover = (e, i) => {
    gsap.to(e.currentTarget, {
      scale: 1.25,
      zIndex: 99,
      rotate: (collagePositions[i]?.rotate || 0) + (Math.random() > 0.5 ? 10 : -10),
      boxShadow: '0 0 48px #00fff7, 0 0 96px #a855f7',
      duration: 0.25,
      ease: 'power2.out'
    });
  };
  const handleLeave = (e, i) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      zIndex: collagePositions[i]?.z || 1,
      rotate: collagePositions[i]?.rotate || 0,
      boxShadow: '0 0 24px #00fff7, 0 0 48px #a855f7',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-cyan-950/80 to-gray-950/90 text-center" id="hero">
      <h1
        ref={headlineRef}
        className="text-6xl md:text-8xl font-orbitron text-cyan-400 mb-8 glitch drop-shadow-[0_0_16px_#00fff7]">
        Welcome to MemeHustle
      </h1>
      <p
        ref={subRef}
        className="text-2xl md:text-3xl text-cyan-200 font-share-tech-mono mb-16 drop-shadow-[0_0_10px_#00fff7]">
        Buy Low, Meme High. Because JPEGs Deserve a Fighting Chance Too.
      </p>
      <div
        ref={collageRef}
        className="relative mx-auto mb-8"
        style={{ width: '90vw', maxWidth: 1100, height: 360, minHeight: 220 }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`meme-collage-${i}`}
            className="absolute w-52 h-52 md:w-64 md:h-64 object-cover rounded-xl border-2 border-cyan-700/30 shadow-xl transition-all duration-300"
            style={{
              top: collagePositions[i]?.top || '0%',
              left: collagePositions[i]?.left || '0%',
              zIndex: collagePositions[i]?.z || 1,
              transform: `rotate(${collagePositions[i]?.rotate || 0}deg)`,
              boxShadow: '0 0 24px #00fff7, 0 0 48px #a855f7',
              background: '#181a2a'
            }}
            loading="lazy"
            onMouseEnter={e => handleHover(e, i)}
            onMouseLeave={e => handleLeave(e, i)}
          />
        ))}
      </div>
      <a href="#marketplace">
        <button
          ref={btnRef}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-orbitron rounded-lg shadow-lg text-xl hover:from-cyan-400 hover:to-purple-400 transition-all"
        >
          Enter Marketplace
        </button>
      </a>
    </section>
  );
};

export default Hero;