import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * VatCalculatorDetails Component
 * 
 * This component displays detailed information about the VAT Calculator project.
 * It showcases the calculator's functionality with multiple images, a video demonstration,
 * and comprehensive project details. The component maintains consistent styling with the
 * main portfolio website.
 */
const VatCalculatorDetails = () => {
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
            VAT Calculator
          </h1>
        </div>

        {/* Project overview */}
        <div className="bg-white dark:bg-navy/80 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-4">
            Project Overview
          </h2>
          <p className="text-foreground/70 dark:text-lightSlate mb-4">
            A comprehensive VAT calculation tool designed to help businesses calculate and manage their VAT requirements. Built using React and TypeScript, this project includes support for multiple VAT rates, detailed reporting, and a clear, user-friendly interface for accurate tax calculations.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              React
            </span>
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              Tailwind CSS
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
              src="/assets/images/vat2.png"
              alt="VAT Calculator Demo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Project images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { src: "/assets/images/vat2.png", alt: "VAT Calculator Interface" },
            { src: "/assets/images/newvatcalculator1.png", alt: "Calculation Results" },
            { src: "/assets/images/newvat2.png", alt: "Detailed Report View" },
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
            <li>Supports multiple VAT rates and calculation methods</li>
            <li>Real-time calculation updates with built-in validation</li>
            <li>Detailed reporting with export options</li>
            <li>Responsive design for all screen sizes</li>
            <li>Robust input validation and error messaging</li>
            <li>Clear, user-friendly interface with on-screen guidance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VatCalculatorDetails; 