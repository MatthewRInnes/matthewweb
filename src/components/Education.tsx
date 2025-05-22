/**
 * Education Component
 * A comprehensive education history display with interactive skill showcases.
 * Features a modal system for viewing detailed skills and responsive design.
 */

import React, { useState } from 'react';
import { educationData } from '@/data/educationData';
import SkillsModal from '@/components/SkillsModal';

// Main Education component with state management for skills modal
const Education: React.FC = () => {
	// State for managing selected skills in the modal
  const [selectedSkills, setSelectedSkills] = useState<string[] | null>(null);

  // Handler for opening the skills modal
  const handleOpenModal = (skills: string[]) => {
    console.log('Opening modal with skills:', skills); // Debug log
    setSelectedSkills(skills);
  };

  // Handler for closing the skills modal
  const handleCloseModal = () => {
    setSelectedSkills(null);
  };

  // Function to render a preview of skills with a "View all" button
  const renderSkillsPreview = (skills: string[]) => {
    // Display first 5 skills with a count of remaining skills
    const previewSkills = skills.slice(0, 5);
    const remainingCount = skills.length - previewSkills.length;

    return (
      <div className="mt-4">
        {/* Skills preview container with flex layout */}
        <div className="flex flex-wrap gap-2">
          {previewSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-accent/10 dark:bg-teal/10 text-accent dark:text-teal px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        {/* "View all" button that appears when there are more than 5 skills */}
        {remainingCount > 0 && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => handleOpenModal(skills)}
              className="text-accent dark:text-teal hover:underline focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-teal rounded px-2 py-1"
            >
              View all {skills.length} skills
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    // Main education section container
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <h2 className="text-3xl font-bold mb-8 text-foreground dark:text-lightSlate">Education</h2>
        {/* Education entries container with spacing */}
        <div className="space-y-8">
          {/* Map through education data to create individual entries */}
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className="bg-background dark:bg-navy p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  {/* Course title */}
                  <h3 className="text-xl font-bold text-foreground dark:text-lightSlate">
                    {edu.course}
                  </h3>
                  {/* Institution name */}
                  <p className="text-foreground/80 dark:text-lightSlate/80">
                    {edu.institution}
                  </p>
                  {/* Duration and grade information */}
                  <p className="text-sm text-foreground/60 dark:text-lightSlate/60">
                    {edu.duration} | Grade: {edu.grade}
                  </p>
                  {/* Course description */}
                  <p className="mt-4 text-foreground/90 dark:text-lightSlate/90">
                    {edu.description}
                  </p>
                  {/* Skills preview section */}
                  {renderSkillsPreview(edu.skills)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills modal that appears when skills are selected */}
      {selectedSkills && (
        <SkillsModal skills={selectedSkills} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default Education; 