import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * DigitalVisionDetails Component
 * 
 * This component displays detailed information about the Digital Vision Agency project.
 * It showcases the agency's portfolio website with multiple images, a video demonstration,
 * and comprehensive project details. The component maintains consistent styling with the
 * main portfolio website.
 */
const DigitalVisionDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dark:bg-navy py-12">
      <div className="container mx-auto px-4">
        {/* Back button and header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-teal hover:text-teal/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground dark:text-lightestSlate mt-4">
            Digital Vision Agency
          </h1>
        </div>

        {/* Project overview */}
        <div className="bg-white dark:bg-navy/80 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-4">
            Project Overview
          </h2>
          <p className="text-foreground/70 dark:text-lightSlate mb-4">
            A professional portfolio website for a digital agency, showcasing its services, projects, and team members. Built with React and featuring smooth animations, this project demonstrates modern web development techniques and creative design principles.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              React
            </span>
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              Framer Motion
            </span>
          </div>
        </div>

        {/* Video demonstration replaced with image for deployment compatibility */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-4">
            Project Visual
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src="/assets/images/digitalVision1.png"
              alt="Digital Vision Demo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Project images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { src: "/assets/images/digitalVision1.png", alt: "Digital Vision Example 1" },
            { src: "/assets/images/digitalVision2.png", alt: "Digital Vision Example 2" },
            { src: "/assets/images/digitalVision3.png", alt: "Digital Vision Example 3" },
            { src: "/assets/images/digitalVision5.png", alt: "Digital Vision Example 5" },
          ].map((img, idx) => (
            <div
              key={img.src}
              className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg flex justify-center items-center bg-background dark:bg-navy/80 p-2 border border-slate-200 dark:border-slate-700"
              style={{ minHeight: '140px', maxHeight: '220px' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Key features */}
        <div className="bg-white dark:bg-navy/80 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-foreground/70 dark:text-lightSlate space-y-2">
            <li>Modern, responsive design with smooth animations</li>
            <li>Interactive portfolio gallery with filter options</li>
            <li>Dynamic profiles of team members and service showcases</li>
            <li>Optimised performance using lazy loading and code splitting</li>
            <li>Accessible design, following WCAG guidelines</li>
            <li>Reliable performance across all major browsers, with a mobile-first layout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DigitalVisionDetails; 