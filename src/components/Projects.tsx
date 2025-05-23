import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: "Trading Bot Platform",
    description: "An advanced trading bot that analyses historical price data, calculates technical indicators, and generates trading signals. Features include RSI analysis, moving averages, and real-time market overview.",
    tags: ["React", "TypeScript", "Chart.js", "Technical Analysis"],
    image: "/assets/images/bot1.png",
    liveLink: '/trading-bot',
    githubLink: 'https://github.com/MatthewRInnes/trading-bot',
    detailsLink: '/projects/trading-bot'
  },
  {
    id: 2,
    title: "Matthew's Clothing Store",
    description: "Matthew's Clothing is a premium fashion e-commerce website specialising in high-quality clothing and accessories for men and women. The website features a responsive design, dark/light theme toggle, interactive product gallery, customer reviews carousel, newsletter subscription, contact form with validation, search suggestions, mobile-friendly navigation, and social media integration.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap 4.6.2", "jQuery", "Font Awesome", "Google Fonts"],
    image: "/assets/images/clothestop1.png",
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/MatthewRInnes/mattsclothes',
    detailsLink: '/projects/clothing-store'
	},
  {
    id: 3,
    title: "Digital Vision Agency",
    description: "A modern, responsive portfolio website for showcasing digital agency services and projects. Built with React, TypeScript, and Tailwind CSS. Features a clean, professional design with smooth animations and transitions, modern UI components with shadcn/ui, an interactive portfolio slider, service showcase with pricing, contact form with validation, SEO optimisation, and social media integration.",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn-ui", "Framer Motion", "SEO"],
    image: "/assets/images/digitalVision1.png",
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/MatthewRInnes/digital-Vision',
    detailsLink: '/projects/digital-vision'
  },
  {
    id: 4,
    title: "VAT Calculator",
    description: "Savvy VAT Wizard is a smart VAT calculator for UK businesses that helps calculate VAT amounts quickly and accurately. Features include support for both standard and reduced VAT rates, multiple calculation methods (gross, net, and VAT amount), a clean and intuitive user interface, and mobile-responsive design. Built with React and TypeScript.",
    tags: ["React", "TypeScript", "VAT", "Responsive Design"],
    image: "/assets/images/vat1.png",
    video: "/assets/videos/vat CalculatorVideo.mp4",
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/MatthewRInnes/vat-calculatorv1',
    detailsLink: '/projects/vat-calculator'
  }
];

// Available project categories for filtering
const categories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "Data Visualisation",
  "UI/UX Design"
];

// Main Projects component
const Projects = () => {
  // State management for active category and selected project
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Shared observer: track which cards are visible
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(projects.length).fill(false));
  // Create an array of refs for each card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set up a single IntersectionObserver for all cards
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              if (prev[index]) return prev; // Already visible
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.05, // Trigger as soon as card is slightly visible
        rootMargin: '0px', // No offset, trigger immediately
      }
    );
    // Observe each card
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    // Cleanup
    return () => observer.disconnect();
  }, [activeCategory]);

  // Filter projects based on selected category
  const filteredProjects = projects.filter(project => 
    activeCategory === "All" || project.tags.includes(activeCategory)
  );

  return (
    // Main projects section container
    <section id="projects" className="py-16 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-lightestSlate mr-4">
            <span className="text-teal">01.</span> Projects
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>

        {/* Category filter buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-teal text-white"
                  : "bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate hover:bg-primary/10 dark:hover:bg-teal/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => {
            // Attach ref and data-index for observer
            const projectIndex = projects.findIndex(p => p.id === project.id);
            return (
              <div
                key={project.id}
                ref={el => cardRefs.current[projectIndex] = el}
                data-index={projectIndex}
                // Animate in if visible
                className={`bg-white dark:bg-navy/80 rounded-lg overflow-hidden shadow-lg border border-border dark:border-slate/20 transition-all duration-700 ${visibleCards[projectIndex] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                {/* Project image with gradient overlay */}
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                {/* Project details container */}
                <div className="p-6">
                  {/* Project title */}
                  <h3 className="text-xl font-semibold text-foreground dark:text-lightestSlate mb-2">
                    {project.title}
                  </h3>
                  {/* Project description */}
                  <p className="text-foreground/70 dark:text-lightSlate mb-4">
                    {project.description}
                  </p>
                  {/* Project tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Project links */}
                  <div className="flex gap-4 items-center">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <Link
                      to={project.detailsLink}
                      className="ml-auto px-4 py-2 bg-teal text-white rounded-md hover:bg-teal/90 transition-colors duration-300"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
