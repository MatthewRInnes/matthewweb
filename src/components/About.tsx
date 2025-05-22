/**
	* About Component
	* A personal introduction and skills showcase section.
	* Displays professional information, skills, and technologies
	* with animated elements and responsive design.
	*/

import React from 'react';
import { Code, Monitor, PenTool, Database } from 'lucide-react';

// Array of professional skills with corresponding icons
const skills = [
  { name: 'Frontend Development', icon: <Monitor className="h-10 w-10 text-teal" /> },
  { name: 'Backend Development', icon: <Database className="h-10 w-10 text-teal" /> },
  { name: 'UI/UX Design', icon: <PenTool className="h-10 w-10 text-teal" /> },
  { name: 'Clean Code', icon: <Code className="h-10 w-10 text-teal" /> },
];

// Array of technologies and programming languages
const technologies = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'Node.js',
  'Express',
  'Tailwind CSS',
  'MongoDB',
  'PostgreSQL',
];

// Main About component
const About = () => {
  return (
    // Main section container with padding and ID for navigation
    <section id="about" className="py-16 bg-background dark:bg-navy">
      <div className="container mx-auto px-6">
        {/* Section header with decorative line */}
        <div className="flex items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white mr-4">
            <span className="text-teal">01.</span> About Me
          </h2>
			<div className = "flex-grow h-px bg-border" ></div>
        </div>
        
        {/* Two-column grid layout for content and skills */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column: Personal introduction and technologies */}
          <div className="animate-fade-in-up">
            <p className="text-foreground dark:text-lightSlate mb-4 font-medium">
				Hello! I'm Matthew, a passionate software developer with a love for creating digital experiences that are both beautiful and functional. My journey in web development began back in 2015 when I decided to try creating a bespoke website - turns out developing a simple website taught me a lot about HTML & CSS!
            </p>
            <p className="text-foreground dark:text-lightSlate mb-4 font-medium">
				Fast forward to today, and I've had the privilege of working at an construction company as Web Developer, and designing a website for a charity. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
            </p>
            <p className="text-foreground dark:text-lightSlate mb-8 font-medium">
              Here are a few technologies I've been working with recently:
            </p>
            {/* Grid of technology items with decorative arrows */}
            <ul className="grid grid-cols-2 gap-2 text-foreground dark:text-lightSlate font-medium">
              {technologies.map((tech, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-teal mr-2">▹</span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right column: Skills cards with hover effects */}
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white/80 dark:bg-navy/80 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center backdrop-blur-sm border border-gradient-teal animate-fade-in-up hover:scale-105 transition-transform"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="flex justify-center mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-foreground font-semibold dark:text-white">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
