/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code,
  Database,
  Globe,
  Palette,
  Rocket,
  Lightning,
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, label: 'Frontend Development', color: 'text-neon-blue' },
    { icon: Database, label: 'Creative User Experiences', color: 'text-neon-purple' },
    { icon: Globe, label: 'Seamless System Integration', color: 'text-neon-cyan' },
    { icon: Palette, label: 'Human-Centered Interfaces', color: 'text-neon-pink' },
    { icon: Rocket, label: 'Performance Optimization', color: 'text-neon-blue' },
    { icon: Lightning, label: 'Modern Frameworks', color: 'text-neon-purple' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    });

    imageRef.current &&
      timeline.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: -60,
          scale: 0.95,
          willChange: 'transform, opacity',
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );

    contentRef.current &&
      timeline.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: 60,
          willChange: 'transform, opacity',
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.7'
      );

    gsap.fromTo(
      '.skill-item',
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
        willChange: 'transform, opacity',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const img = imageRef.current;
    if (img) {
      const enter = () =>
        gsap.to(img, {
          scale: 1.03,
          rotation: 1,
          duration: 0.3,
          ease: 'power2.out',
        });

      const leave = () =>
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        });

      img.addEventListener('mouseenter', enter);
      img.addEventListener('mouseleave', leave);

      return () => {
        img.removeEventListener('mouseenter', enter);
        img.removeEventListener('mouseleave', leave);
      };
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-28 h-28 bg-gradient-primary rounded-full opacity-30" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative will-change-transform">
            <div className="relative w-80 h-80 mx-auto">
              {/* Soft Glow */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-20 animate-pulse-glow" />

              <div className="relative w-full h-full rounded-full overflow-hidden glass-card border-2 border-primary/30">
                <img
                  src="/lovable-uploads/c32788fd-9b12-4dbf-9f99-10ffac61a44f.png"
                  alt="Parv - Web Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Minimal Floating Orbs */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-neon-blue rounded-full opacity-20" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-neon-purple rounded-full opacity-20" />
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="space-y-8 will-change-transform"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Hi there! I'm Parv, a passionate web developer who specializes
                  in creating stunning digital experiences that blend innovative
                  design with cutting-edge technology.
                </p>
                <p>
                  With expertise in modern frameworks like React, GSAP
                  animations, and 3D web technologies, I transform ideas into
                  immersive web applications that captivate users and drive
                  results.
                </p>
                <p>
                  I believe in the power of clean code, beautiful design, and
                  seamless user experiences. Every project is an opportunity to
                  push boundaries and create something extraordinary.
                </p>
              </div>
            </div>

            {/* Technical expertise */}
            <div>
              <h3 className="text-2xl font-medium mb-4 text-primary">
                Technical Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'GSAP', 'Bootstrap', 'Redux', 'Tailwind CSS'].map((tech) => (
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
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="skill-item glass-card p-6 text-center hover:glow-blue transition-all duration-300 cursor-pointer group will-change-transform"
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
