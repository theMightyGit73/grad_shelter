// src/components/StatsBar.jsx
import React from 'react';

const StatsBar = ({ total, available, adopted }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      margin: '20px 0',
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <div className="stat-item">
        <strong>Total Residents:</strong> {total}
      </div>
      <div className="stat-item" style={{color: 'green'}}>
        <strong>Available:</strong> {available}
      </div>
      <div className="stat-item" style={{color: 'red'}}>
        <strong>Graduated:</strong> {adopted}
      </div>
    </div>
  );
};

export default StatsBar;