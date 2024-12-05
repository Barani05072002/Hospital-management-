import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard'); // Tracks the current menu selection

  useEffect(() => {
    // Fetch users and appointments from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    setUsers(storedUsers);
    setDoctors(storedUsers.filter(user => user.usertype === 'doctor'));
    setPatients(storedUsers.filter(user => user.usertype === 'patient'));
    setAppointments(storedAppointments);
  }, []);

  const handleMenuClick = (path) => {
    if (path === 'logout') {
      // Clear localStorage and navigate to login
      window.location.href = '/login';
    } else {
      setCurrentView(path);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'doctors':
        return renderUserTable(doctors, 'Doctors List');
      case 'patients':
        return renderUserTable(patients, 'Patients List');
      case 'appointments':
        return renderAppointmentsTable();
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <p>Admin-specific operations and management tools.</p>

        <h2>Logged In User</h2>
        <p><strong>First Name:</strong> {currentUser.firstname}</p>
        <p><strong>Last Name:</strong> {currentUser.lastname}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>User Type:</strong> {currentUser.usertype}</p>
      </div>
    );
  };

  const renderUserTable = (data, title) => (
    <div>
      <h2>{title}</h2>
      {data.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.usertype}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );

  const renderAppointmentsTable = () => (
    <div>
      <h2>Appointments</h2>
      {appointments.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.doctor}</td>
                <td>{appointment.patient}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const username = currentUser.firstname || 'User';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRight: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '16px', color:'#222' }}>
          {`Welcome, ${username}`}
        </div>
        <div>
          <a
            href="#"
            onClick={() => handleMenuClick('dashboard')}
            style={linkStyle}
          >
            Dashboard
          </a>
          <a
            href="#"
            onClick={() => handleMenuClick('doctors')}
            style={linkStyle}
          >
            Doctors List
          </a>
          <a
            href="#"
            onClick={() => handleMenuClick('patients')}
            style={linkStyle}
          >
            Patients List
          </a>
          <a
            href="#"
            onClick={() => handleMenuClick('appointments')}
            style={linkStyle}
          >
            Appointments
          </a>
          <a
            href="#"
            onClick={() => handleMenuClick('logout')}
            style={linkStyle}
          >
            Logout
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>{renderContent()}</div>
    </div>
  );
};

const linkStyle = {
  display: 'block',
  padding: '10px',
  fontSize: '15px',
  color: '#007bff',
  textDecoration: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
};

export default AdminDashboard;
