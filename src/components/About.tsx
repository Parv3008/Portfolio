import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Database, 
  Globe, 
  Palette, 
  Rocket, 
  Lightning 
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, label: 'Frontend Development', color: 'text-neon-blue' },
    { icon: Database, label: 'Backend Development', color: 'text-neon-purple' },
    { icon: Globe, label: 'Full-Stack Solutions', color: 'text-neon-cyan' },
    { icon: Palette, label: 'UI/UX Design', color: 'text-neon-pink' },
    { icon: Rocket, label: 'Performance Optimization', color: 'text-neon-blue' },
    { icon: Lightning, label: 'Modern Frameworks', color: 'text-neon-purple' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Image entrance animation
    gsap.fromTo(imageRef.current,
      { 
        opacity: 0, 
        x: -100,
        scale: 0.8,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      { 
        opacity: 0, 
        x: 100,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Skills stagger animation
    gsap.fromTo('.skill-item',
      { 
        opacity: 0, 
        y: 50,
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
          trigger: skillsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image hover animation setup
    const imageElement = imageRef.current;
    if (imageElement) {
      const handleMouseEnter = () => {
        gsap.to(imageElement, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageElement, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      imageElement.addEventListener('mouseenter', handleMouseEnter);
      imageElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        imageElement.removeEventListener('mouseenter', handleMouseEnter);
        imageElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full blur-3xl float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden glass-card border-2 border-primary/30">
                <img
                  src="/lovable-uploads/c32788fd-9b12-4dbf-9f99-10ffac61a44f.png"
                  alt="Milad - Web Developer"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-blue rounded-full blur-sm animate-float" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-purple rounded-full blur-sm animate-float-delayed" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Hi there! I'm Milad, a passionate web developer who specializes in creating 
                  stunning digital experiences that blend innovative design with cutting-edge technology.
                </p>
                
                <p>
                  With expertise in modern frameworks like React, GSAP animations, and 3D web technologies, 
                  I transform ideas into immersive web applications that captivate users and drive results.
                </p>
                
                <p>
                  I believe in the power of clean code, beautiful design, and seamless user experiences. 
                  Every project is an opportunity to push boundaries and create something extraordinary.
                </p>
              </div>
            </div>

            {/* Technical expertise */}
            <div>
              <h3 className="text-2xl font-medium mb-4 text-primary">Technical Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'GSAP', 'Three.js', 'Node.js', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 glass-card text-sm hover:glow-blue transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="mt-20">
          <h3 className="text-3xl font-light text-center mb-12">
            What I <span className="gradient-text">Do</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.label}
                className="skill-item glass-card p-6 text-center hover:glow-blue transition-all duration-300 cursor-pointer group"
              >
                <skill.icon 
                  size={48} 
                  className={`mx-auto mb-4 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                />
                <h4 className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                  {skill.label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;