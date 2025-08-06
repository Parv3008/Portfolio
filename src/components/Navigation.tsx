import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navigation on mount
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5 }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'backdrop-glass border-b border-glass-border' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="nav-item">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              >
                Milad
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-item text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-item btn-primary text-sm"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden nav-item p-2 glass-card hover:glow-blue transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="backdrop-glass h-full flex flex-col justify-center items-center">
          <div className="absolute top-6 right-6">
            <button
              onClick={toggleMenu}
              className="p-2 glass-card hover:glow-blue transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-3xl font-light text-foreground/80 hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-lg mt-8"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;