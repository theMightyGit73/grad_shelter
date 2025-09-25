// src/components/ResidentCard.jsx
import React from 'react';

// ResidentCard now accepts onDelete and onAdopt props
const ResidentCard = ({ resident, onDelete, onAdopt }) => {
  
  const statusString = resident.available ? 'Available' : 'Graduated';
  const statusColor = resident.available ? 'green' : 'red';
  const adoptText = resident.available ? 'Mark as Graduated' : 'Re-shelter';
  
  return (
    <div className="resident-card">
      <h3>{resident.name}</h3>
      
      <p>Type: {resident.type}</p>
      <p>Age: {resident.age}</p>
      <p>Mood: {resident.mood}</p>
      
      <span className="status-badge" style={{ color: statusColor, fontWeight: 'bold' }}>
        Status: {statusString}
      </span>
      
      <div className="card-actions" style={{marginTop: '10px'}}>
        {/* Day 1 Requirement: Adopt/Toggle button */}
        <button 
          className="adopt-btn" 
          onClick={(e) => {
            e.stopPropagation(); // Prevents link navigation
            onAdopt(); // Calls the handleToggleAvailability function in Residents.jsx
          }}
          style={{ marginRight: '10px' }}
        >
          {adoptText}
        </button>
        
        {/* Day 1 Requirement: Delete button */}
        <button 
          className="delete-btn" 
          onClick={(e) => {
            e.stopPropagation(); // Prevents link navigation
            onDelete(resident.id); // Calls the handleDeleteResident function
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResidentCard;