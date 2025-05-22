/**
 * Experience Component
 * A comprehensive professional experience and education showcase.
 * Features animated skill progress bars, interactive cards, and responsive design.
 * Includes professional work history and educational achievements with detailed skill breakdowns.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Briefcase, School } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

// Professional work experience data
const experiences = [
  {
    title: "Web Developer",
    company: "RIVERBANK CONSTRUCTION LTD",
    type: "Self-employed",
    period: "Apr 2024 - May 2025 · 1 yr 2 mos",
    location: "United Kingdom · Remote",
    description: "Responsible for website maintenance, Cyber Security updates, and ongoing improvements to ensure smooth performance and user experience. Manage Facebook promotion and advertising campaigns to boost online presence and engagement. Also create custom graphics for marketing materials, social media and website content to support branding and customer outreach.",
    skills: ["Customer Service", "Business Analysis", "Social Media", "Facebook", "Adobe Creative Suite", "Figma", "Canva", "Graphic Design", "Problem Solving", "Content Management Systems (CMS)", "Cybersecurity"]
  }
];

// Educational history data with detailed skill progressions
const education = [
  {
    degree: "HND, Web Development & Digital Design",
    institution: "New College Lanarkshire",
    period: "Aug 2024 - Jun 2025",
    grade: "TBA",
    description: "Currently pursuing an HND in Web Development & Digital Design at New College Lanarkshire, where I'm immersing myself in the cutting-edge world of digital creation. My academic journey has equipped me with a robust foundation in both front-end and back-end development, complemented by comprehensive digital project management expertise. I've mastered the art of crafting responsive, user-centric web applications using modern technologies including HTML5, CSS, JavaScript, jQuery, and PHP, alongside industry-standard frameworks like Bootstrap. My toolkit extends to collaborative platforms such as GitHub, design tools like Figma and Canva, and project management solutions including Monday.com. My practical experience encompasses developing interactive gaming experiences, constructing sophisticated e-commerce platforms, implementing user-centred design principles, and deploying effective SEO strategies. I've also delved into advanced topics including Cybersecurity, Content Management Systems, particularly WordPress, and UX research methodologies. Beyond my academic commitments, I've ventured into mobile app development using .NET MAUI and Flutter, while gaining hands-on experience with cloud platforms including GoDaddy and AWS.",
    skills: ["UX Research", "Oracle Database", "Express.js", "Social Media", "Canva", "Product Development", "Front-End Development", "Search Engine Optimisation (SEO)", "User-centred Design", "Adobe Creative Suite", "Video Production", "Content Management Systems (CMS)", "JavaScript", "Php My Admin", "Leadership", "User Interface Design", "jQuery", "Cascading Style Sheets (CSS)", "Databases", "Flutter", "E-Commerce", "PHP", "Information Technology", "User Experience (UX)", "Off-Page SEO", "Time Management", "Web Design", "Motion Design", "Word Press Design", "UI design", "Research Skills", "Figma (Software)", "Brand Development", "User Experience Design (UED)", "Music Production", "Organisational Development", "Web Development", "Teamwork", "Information Architecture", "Microsoft Office", "Web Services", "Usability Testing", "Facebook", "DJing", "HTML5", "Internet Security", "PHP Applications", "HTML", "Tailwind CSS", "W.A.M.P Stack", "Python (Programming Language)", "Digital Marketing", "Logo Design", "J.A.M stack", "Graphic Design", "Network Security", "Linux", "GitHub", "Adobe Photoshop", "Online Advertising", "Strategic Planning", "Full-Stack Development", "Microsoft Word", "React.js", "Problem Solving", "Git", "Bootstrap", "Software Development"],
    progressSkills: [
      { name: "HTML/CSS", value: 90 },
      { name: "JavaScript", value: 85 },
      { name: "React", value: 80 },
      { name: "PHP", value: 75 },
      { name: "UI/UX Design", value: 85 }
    ]
  },
  {
    degree: "HNC, Web Development & Digital Design",
    institution: "New College Lanarkshire",
    period: "Aug 2023 - Jun 2024",
    grade: "A",
    activities: "Web Design & Web Development",
    description: "During my HNC studies, I cultivated a sophisticated understanding of web development and digital design, focusing on both theoretical knowledge and practical implementation. My expertise spans the full spectrum of web development, with particular emphasis on the W.A.M.P and J.A.M stacks, enabling me to construct secure and efficient web solutions underpinned by robust information architecture principles. In the realm of content management, I've developed proficiency in WordPress customisation and web security maintenance, complemented by comprehensive front-end development skills and database management expertise using PhpMyAdmin. My creative capabilities have flourished through extensive work with Adobe Creative Suite, where I've specialised in Illustrator, Photoshop, and After Effects, crafting distinctive visual identities and logos that effectively communicate brand objectives.",
    skills: ["UX Research", "Analytical Skills", "Programming", "Social Media", "Canva", "Front-End Development", "Computer Forensics", 
      "Search Engine Optimisation (SEO)",
      "User-centred Design", "Adobe Creative Suite", "Content Management Systems (CMS)", "JavaScript", "PhpMyAdmin", "User Interface Design", "jQuery", "Cascading Style Sheets (CSS)", "E-Commerce", "PHP", "Information Technology", "User Experience (UX)", "Time Management", "Web Design", "Motion Design", "WordPress Design", "UI design", "Research Skills", "Figma (Software)", "Audio Mixing", "Brand Development", "User Experience Design (UED)", "Architectural Design", "Music Production", "Web Development", "Teamwork", "Information Architecture", "Web Services", "Usability Testing", "HTML5", "HTML", "Python (Programming Language)", "Cybersecurity", "Logo Design", "J.A.M stack", "Graphic Design", "GitHub", "Adobe Photoshop", "Strategic Planning", "Microsoft Word", "3D Animation", "3D Graphics", "Problem Solving", "Front-end Coding", "Adobe Illustrator", "Bootstrap", "Cybersecurity Tools", "Software Development"],
    progressSkills: [
      { name: "HTML/CSS", value: 80 },
      { name: "JavaScript", value: 75 },
      { name: "WordPress", value: 85 },
      { name: "UI/UX Design", value: 70 },
      { name: "Graphic Design", value: 80 }
    ]
  },
  {
    degree: "Digital Media",
    institution: "New College Lanarkshire",
    period: "2022 - 2023",
    grade: "level 4",
    activities: "HTML, CSS, Java Script, Word Press. Video and Sound editing & Image Editing",
    description: "My inaugural year at New College Lanarkshire provided a solid foundation in web development and multimedia production through hands-on project work. In web development, I focused on creating elegant, responsive layouts using HTML, CSS, and JavaScript, with particular attention to enhancing user interaction through dynamic functionality. My experience with content management systems centred on WordPress, where I developed expertise in theme customisation, plugin integration, and bespoke code implementation. The multimedia aspect of my studies encompassed comprehensive training in video and audio editing, enabling me to create polished, professional-grade content. My proficiency in image manipulation was developed through extensive work with Adobe Photoshop and Canva, focusing on photo enhancement, graphic design, and web optimisation techniques.",
    skills: ["Video Production", "JavaScript", "Cybercrime Investigation", "Apache", "Word Press Design", "HTML5", "Python (Programming Language)", "Cybersecurity", "Graphic Design", "GitHub", "Full-Stack Development", "CSS Flexbox", "Php my Admin"],
    progressSkills: [
      { name: "HTML/CSS", value: 60 },
      { name: "JavaScript", value: 50 },
      { name: "Word Press", value: 65 },
      { name: "Video Editing", value: 75 },
      { name: "Photo Editing", value: 70 }
    ]
  }
];

// Custom hook for managing element visibility and animation states
const useElementOnScreen = (options) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    }, {
      ...options,
      rootMargin: '-100px 0px', // Changed from '0px 0px' to trigger 100px before element enters viewport
      threshold: 0.001 // Changed from 0.01 to trigger even earlier
    });

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref: containerRef, isVisible };
};

// Component for rendering animated skill progress bars
const SkillProgress = ({ skill, isVisible, delay }) => {
  // State for the progress bar value
  const [progress, setProgress] = useState(0);
  // State for the animated number
  const [displayed, setDisplayed] = useState(0);
  // State to trigger bounce effect
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    let timeout;
    let numberTimeout;
    if (!isVisible) {
      setProgress(0);
      setDisplayed(0);
      setBounce(false);
      return;
    }
    if (isVisible) {
      timeout = setTimeout(() => {
        // Animate the progress bar value
        const incrementProgress = () => {
          setProgress(prev => {
            const nextValue = prev + 1;
            if (nextValue >= skill.value) {
              setBounce(true); // Trigger bounce at the end
              return skill.value;
            }
            setTimeout(incrementProgress, 12); // Fast fill for a modern feel
            return nextValue;
          });
        };
        incrementProgress();
      }, delay);
      // Animate the number counting up in sync with the bar
      numberTimeout = setTimeout(() => {
        const incrementNumber = () => {
          setDisplayed(prev => {
            const next = prev + 1;
            if (next >= skill.value) return skill.value;
            setTimeout(incrementNumber, 18); // Slightly slower for a smooth effect
            return next;
          });
        };
        incrementNumber();
      }, delay);
    }
    return () => {
      clearTimeout(timeout);
      clearTimeout(numberTimeout);
    };
  }, [isVisible, skill.value, delay]);

  // Reset bounce after animation
  useEffect(() => {
    if (bounce) {
      const bounceTimeout = setTimeout(() => setBounce(false), 400);
      return () => clearTimeout(bounceTimeout);
    }
  }, [bounce]);

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-foreground dark:text-white">{skill.name}</span>
        {/* Animated number counting up */}
        <span className="text-sm font-semibold text-accent dark:text-teal transition-all duration-300">{displayed}%</span>
      </div>
      {/* Progress bar with bounce effect at the end */}
      <div className={`transition-transform duration-300 ${bounce ? 'scale-105' : ''}`}>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

