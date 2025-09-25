import React from 'react';
import ResidentCard from './ResidentCard';

const ResidentList = ({ residents, onDeleteResident, onAdoptResident }) => {
  return (
    <div className="resident-list">
      {residents.length === 0 ? (
        <p className="empty-state">No graduates here yet! Time to open the doors.</p>
      ) : (
        residents.map(resident => (
          <ResidentCard
            key={resident.id}
            resident={resident}
            onDelete={onDeleteResident}
            onAdopt={onAdoptResident}
          />
        ))
      )}
    </div>
  );
};

export default ResidentList;