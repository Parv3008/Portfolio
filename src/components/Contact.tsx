import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  EnvelopeSimple, 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo,
  PaperPlaneTilt
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section entrance animation
    gsap.fromTo('.contact-title',
      { 
        opacity: 0, 
        y: 50,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Form animation
    gsap.fromTo('.contact-form',
      { 
        opacity: 0, 
        x: -50,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Contact info animation
    gsap.fromTo('.contact-info',
      { 
        opacity: 0, 
        x: 50,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Social icons stagger
    gsap.fromTo('.social-icon',
      { 
        opacity: 0, 
        y: 30,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.social-links',
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success animation
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    // You would typically show a success message here
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    { 
      icon: GithubLogo, 
      label: 'GitHub', 
      href: 'https://github.com/miladicode',
      color: 'hover:text-neon-blue'
    },
    { 
      icon: LinkedinLogo, 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/in/miladicode',
      color: 'hover:text-neon-cyan'
    },
    { 
      icon: TwitterLogo, 
      label: 'Twitter', 
      href: 'https://twitter.com/miladicode',
      color: 'hover:text-neon-purple'
    },
    { 
      icon: EnvelopeSimple, 
      label: 'Email', 
      href: 'mailto:hello@miladicode.com',
      color: 'hover:text-neon-pink'
    }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-primary rounded-full blur-3xl float" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full blur-3xl float-delayed" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-5xl font-light mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="contact-title text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Ready to bring your vision to life? Let's collaborate and create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full input-glass"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full input-glass"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full input-glass resize-none"
                  placeholder="Tell me about your project ideas, requirements, and goals..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-medium mb-6 gradient-text">
                Get In Touch
              </h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  I'm always excited to work on new projects and collaborate with 
                  creative minds. Whether you have a specific project in mind or 
                  just want to explore possibilities, I'd love to hear from you.
                </p>
                
                <p>
                  Let's discuss how we can bring your digital vision to life with 
                  cutting-edge technology and stunning design.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-lg font-medium mb-4">Quick Response</h4>
                <p className="text-muted-foreground mb-2">
                  📧 Usually responds within 24 hours
                </p>
                <p className="text-muted-foreground">
                  🕐 Available for calls Mon-Fri, 9AM-6PM EST
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h4 className="text-xl font-medium mb-6">Connect on Social</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon glass-card p-4 flex items-center space-x-3 hover:glow-blue transition-all duration-300 group ${social.color}`}
                  >
                    <social.icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;