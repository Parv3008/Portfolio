import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Portfolio",
      description: "A stunning portfolio website featuring Spline 3D models, GSAP animations, and immersive user experience.",
      image: "/lovable-uploads/049642d4-ad87-46c7-a7ea-a006bd233b10.png",
      tech: ["React", "Spline", "GSAP", "Three.js"],
      featured: true
    },
    {
      id: 2,
      title: "Email for Developers",
      description: "A comprehensive email service platform designed specifically for developers with advanced API integration.",
      image: "/lovable-uploads/7d63522a-983c-427e-b2b7-b2177f72b567.png",
      tech: ["React", "Node.js", "API", "Email"],
      featured: true
    },
    {
      id: 3,
      title: "Next-Level Gaming UI",
      description: "Modern gaming interface with real-time data visualization and interactive 3D elements.",
      image: "/lovable-uploads/0399dc53-8383-40f8-9778-d893f26580d1.png",
      tech: ["React", "WebGL", "Real-time", "Gaming"],
      featured: false
    },
    {
      id: 4,
      title: "Animation Tools Platform",
      description: "Educational platform for learning web animation tools with interactive tutorials and examples.",
      image: "/lovable-uploads/ed8691b2-3e2d-4de3-95b7-80a3bd1fa27e.png",
      tech: ["GSAP", "Education", "Interactive", "Tutorials"],
      featured: false
    },
    {
      id: 5,
      title: "Portfolio Tutorial",
      description: "Step-by-step tutorial series for building animated portfolios with modern web technologies.",
      image: "/lovable-uploads/bccce192-bb43-4772-aea5-2ee998afaf95.png",
      tech: ["Tutorial", "Portfolio", "Animation", "Web Dev"],
      featured: false
    },
    {
      id: 6,
      title: "AuthKit Login System",
      description: "Beautiful and secure authentication system with glassmorphic design and smooth animations.",
      image: "/lovable-uploads/38ce5dc6-f2b3-4320-b636-65c7d859f498.png",
      tech: ["Auth", "Security", "UI/UX", "Backend"],
      featured: false
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.fromTo('.projects-title',
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

    // Project cards stagger animation
    gsap.fromTo('.project-card',
      { 
        opacity: 0, 
        y: 80,
        scale: 0.9,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Horizontal scroll for mobile
    if (window.innerWidth < 768) {
      gsap.to('.projects-container', {
        x: () => -(containerRef.current?.scrollWidth || 0) + window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: () => "+=" + (containerRef.current?.scrollWidth || 0),
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
    }
  }, []);

  const handleProjectClick = (projectId: number) => {
    // Handle project navigation
    console.log(`Navigate to project ${projectId}`);
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-primary rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full blur-3xl float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl md:text-5xl font-light mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects-title text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            A showcase of my latest work, featuring immersive web experiences, 
            cutting-edge animations, and innovative user interfaces.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="projects-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card glass-card overflow-hidden hover:glow-blue transition-all duration-500 cursor-pointer group ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              } ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay with action buttons */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button className="glass-card p-3 hover:glow-blue transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </button>
                  <button className="glass-card p-3 hover:glow-blue transition-all duration-300">
                    <GithubLogo size={20} />
                  </button>
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-primary px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-secondary/50 rounded-full border border-border hover:border-primary/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <button className="btn-primary text-lg px-8 py-4">
            View All Projects
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;