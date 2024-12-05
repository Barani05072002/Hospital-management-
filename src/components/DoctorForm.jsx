import React, { useState } from 'react';

const DoctorForm = () => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Doctor Added: ${name}, Specialization: ${specialization}`);
  };

  return (
    <div>
      <h2>Add/Edit Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DoctorForm;