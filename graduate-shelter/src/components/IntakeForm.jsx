// src/components/IntakeForm.jsx
import React, { useState } from 'react';
import './IntakeForm.css';

// The component accepts an onAddResident prop which will handle the POST request
const IntakeForm = ({ onAddResident }) => {
  const [resident, setResident] = useState({
    name: '',
    age: '',
    // ADDED FIELDS to match the updated Resident.java model:
    type: '',
    mood: '',
    // Existing field:
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox change separately for the boolean 'available'
    setResident((prevResident) => ({
      ...prevResident,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pass the complete resident object to the parent handler (handleAddResident)
    onAddResident(resident);
    
    // Reset the form state
    setResident({
      name: '',
      age: '',
      type: '',
      mood: '',
      available: true,
    });
  };

  return (
    <form className="intake-form" onSubmit={handleSubmit}>
      <h2>Intake New Resident</h2>
      
      {/* Name Input */}
      <input
        type="text"
        name="name"
        value={resident.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      
      {/* Age Input */}
      <input
        type="number"
        name="age"
        value={resident.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />

      {/* Type Input (e.g., Student/TA/Alumni) */}
      <input
        type="text"
        name="type"
        value={resident.type}
        onChange={handleChange}
        placeholder="Graduate Type (e.g., PhD, Masters)"
        required
      />

      {/* Mood Input (e.g., Stressed/Defended) */}
      <input
        type="text"
        name="mood"
        value={resident.mood}
        onChange={handleChange}
        placeholder="Current Mood"
        required
      />
      
      {/* Available Checkbox */}
      <label>
        Available:
        <input
          type="checkbox"
          name="available"
          checked={resident.available}
          onChange={handleChange}
        />
      </label>
      
      <button type="submit">Add Resident</button>
    </form>
  );
};

export default IntakeForm;