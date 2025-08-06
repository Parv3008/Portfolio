/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'phosphor-react';

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simplified and optimized entrance animations
    const tl = gsap.timeline({ delay: 0.3 });

    headlineRef.current &&
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

    subtitleRef.current &&
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      );

    ctaRef.current &&
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' },
        '-=0.4'
      );

    scrollRef.current &&
      tl.fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.3'
      );
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D background as a fallback image first, then load iframe */}
      <div className="absolute inset-0 z-0">
        {/* Lazy-load Spline iframe for better performance */}
        <iframe
          src="https://my.spline.design/orb-bABDi936usRjmDRfLr6m7KQg/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
          loading="lazy"
          title="3D Background Animation"
        />
        {/* Optional: fallback image */}
        {/* <img src="/fallback.jpg" className="w-full h-full object-cover" alt="background" /> */}

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6"
        >
          Hi, I'm <span className="gradient-text glow-text">Parv</span>
          <br />
          <span className="text-foreground/80">Web Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light"
        >
          Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-primary text-white text-lg px-8 py-4 group"
          >
            Hire Me
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>

          <button
            onClick={scrollToAbout}
            className="glass-card px-8 py-4 text-lg hover:glow-blue transition-all duration-300 group"
          >
            View My Work
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">↓</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <div className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors duration-300">
          <span className="text-sm font-light">Scroll to explore</span>
          <ArrowDown size={20} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
