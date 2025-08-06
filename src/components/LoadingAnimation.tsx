import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const greetings = [
    "Hello",     // English
    "Hola",      // Spanish
    "Bonjour",   // French
    "こんにちは",  // Japanese
    "नमस्ते",     // Hindi
    "안녕하세요",   // Korean
    "Olá",       // Portuguese
    "Ciao",      // Italian
    "Привет"     // Russian
  ];

  useEffect(() => {
    if (!textRef.current || !containerRef.current || !particlesRef.current) return;

    let currentIndex = 0;
    let greetingInterval: NodeJS.Timeout;
    
    // Create floating particles
    const createParticles = () => {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-primary rounded-full opacity-30';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particlesRef.current?.appendChild(particle);

        gsap.to(particle, {
          y: -20,
          opacity: 0.8,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2
        });
      }
    };

    // Initial setup
    gsap.set(textRef.current, { opacity: 0, y: 30, filter: "blur(10px)" });
    gsap.set(containerRef.current, { opacity: 1, scale: 1 });

    // Animate text in
    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    });

    createParticles();

    // Start greeting cycle
    const showNextGreeting = () => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        filter: "blur(5px)",
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          if (textRef.current) {
            textRef.current.textContent = greetings[currentIndex];
            gsap.to(textRef.current, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.3,
              ease: "power2.out"
            });
            currentIndex = (currentIndex + 1) % greetings.length;
          }
        }
      });
    };

    // Start the greeting cycle after initial animation
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.textContent = greetings[0];
        currentIndex = 1;
        greetingInterval = setInterval(showNextGreeting, 600);
      }
    }, 500);

    // End animation after all greetings
    const endAnimation = setTimeout(() => {
      clearInterval(greetingInterval);
      
      // Final scale and fade out
      gsap.to(textRef.current, {
        scale: 1.2,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power3.inOut"
      });

      gsap.to(containerRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        delay: 0.4,
        onComplete: () => {
          onComplete();
        }
      });
    }, 6000);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(endAnimation);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 backdrop-glass flex items-center justify-center"
    >
      {/* Animated background particles */}
      <div ref={particlesRef} className="absolute inset-0" />
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      {/* Main greeting text */}
      <div
        ref={textRef}
        className="text-6xl md:text-8xl font-light gradient-text text-center glow-text"
      >
        Loading...
      </div>
      
      {/* Subtle loading indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;