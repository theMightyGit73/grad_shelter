import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IntakeForm from '../components/IntakeForm';
import ResidentCard from '../components/ResidentCard';
// Removed: import StatsBar from '../components/StatsBar'; 

const API_URL = 'http://localhost:8080/api/residents';

const Residents = () => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents();
  }, []);

  // --- GET: Fetch all residents ---
  const fetchResidents = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }
      const data = await response.json();
      setResidents(data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  // --- POST: Add a new resident ---
  const handleAddResident = async (newResident) => {
    try {
      // Day 1 Check: Basic duplicate prevention
      if (residents.some(r => r.name.toLowerCase() === newResident.name.toLowerCase())) {
         alert(`A resident named ${newResident.name} already exists!`);
         return;
      }
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResident),
      });

      if (!response.ok) {
        throw new Error('Failed to add resident.');
      }
      
      fetchResidents(); // Re-fetch the list to update the UI
    } catch (error) {
      console.error('Error adding resident:', error);
    }
  };

  // --- DELETE: Remove a resident from the list view ---
  const handleDeleteResident = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resident?")) {
      return;
    }
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchResidents(); // Re-fetch the list
    } catch (error) {
      console.error('Error deleting resident:', error);
    }
  };

  // --- PUT: Toggle availability/Adopt status from the list view ---
  const handleToggleAvailability = async (residentToUpdate) => {
    
    // Create the updated object by toggling the 'available' status
    const updatedResident = {
      ...residentToUpdate,
      available: !residentToUpdate.available,
    };

    try {
      const response = await fetch(`${API_URL}/${residentToUpdate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedResident),
      });

      if (!response.ok) {
        throw new Error('Failed to update resident status.');
      }
      
      fetchResidents(); // Re-fetch the list
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };
  
  // --- Day 1: Stats Calculations ---
  const totalResidents = residents.length;
  // NOTE: Based on the test output (Available: 1, Graduated: 1, Total: 2)
  // The 'Graduated' stat seems to be the one where 'available' is false.
  const availableResidents = residents.filter(r => r.available).length;
  const adoptedResidents = residents.filter(r => !r.available).length; // Filter by NOT available

  return (
    <div>
      <h1>Current Residents</h1>
      
      {/* REPLACED STATSBAR WITH INLINE JSX FOR TESTING RELIABILITY 
        AND ADDED data-testid ATTRIBUTES
      */}
      <div 
        style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', padding: '15px', borderRadius: '8px', backgroundColor: 'rgb(249, 249, 249)' }}
      >
        <div className="stat-item" data-testid="total-residents-stat">
          <strong>Total Residents:</strong>
          {totalResidents}
        </div>
        <div className="stat-item" data-testid="available-stat" style={{ color: 'green' }}>
          <strong>Available:</strong>
          {availableResidents}
        </div>
        <div className="stat-item" data-testid="graduated-stat" style={{ color: 'red' }}>
          <strong>Graduated:</strong>
          {adoptedResidents}
        </div>
      </div>
      
      <IntakeForm onAddResident={handleAddResident} />
      
      <div className="resident-list">
        {/* Day 1: Empty State */}
        {totalResidents === 0 ? (
          <p style={{textAlign: 'center', marginTop: '40px', fontSize: '1.2em'}}>
            ✨ No residents yet! Intake your first graduate. 🎓
          </p>
        ) : (
          residents.map((resident) => (
            <div key={resident.id} className="resident-card-wrapper">
              
              {/* ResidentCard now receives the handler functions */}
              <ResidentCard 
                resident={resident} 
                onDelete={handleDeleteResident} 
                onAdopt={() => handleToggleAvailability(resident)} 
              />
              
              {/* This link sits BELOW the card actions, preventing propagation errors */}
              <Link to={`/residents/${resident.id}`} style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Residents;