import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResidentDetails = () => {
  const { id } = useParams(); // Gets the ID from the URL: /residents/:id
  const navigate = useNavigate();
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:8080/api/residents';

  // --- 1. GET Resident by ID ---
  const fetchResident = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        // Handle cases where ID is not found (e.g., deleted resident)
        if (response.status === 404) {
          console.error(`Resident with ID ${id} not found.`);
          navigate('/residents'); // Redirect back to the list
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResident(data);
    } catch (error) {
      console.error('Error fetching resident details:', error);
      // Optional: show error message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResident();
  }, [id]);

  // --- 2. DELETE Resident ---
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to remove ${resident.name} from the shelter?`)) {
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      // Navigate back to the residents list on successful deletion
      navigate('/residents');
    } catch (error) {
      console.error('Error deleting resident:', error);
    }
  };

  // --- 3. PUT (Update) Resident - Toggling Availability ---
  const handleToggleAvailability = async () => {
    if (!resident) return;

    const updatedResident = {
      ...resident,
      available: !resident.available, // Toggle the boolean value
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedResident),
      });

      if (!response.ok) {
        throw new Error('Failed to update availability.');
      }

      // Update the local state with the new data from the API
      setResident(updatedResident); 
      // Note: A real app might re-fetch for safety, but updating the state directly is faster.

    } catch (error) {
      console.error('Error updating resident:', error);
    }
  };

  // --- Conditional Rendering ---
  if (loading) {
    return <div>Loading details...</div>;
  }

  // Handle case where resident is null after loading (should be caught by 404 check, but good practice)
  if (!resident) {
    return <div>Resident not found.</div>;
  }

  return (
    <div className="resident-details">
      <h1>Details for {resident.name}</h1>
      <p>ID: {resident.id}</p>
      <p>Age: {resident.age}</p>
      
      {/* Synchronization Fix: Displaying 'type' and 'mood' */}
      <p>Type: **{resident.type}**</p>
      <p>Mood: **{resident.mood}**</p>

      {/* Availability Status and Toggle Button */}
      <p>
        Status: 
        <span style={{ fontWeight: 'bold', color: resident.available ? 'green' : 'red' }}>
          {resident.available ? ' Available for Graduation' : ' Graduated!'}
        </span>
      </p>

      <button onClick={handleToggleAvailability}>
        {resident.available ? 'Mark as Graduated' : 'Mark as Available'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleDelete} style={{ background: 'red', color: 'white' }}>
          Delete Resident
        </button>
      </div>

      <button onClick={() => navigate('/residents')} style={{ marginTop: '10px' }}>
        ← Back to List
      </button>
    </div>
  );
};

export default ResidentDetails;