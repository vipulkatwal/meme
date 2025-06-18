import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FaRocket } from 'react-icons/fa';

const imageFiles = [
  '1.png', '2.png', '3.jpg', '4.png', '5.jpg', '6.jpg',
  '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.png'
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setImages(imageFiles.map(file => `/src/assets/${file}`));
  }, []);

  // GSAP entrance and floating
  useEffect(() => {
    if (headlineRef.current) {
      gsap.fromTo(headlineRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
      const glitch = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      glitch
        .to(headlineRef.current, { textShadow: '0 0 24px #00fff7, 0 0 48px #a855f7', duration: 0.16 })
        .to(headlineRef.current, { textShadow: '0 0 12px #00fff7', duration: 0.16 })
        .to(headlineRef.current, { textShadow: '0 0 32px #a855f7', duration: 0.12 })
        .to(headlineRef.current, { textShadow: '0 0 16px #00fff7', duration: 0.18 });
    }
    if (subRef.current) {
      gsap.fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' });
    }
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
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        boxShadow: '0 0 32px #00fff7, 0 0 64px #a855f7',
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut'
      });
    }
    return () => {
      // Only kill glitch if it was created
      if (headlineRef.current && gsap.getTweensOf(headlineRef.current).length > 0) {
        gsap.killTweensOf(headlineRef.current);
      }
    };
  }, [images]);

  // Responsive image count
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <section className="py-14 sm:py-20 md:py-32 bg-gradient-to-b from-cyan-950/80 to-gray-950/90 text-center flex flex-col items-center w-full px-2" id="hero">
      <h1
        ref={headlineRef}
        className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-orbitron text-cyan-400 mb-6 sm:mb-10 glitch drop-shadow-[0_0_32px_#00fff7] tracking-wider"
      >
        Welcome to MemeHustle
      </h1>
      <p
        ref={subRef}
        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-share-tech-mono mb-10 sm:mb-20 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-200 text-transparent bg-clip-text drop-shadow-[0_0_18px_#00fff7]"
        style={{ WebkitTextStroke: '0.5px #00fff7' }}
      >
        Buy Low, Meme High. Because JPEGs Deserve a Fighting Chance Too.
      </p>
      <div
        ref={collageRef}
        className="relative mx-auto mb-8 sm:mb-14 flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-0"
        style={{ width: '98vw', maxWidth: 1200, minHeight: isMobile ? 120 : 220, height: 'auto' }}
      >
        {(isMobile ? images.slice(0, 2) : images).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Meme collage image ${i + 1}`}
            className={`rounded-xl border-2 border-cyan-700/30 shadow-xl transition-all duration-300 object-cover bg-[#181a2a] ${
              isMobile
                ? 'w-24 h-24'
                : 'w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 ' + (i % 2 === 0 ? 'md:mt-8' : 'md:mb-8')
            }`}
            style={{
              position: 'relative',
              zIndex: 2 + (i % 3),
              transform: `rotate(${collagePositions[i]?.rotate || 0}deg)`,
              boxShadow: '0 0 32px #00fff7, 0 0 64px #a855f7',
              marginLeft: i === 0 ? 0 : -20,
              marginRight: i === images.length - 1 ? 0 : -20,
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            loading="lazy"
            onMouseEnter={e => handleHover(e, i)}
            onMouseLeave={e => handleLeave(e, i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
