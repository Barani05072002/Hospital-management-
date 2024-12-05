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

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
      }}
    >
      {/* Left Section - Welcome Message */}
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
        {`Welcome, ${username}`}
      </div>

      {/* Right Section - Menu Options */}
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '20px',
        }}
      >
        <li
          style={{
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '15px',
            color: '#007bff',
            textDecoration: 'none',
          }}
          onClick={() => handleNavigate('/dashboard')}
        >
          Dashboard
        </li>
        <li
          style={{
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '15px',
            color: '#007bff',
            textDecoration: 'none',
          }}
          onClick={() => handleNavigate('/profile')}
        >
          Profile
        </li>
        <li
          style={{
            cursor: 'pointer',
            padding: '5px 10px',
            fontSize: '15px',
            color: '#007bff',
            textDecoration: 'none',
          }}
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
