import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Code } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Footer entrance animation
    gsap.fromTo('.footer-content',
      { 
        opacity: 0, 
        y: 60,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating particles background
    const createFooterParticles = () => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        footer.appendChild(particle);

        gsap.to(particle, {
          y: -30,
          opacity: 0.8,
          duration: 4 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random() * 2
        });
      }
    };

    createFooterParticles();

    // Heart animation on hover
    const heartElement = footer.querySelector('.heart-icon');
    if (heartElement) {
      const handleMouseEnter = () => {
        gsap.to(heartElement, {
          scale: 1.2,
          color: '#ff006e',
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(heartElement, {
          scale: 1,
          color: 'currentColor',
          duration: 0.3,
          ease: "power2.out"
        });
      };

      heartElement.addEventListener('mouseenter', handleMouseEnter);
      heartElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        heartElement.removeEventListener('mouseenter', handleMouseEnter);
        heartElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-6 border-t border-border/30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-gradient-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full blur-3xl" />
      </div>

      <div className="footer-content relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-3">Parv</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating digital experiences that inspire and engage through 
                innovative design and cutting-edge technology.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Code size={16} />
              <span>Built with</span>
              <Heart size={16} className="heart-icon cursor-pointer" />
              <span>and React + GSAP</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium mb-6">Services</h4>
            <div className="space-y-3 text-muted-foreground">
              <div>Web Development</div>
              <div>UI/UX Design</div>
              <div>3D Web Experiences</div>
              <div>Animation & Interactions</div>
              <div>Performance Optimization</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © {currentYear} Parv. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="hover:text-primary transition-colors duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={() => scrollToSection('hero')}
          className="absolute bottom-8 right-8 glass-card p-3 hover:glow-blue transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <div className="w-6 h-6 border-l-2 border-t-2 border-primary transform rotate-45 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;