import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TradingBotDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background dark:bg-navy py-12">
      <div className="container mx-auto px-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-foreground dark:text-lightSlate hover:text-teal dark:hover:text-teal mb-8 transition-colors duration-300"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </button>

        {/* Project header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground dark:text-lightestSlate mb-4">
            Trading Bot Platform
          </h1>
          <p className="text-lg text-foreground/70 dark:text-lightSlate">
            An advanced trading bot that analyses historical price data, calculates technical indicators, and generates trading signals.
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Project details */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-6">
              Project Overview
            </h2>
            <div className="space-y-6 text-foreground/70 dark:text-lightSlate">
              <p>
                This trading bot platform provides sophisticated market analysis tools and automatic trading capabilities. Developed using up-to-date web technologies, it offers processing of live market data and technical analysis.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground dark:text-lightestSlate mt-8 mb-4">
                Key Features
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Live market data analysis</li>
                <li>RSI (Relative Strength Index) calculations</li>
                <li>Moving averages and trend analysis</li>
                <li>Automatic generation of trading signals</li>
                <li>Interactive charts and visualisations</li>
                <li>Historical data analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground dark:text-lightestSlate mt-8 mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Chart.js", "Technical Analysis"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary dark:bg-navy/60 text-foreground dark:text-lightSlate rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Media gallery */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground dark:text-lightestSlate mb-6 text-center">
              Project Gallery
            </h2>
            {/* Responsive grid for images: 1 col on mobile, 2 on tablet, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Each image is placed in a container with a fixed aspect ratio for neatness */}
              {[
                { src: "/assets/images/newtradingbotpic2.png", alt: "Trading Bot Desktop Dashboard" },
                { src: "/assets/images/newtradingbotmobile1.png", alt: "Trading Bot Mobile Interface" },
                { src: "/assets/images/newtradingbotpic3.png", alt: "Trading Bot Advanced Chart" },
                { src: "/assets/images/bot3.png", alt: "Trading Bot Additional Example" },
              ].map((img, idx) => (
                <div
                  key={img.src}
                  className="aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg flex justify-center items-center bg-background dark:bg-navy/80 p-2 border border-slate-200 dark:border-slate-700"
                  style={{ minHeight: '180px', maxHeight: '260px' }} // Ensures consistent height
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingBotDetails; 