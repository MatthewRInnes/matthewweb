// Import React and useState for managing component state
import React, { useState } from 'react';

// List of all skills to be displayed in the modal
const allSkills = [
  'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5',
  'Skill 6', 'Skill 7', 'Skill 8', 'Skill 9', 'Skill 10'
];

// Modal component for displaying all skills
const SkillsModal = ({ skills, onClose }) => (
  <div
    style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}
    onClick={onClose}
  >
    <div
      style={{ background: 'white', padding: 20, borderRadius: 8, minWidth: 300 }}
      onClick={e => e.stopPropagation()}
    >
      <h2>All Skills</h2>
      <ul>
        {skills.map(skill => <li key={skill}>{skill}</li>)}
      </ul>
      {/* Button to close the modal */}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

// Main component for demonstrating the skills modal
export default function Demo() {
  // State to control whether the modal is shown
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <div>
        {/* Display the first five skills inline */}
        {allSkills.slice(0, 5).map(skill => (
          <span key={skill} style={{ marginRight: 8 }}>{skill}</span>
        ))}
        {/* Button to show the modal with all skills */}
        <button
          style={{
            border: '1px solid teal', color: 'teal', borderRadius: 20, padding: '4px 12px', marginLeft: 8
          }}
          onClick={() => setShowModal(true)}
        >
          +{allSkills.length - 5} more
        </button>
      </div>
      {/* Conditionally render the modal if showModal is true */}
      {showModal && (
        <SkillsModal skills={allSkills} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
