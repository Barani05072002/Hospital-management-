import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve current user details from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const username = currentUser.firstname || 'User';

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usertype');
    navigate('/login');
  };

  console.log('Current User:', currentUser); // Debugging: log the current user

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
      }}
    >
      <div style={{ color: '#333', fontWeight: 'bold' }}>
        {`Welcome, ${username}`}
      </div>
      <div>
        <button
          onClick={handleLogout}
          style={{
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
