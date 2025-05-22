import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * ClothingStoreDetails Component
 * 
 * This component displays detailed information about the Matthew's Clothing Store project.
 * It includes multiple images, a video demonstration, and comprehensive project details.
 */
const ClothingStoreDetails = () => {
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
            Matthew's Clothing Store
          </h1>
        </div>

        {/* Project overview */}
        <div className="bg-white dark:bg-navy/80 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-4">
            Project Overview
          </h2>
          <p className="text-foreground/70 dark:text-lightSlate mb-4">
            A modern online store for a clothing retailer, featuring a responsive design, shopping basket functionality, and product filtering. Built with HTML, CSS, and JavaScript, this project showcases essential web development skills and user interface design principles.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              HTML
            </span>
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              CSS
            </span>
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              JavaScript
            </span>
            <span className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm">
              E-commerce
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
              src="/assets/images/clothestop1.png"
              alt="Clothing Store Demo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Project images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { src: "/assets/images/newmattclothes1.png", alt: "Clothing Store Homepage" },
            { src: "/assets/images/clothes3.png", alt: "Shopping Basket" },
            { src: "/assets/images/clothes4.png", alt: "Product Details" },
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
            <li>Responsive design that works seamlessly across all devices</li>
            <li>Interactive product filtering and search functionality</li>
            <li>Dynamic shopping basket with live updates</li>
            <li>Product image gallery with zoom functionality</li>
            <li>Easy-to-use navigation and intuitive layout</li>
            <li>Optimised performance and loading times</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClothingStoreDetails; 