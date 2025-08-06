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
    
    // Create lightweight floating particles (reduced from 20 to 8 for better performance)
    const createParticles = () => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-primary rounded-full opacity-20';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particlesRef.current?.appendChild(particle);

        gsap.to(particle, {
          y: -30,
          opacity: 0.6,
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2
        });
      }
    };

    // Initial setup
    gsap.set(textRef.current, { opacity: 0, y: 50, filter: "blur(10px)" });
    gsap.set(containerRef.current, { opacity: 1, scale: 1 });

    // Animate text in with better performance
    gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });

    createParticles();

    // Start greeting cycle with proper multilingual sequence
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

    // Start with first greeting immediately
    if (textRef.current) {
      textRef.current.textContent = greetings[0];
      currentIndex = 1;
      
      // Start cycling through greetings after 1 second
      setTimeout(() => {
        greetingInterval = setInterval(showNextGreeting, 500); // Faster transitions
      }, 1000);
    }

    // End animation after showing all greetings
    const endAnimation = setTimeout(() => {
      clearInterval(greetingInterval);
      
      // Final scale and fade out
      gsap.to(textRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(15px)",
        duration: 0.8,
        ease: "power3.inOut"
      });

      gsap.to(containerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        delay: 0.3,
        onComplete: () => {
          onComplete();
        }
      });
    }, 5500); // Slightly shorter total duration

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(endAnimation);
      // Clean up particles for better performance
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, [onComplete, greetings]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] backdrop-glass flex items-center justify-center"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    >
      {/* Animated background particles */}
      <div ref={particlesRef} className="absolute inset-0" />
      
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      {/* Main greeting text */}
      <div
        ref={textRef}
        className="text-6xl md:text-8xl font-light gradient-text text-center glow-text"
        style={{ fontWeight: 300 }}
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