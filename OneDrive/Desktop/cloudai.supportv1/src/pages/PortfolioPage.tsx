import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, Code, Palette, Monitor, Film, FileImage, SearchCheck, Shield,
  ExternalLink, Calendar, Award, Users, Star, Clock, Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/Animation/AnimatedSection";
import { StaggeredContainer } from "@/components/Animation/StaggeredContainer";
import { CountUp } from "@/components/Animation/CountUp";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  imageSrc: string;
  client: string;
  completedDate: string;
  technologies: string[];
  link?: string;
  featured?: boolean;
}

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  imageSrc: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    category: "web",
    type: "Website Development",
    description: "A fully responsive e-commerce website built with React and Node.js, featuring product filtering, user accounts, and secure checkout.",
    imageSrc: "/images/project-1.jpg",
    client: "StyleBoutique",
    completedDate: "January 2023",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    link: "https://example.com/project1",
    featured: true
  },
  {
    id: 2,
    title: "Corporate Website Redesign",
    category: "web",
    type: "UI/UX Design",
    description: "Complete redesign of a corporate website with focus on user experience, accessibility, and modern design principles.",
    imageSrc: "/images/project-2.jpg",
    client: "TechCorp Inc.",
    completedDate: "March 2023",
    technologies: ["Figma", "Adobe XD", "HTML/CSS", "JavaScript", "WordPress"],
    link: "https://example.com/project2"
  },
  {
    id: 3,
    title: "Mobile Banking App",
    category: "web",
    type: "Web App Development",
    description: "Secure and user-friendly mobile banking application with real-time transaction tracking and budget management features.",
    imageSrc: "/images/project-3.jpg",
    client: "SecureBank",
    completedDate: "May 2023",
    technologies: ["React Native", "Firebase", "Redux", "JWT", "Biometric Auth"],
    featured: true
  },
  {
    id: 4,
    title: "Product Explainer Video",
    category: "video",
    type: "Motion Graphics",
    description: "Engaging 2-minute explainer video highlighting the key features and benefits of a SaaS product.",
    imageSrc: "/images/project-4.jpg",
    client: "CloudSoft Solutions",
    completedDate: "June 2023",
    technologies: ["After Effects", "Premier Pro", "Illustrator", "Audition"],
    link: "https://example.com/video1"
  },
  {
    id: 5,
    title: "Brand Identity Package",
    category: "graphics",
    type: "Graphic Design",
    description: "Complete brand identity package including logo design, color palette, typography, and brand guidelines.",
    imageSrc: "/images/project-5.jpg",
    client: "Green Earth Organics",
    completedDate: "August 2023",
    technologies: ["Illustrator", "Photoshop", "InDesign"],
    featured: true
  },
  {
    id: 6,
    title: "E-commerce Security Audit",
    category: "security",
    type: "Cyber Security",
    description: "Comprehensive security audit and implementation of enhanced security measures for an e-commerce platform.",
    imageSrc: "/images/project-6.jpg",
    client: "Fashion Outlet Online",
    completedDate: "September 2023",
    technologies: ["Penetration Testing", "Vulnerability Assessment", "SSL/TLS", "PCI DSS"],
  },
  {
    id: 7,
    title: "SEO Performance Boost",
    category: "seo",
    type: "SEO Optimization",
    description: "SEO strategy implementation that resulted in 200% increase in organic traffic and improved search rankings.",
    imageSrc: "/images/cyber-security.jpg",
    client: "Local Dental Clinic",
    completedDate: "October 2023",
    technologies: ["Keyword Research", "On-page SEO", "Technical SEO", "Content Strategy"],
    featured: true
  },
  {
    id: 8,
    title: "Social Media Campaign",
    category: "graphics",
    type: "Digital Marketing",
    description: "Series of eye-catching graphics and animations for a seasonal marketing campaign across multiple social media platforms.",
    imageSrc: "/images/templates-graphics.jpg",
    client: "Summer Vibes Festival",
    completedDate: "July 2023",
    technologies: ["Photoshop", "Illustrator", "After Effects", "Social Media APIs"],
  },
  {
    id: 9,
    title: "Custom CMS Development",
    category: "web",
    type: "Web Development",
    description: "Tailor-made content management system for a publishing company with specialized workflow and approval processes.",
    imageSrc: "/images/web-development.jpg",
    client: "Global Publishing House",
    completedDate: "November 2023",
    technologies: ["PHP", "Laravel", "MySQL", "Vue.js", "API Development"],
    link: "https://example.com/project9"
  }
];

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "E-commerce Platform Transformation",
    description: "How we helped an established retail business transition to online sales during the pandemic.",
    challenge: "Our client needed to quickly pivot to online sales when their physical stores were forced to close. They required a solution that could be implemented rapidly while maintaining their brand identity and providing an excellent customer experience.",
    solution: "We developed a custom e-commerce platform using React and Node.js with Stripe integration. The platform included product management, inventory tracking, secure payment processing, and customer account features.",
    results: [
      "300% ROI within first 6 months",
      "50% reduction in operation costs",
      "Expanded customer base to international markets",
      "Increased average order value by 25%"
    ],
    testimonial: {
      quote: "The team delivered exactly what we needed in record time. Our online store not only saved our business during lockdowns but has become our primary revenue channel even after reopening our physical locations.",
      author: "Sarah Johnson",
      position: "CEO, StyleBoutique"
    },
    imageSrc: "/images/project-1.jpg"
  },
  {
    id: 2,
    title: "Enterprise Security Overhaul",
    description: "Comprehensive security infrastructure upgrade for a financial services company.",
    challenge: "After experiencing a minor security breach, our client needed to completely revamp their security infrastructure to protect sensitive financial data and rebuild customer trust.",
    solution: "We implemented a multi-layered security approach including penetration testing, vulnerability assessments, enhanced encryption, multi-factor authentication, and employee security training.",
    results: [
      "Zero security incidents since implementation",
      "Passed all regulatory compliance audits with flying colors",
      "Restored customer confidence with transparent security practices",
      "Reduced insurance premiums by demonstrating robust security measures"
    ],
    testimonial: {
      quote: "The security solutions implemented have given us peace of mind knowing our clients' data is protected by industry-leading measures. The thorough approach and ongoing support have been invaluable.",
      author: "Michael Chang",
      position: "CTO, Financial Services Inc."
    },
    imageSrc: "/images/project-6.jpg"
  }
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredProjects = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);
  
  const featuredProjects = portfolioItems.filter(item => item.featured);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Our Portfolio</h1>
        <AnimatedSection direction="up">
          <section className="bg-gradient-to-br from-shop-primary to-shop-dark py-16">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
                <p className="text-lg mb-8 text-white/90">
                  Explore our collection of work spanning web development, design, cyber security, and digital marketing.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-shop-primary"
                    asChild
                  >
                    <a href="#work">View Our Work</a>
                  </Button>
                  <Button 
                    className="bg-shop-secondary hover:bg-shop-secondary/90"
                    asChild
                  >
                    <Link to="/services">Our Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-3">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of our best work across different specialties
            </p>
          </div>
        </AnimatedSection>
        
        <StaggeredContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden project-card card-hover backdrop-blur-sm dark:bg-shop-dark/80">
              <div className="h-60 overflow-hidden">
                <img 
                  src={project.imageSrc} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-shop-secondary text-white mb-2">{project.type}</Badge>
                  {project.featured && (
                    <Badge variant="outline" className="border-shop-accent text-shop-accent">
                      <Star className="h-3 w-3 mr-1" /> Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.client}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{project.completedDate}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                {project.link && (
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <span>Visit</span> <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </StaggeredContainer>
        
        <section id="work" className="py-16 bg-white dark:bg-shop-dark/90">
          <div className="container-custom">
            <AnimatedSection direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-3">Our Work</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Browse our portfolio by category
                </p>
              </div>
            
              <Tabs defaultValue="all" className="mb-8" onValueChange={setFilter}>
                <div className="flex justify-center">
                  <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="web">Web</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="graphics">Graphics</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </AnimatedSection>
            
            <StaggeredContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map(project => (
                <Card key={project.id} className="overflow-hidden project-card dark:bg-shop-dark/80">
                  <div className="h-52 overflow-hidden">
                    <img 
                      src={project.imageSrc} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <Badge className="inline-block w-fit mb-2 bg-shop-secondary text-white">{project.type}</Badge>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Briefcase className="h-3.5 w-3.5 mr-1" />
                      {project.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-muted-foreground text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="bg-shop-light/50 dark:bg-shop-dark/70">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="bg-shop-light/50 dark:bg-shop-dark/70">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View Project Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </section>
        
        <section className="py-16 bg-shop-light dark:bg-shop-dark">
          <div className="container-custom">
            <AnimatedSection direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-3">Case Studies</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Dive deeper into some of our most successful projects
                </p>
              </div>
            </AnimatedSection>
            
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <AnimatedSection key={study.id} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.1}>
                  <Card className="overflow-hidden dark:bg-shop-dark/80">
                    <div className={`grid md:grid-cols-2 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="h-full">
                        <img 
                          src={study.imageSrc} 
                          alt={study.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-shop-primary dark:text-white mb-2">{study.title}</h3>
                        <p className="text-lg mb-4">{study.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-shop-primary dark:text-white mb-1">The Challenge</h4>
                          <p className="text-muted-foreground">{study.challenge}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-shop-primary dark:text-white mb-1">Our Solution</h4>
                          <p className="text-muted-foreground">{study.solution}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-shop-primary dark:text-white mb-1">Results</h4>
                          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                            {study.results.map((result, idx) => (
                              <li key={idx}>{result}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {study.testimonial && (
                          <div className="mt-6 p-4 border-l-4 border-shop-secondary bg-shop-light/30 dark:bg-shop-dark/70 italic">
                            <p className="mb-2">"{study.testimonial.quote}"</p>
                            <div className="text-sm text-shop-secondary font-medium">
                              {study.testimonial.author}, {study.testimonial.position}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white dark:bg-shop-dark/90">
          <div className="container-custom">
            <AnimatedSection direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-shop-primary dark:text-white mb-3">Our Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive digital solutions for businesses of all sizes
                </p>
              </div>
            </AnimatedSection>
            
            <StaggeredContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="service-item flex flex-col">
                <div className="mb-4 flex items-center">
                  <div className="feature-icon mr-3">
                    <Code className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-shop-primary dark:text-white">Web Development</h3>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Custom websites and web applications built with modern technologies and best practices.
                </p>
                <Button variant="outline" size="sm" className="mt-2 self-start" asChild>
                  <Link to="/services#webdev">Learn More</Link>
                </Button>
              </div>
              
              <div className="service-item flex flex-col">
                <div className="mb-4 flex items-center">
                  <div className="feature-icon mr-3">
                    <Palette className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-shop-primary dark:text-white">Web Design</h3>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Beautiful, intuitive designs that enhance user experience and reinforce brand identity.
                </p>
                <Button variant="outline" size="sm" className="mt-2 self-start" asChild>
                  <Link to="/services#webdesign">Learn More</Link>
                </Button>
              </div>
              
              <div className="service-item flex flex-col">
                <div className="mb-4 flex items-center">
                  <div className="feature-icon mr-3">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-shop-primary dark:text-white">Cyber Security</h3>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Comprehensive protection for your digital assets against modern cyber threats.
                </p>
                <Button variant="outline" size="sm" className="mt-2 self-start" asChild>
                  <Link to="/services#cybersecurity">Learn More</Link>
                </Button>
              </div>
              
              <div className="service-item flex flex-col">
                <div className="mb-4 flex items-center">
                  <div className="feature-icon mr-3">
                    <SearchCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-shop-primary dark:text-white">SEO Services</h3>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Data-driven strategies to improve your visibility and drive organic traffic.
                </p>
                <Button variant="outline" size="sm" className="mt-2 self-start" asChild>
                  <Link to="/services#seo">Learn More</Link>
                </Button>
              </div>
              
              <div className="service-item flex flex-col">
                <div className="mb-4 flex items-center">
                  <div className="feature-icon mr-3">
                    <FileImage className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-shop-primary dark:text-white">Graphics & Templates</h3>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Premium visual assets to elevate your brand's presence across all platforms.
                </p>
                <Button variant="outline" size="sm" className="mt-2 self-start" asChild>
                  <Link to="/services#templates">Learn More</Link>
                </Button>
              </div>
              
              <div className="service-item flex flex-col">
                <div className="mb-4 flex items-center">
                  <div className="feature-icon mr-3">
                    <Film className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-shop-primary dark:text-white">Video Production</h3>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Engaging video content for marketing, training, and product demonstrations.
                </p>
                <Button variant="outline" size="sm" className="mt-2 self-start" asChild>
                  <Link to="/services">Learn More</Link>
                </Button>
              </div>
            </StaggeredContainer>
          </div>
        </section>
        
        <AnimatedSection direction="up">
          <section className="py-16 bg-gradient-to-br from-shop-primary to-shop-dark text-white">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="glass p-6 rounded-lg">
                  <div className="text-4xl font-bold mb-2">
                    <CountUp end={120} suffix="+" />
                  </div>
                  <div className="text-white/80">Projects Completed</div>
                </div>
                <div className="glass p-6 rounded-lg">
                  <div className="text-4xl font-bold mb-2">
                    <CountUp end={45} suffix="+" delay={200} />
                  </div>
                  <div className="text-white/80">Happy Clients</div>
                </div>
                <div className="glass p-6 rounded-lg">
                  <div className="text-4xl font-bold mb-2">
                    <CountUp end={8} suffix="+" delay={400} />
                  </div>
                  <div className="text-white/80">Years Experience</div>
                </div>
                <div className="glass p-6 rounded-lg">
                  <div className="text-4xl font-bold mb-2">
                    <CountUp end={15} suffix="+" delay={600} />
                  </div>
                  <div className="text-white/80">Industry Awards</div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        <AnimatedSection direction="up">
          <section className="py-20 text-center bg-shop-light dark:bg-shop-dark">
            <div className="container-custom">
              <h2 className="text-3xl md:text-4xl font-bold text-shop-primary dark:text-white mb-6">Ready to Start Your Project?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Let's work together to create something amazing. Contact us today for a free consultation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-shop-secondary hover:bg-shop-secondary/90"
                  size="lg"
                  asChild
                >
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-shop-secondary text-shop-secondary hover:bg-shop-secondary hover:text-white"
                  size="lg"
                  asChild
                >
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </Layout>
  );
};

export default PortfolioPage;
