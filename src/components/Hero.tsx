import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'phosphor-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entrance animations
    const tl = gsap.timeline({ delay: 0.5 });

    if (headlineRef.current) {
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }

    if (scrollRef.current) {
      tl.fromTo(scrollRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );

      // Continuous bounce animation for scroll indicator
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Create lightweight floating orbs (reduced from 5 to 3 for better performance)
    const createFloatingOrbs = () => {
      for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = `absolute w-16 h-16 rounded-full bg-gradient-primary opacity-5 blur-lg`;
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        heroRef.current?.appendChild(orb);

        gsap.to(orb, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          duration: 15 + Math.random() * 5, // Slower animations for better performance
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    };

    createFloatingOrbs();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={heroRef} className="absolute inset-0 z-0">
        {/* Spline 3D Background - Optimized loading */}
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
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6"
        >
          Hi, I'm{' '}
          <span className="gradient-text glow-text">Milad</span>
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
            className="btn-primary text-lg px-8 py-4 group"
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