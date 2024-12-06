// PatientDashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // Tracks the current menu selection
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Tracks the sidebar's open/close state
  const [doctors, setDoctors] = useState([]); // Holds doctor data
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    // Fetch doctors from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const doctorList = storedUsers.filter(user => user.usertype === 'doctor');
    setDoctors(doctorList);
  }, []);

  const handleMenuClick = (path) => {
    if (path === 'logout') {
      localStorage.removeItem('auth');
      localStorage.removeItem('currentUser');
      navigate('/login'); // Redirect to login
    } else {
      setCurrentView(path);
    }
  };

  const handleAppointment = (doctor) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    const newAppointment = {
      doctor: `${doctor.firstname} ${doctor.lastname}`,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      email : currentUser.email,
      problem : currentUser.extraField

    };

    const updatedAppointments = [...appointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    alert('Appointment successfully booked!');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'doctorslist':
        return renderDoctorsList();
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div>
      <h1>Patient Dashboard</h1>
      <p>Patient-specific information and appointment details.</p>
    </div>
  );

  const renderDoctorsList = () => (
    <div>
      <h2>Doctors List</h2>
      {doctors.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Contact Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{`${doctor.firstname} ${doctor.lastname}`}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.email}</td>
                <td>
                  <button onClick={() => handleAppointment(doctor)}>
                    Book Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  );

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const username = currentUser.firstname || 'Patient';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      {isSidebarOpen && (
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
          <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#222' }}>
            {`Welcome, ${username}`}
          </div>
          <div>
            <Link
              to="#"
              onClick={() => handleMenuClick('dashboard')}
              style={linkStyle}
            >
              Dashboard
            </Link>
            <Link
              to="#"
              onClick={() => handleMenuClick('doctorslist')}
              style={linkStyle}
            >
              Doctors List
            </Link>
            <Link
              to="#"
              onClick={() => handleMenuClick('logout')}
              style={linkStyle}
            >
              Logout
            </Link>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'absolute',
          top: '10px',
          left: isSidebarOpen ? '260px' : '10px',
          zIndex: 1,
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>

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

export default PatientDashboard;