// Main Experience component
const Experience = () => {
  // State management for progress animations
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Intersection observer hooks for various sections with earlier trigger points
  const { ref: progressSectionRef, className: progressClassName } = useIntersectionObserver({
    direction: 'bottom',
    threshold: 0.001,
    rootMargin: '-100px 0px' // Changed from '0px 0px' to trigger 100px before element enters viewport
  });

  // Effect for managing progress animation visibility
  useEffect(() => {
    if (progressSectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { 
          threshold: 0.001, // Changed from 0.01 to trigger earlier
          rootMargin: '-100px 0px' // Changed from '0px 0px' to trigger 100px before element enters viewport
        }
      );

      observer.observe(progressSectionRef.current);
      return () => observer.disconnect();
    }
  }, [progressSectionRef]);

  // Refs for animation sections with earlier trigger points
  const expTitleSection = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  const expItemsSection = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  const eduTitleSection = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  
  // Individual refs for education cards with earlier trigger points
  const hndCardRef = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  const hncCardRef = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  const digitalMediaCardRef = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  
  // Individual refs for skills sections with earlier trigger points
  const hndSkillsRef = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  const hncSkillsRef = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });
  const digitalMediaSkillsRef = useElementOnScreen({ threshold: 0.001, rootMargin: '-100px 0px' });

  return (
    // Main experience section container
    <section id="experience" className="py-16 bg-background dark:bg-navy text-foreground dark:text-lightSlate">
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white mr-4">
            <span className="text-black dark:text-teal">03.</span> Experience
          </h2>
          <div className="flex-grow h-px bg-border dark:bg-slate/30"></div>
        </div>
        
        {/* Professional Experience section */}
        <h3 
          ref={expTitleSection.ref} 
          className={`text-xl md:text-2xl font-bold mb-4 text-foreground dark:text-white flex items-center transition-all duration-400
            ${expTitleSection.isVisible ? "opacity-100 translate-x-0 scale-110 animate-bounce" : "opacity-0 -translate-x-10 scale-90"}
          `}
          style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <Briefcase className="mr-2 text-black dark:text-teal" size={24} /> 
          Professional Experience
        </h3>
        
        {/* Experience cards container */}
        <div 
          ref={expItemsSection.ref} 
          className="space-y-6 mb-8"
        >
          {/* Map through experiences to create individual cards */}
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`bg-card dark:bg-navy/50 p-6 rounded-lg border border-border dark:border-slate/10 hover:border-accent dark:hover:border-teal/30 transition-all duration-400 hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-teal/5 ${
                expItemsSection.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: `${index * 60}ms`,
              }}
            >
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                  <div className="flex items-center text-black dark:text-teal mb-2">
                    <Briefcase size={18} className="mr-2 text-black dark:text-teal" />
                    <h3 className="font-bold text-xl text-foreground dark:text-white">{exp.title}</h3>
                  </div>
                  <div className="text-foreground dark:text-lightSlate font-medium mb-1">
                    {exp.company} · {exp.type}
                  </div>
                  <div className="text-black dark:text-slate flex items-center text-sm mb-1 font-medium">
                    <Calendar size={14} className="mr-1 text-black dark:text-slate" /> 
                    {exp.period}
                  </div>
                  <div className="text-black dark:text-slate text-sm font-medium">
                    {exp.location}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-foreground dark:text-lightSlate mb-4 font-medium">{exp.description}</p>
                  <div className="mb-2 text-sm font-semibold text-accent dark:text-teal">Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className={`px-2 py-1 bg-accent/10 dark:bg-navy border border-black dark:border-teal text-foreground dark:text-teal text-xs font-medium rounded-full transition-all duration-500 ${
                          expItemsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ 
                          transitionDelay: `${skillIndex * 200 + 100}ms`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Education section header */}
        <h3 
          ref={eduTitleSection.ref}
          className={`text-xl md:text-2xl font-bold mb-4 text-foreground dark:text-white flex items-center transition-all duration-400
            ${eduTitleSection.isVisible ? "opacity-100 translate-x-0 scale-110 animate-bounce" : "opacity-0 -translate-x-10 scale-90"}
          `}
          style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <School className="mr-2 text-black dark:text-teal" size={24} /> 
          Education
        </h3>
        
        {/* Education cards container */}
        <div className="space-y-6">
          {/* Map through education data to create individual cards */}
          {education.map((edu, index) => {
            let cardRef;
            let skillsRef;
            
            // Assign the appropriate refs based on the education level
            if (edu.degree.includes('HND')) {
              cardRef = hndCardRef;
              skillsRef = hndSkillsRef;
            } else if (edu.degree.includes('HNC')) {
              cardRef = hncCardRef;
              skillsRef = hncSkillsRef;
            } else {
              cardRef = digitalMediaCardRef;
              skillsRef = digitalMediaSkillsRef;
            }
            
            return (
              <div 
                key={index}
                ref={cardRef.ref}
                className={`bg-card dark:bg-navy/50 p-6 rounded-lg border border-border dark:border-slate/10 hover:border-accent dark:hover:border-teal/30 transition-all duration-400 hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-teal/5 ${
                  cardRef.isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-20"
                }`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-black dark:text-teal mb-2">
                        <School size={18} className="mr-2 text-black dark:text-teal" />
                        <h3 className="font-bold text-xl text-foreground dark:text-white">{edu.degree}</h3>
                      </div>
                      <div className="text-foreground dark:text-lightSlate font-medium mb-1">
                        {edu.institution}
                      </div>
                      <div className="text-black dark:text-slate flex items-center text-sm mb-1 font-medium">
                        <Calendar size={14} className="mr-1 text-black dark:text-slate" /> 
                        {edu.period}
                      </div>
                      <div className="text-black dark:text-teal text-sm font-semibold mb-1">
                        Grade: {edu.grade}
                      </div>
                      {edu.activities && (
                        <div className="text-foreground/80 dark:text-slate text-sm font-medium">
                          <strong className="text-foreground dark:text-lightSlate">Activities:</strong> {edu.activities}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-foreground dark:text-lightSlate whitespace-pre-line font-medium">{edu.description}</p>
                    
                    {/* Skills label with improved contrast */}
                    <div className="mb-2 text-sm font-semibold text-black dark:text-teal">Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      {/* For the HND, HNC, and Digital Media cards, show all skills, not just a subset */}
                      {(edu.degree.includes('HND') || edu.degree.includes('HNC') || edu.degree.includes('Digital Media')
                        ? edu.skills
                        : edu.skills.slice(0, 12)
                      ).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className={`px-2 py-1 bg-accent/10 dark:bg-navy border border-black dark:border-teal text-foreground dark:text-teal text-xs font-medium rounded-full transition-all duration-300 ${
                            cardRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                          style={{ 
                            transitionDelay: `${skillIndex * (edu.degree.includes('Digital Media') ? 150 : 30) + 100}ms`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {/* Only show '+X more' badge for cards that are not HND, HNC, or Digital Media */}
                      {(!edu.degree.includes('HND') && !edu.degree.includes('HNC') && !edu.degree.includes('Digital Media') && edu.skills.length > 12) && (
                        <span className="px-2 py-1 bg-accent/10 dark:bg-navy border border-black dark:border-teal text-foreground dark:text-teal text-xs font-medium rounded-full">
                          +{edu.skills.length - 12} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div ref={skillsRef.ref} className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
                        Key Skills Proficiency
                      </h4>
                      <div className="space-y-4">
                        {edu.progressSkills.map((skill, idx) => (
                          <SkillProgress 
                            key={idx} 
                            skill={skill} 
                            isVisible={skillsRef.isVisible} 
                            delay={idx * 50} // Reduced delay between skills (changed from 100/200 to 50)
                          />
                        ))}
                      </div>
                    </div>
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

export default Experience;
