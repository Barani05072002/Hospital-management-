import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // Tracks the current menu selection
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Tracks the sidebar's open/close state
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    // Fetch patient and appointment data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    console.log(storedAppointments)

    // Filter patients for the current doctor
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const doctorPatients = storedAppointments.filter(app => app.doctor === `${currentUser.firstname} ${currentUser.lastname}`);
    
    setAppointments(doctorPatients);
    setPatients(doctorPatients)
  }, []);

  const handleMenuClick = (path) => {
    if (path === 'logout') {
      localStorage.removeItem('auth');
      localStorage.removeItem('currentUser');
      setCurrentView('login'); 
    } else {
      setCurrentView(path);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'patientlist':
        return renderPatientList();
      case 'appointmentlist':
        return renderAppointmentList();
      case 'dashboard':
        return renderDashboard();
      case 'login':
        return navigate('/login');
    }
  };

  const renderDashboard = () => (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Doctor-specific tools and patient management.</p>
    </div>
  );

  const renderPatientList = () => (
    <div>
      <h2>Patient List</h2>
      {patients.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Problem</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.firstname}</td>
                <td>{patient.lastname}</td>
                <td>{patient.email}</td>
                <td>{patient.problem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients assigned.</p>
      )}
    </div>
  );

  const renderAppointmentList = () => (
    <div>
      <h2>Appointment List</h2>
      {appointments.length > 0 ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{`${appointment.firstname} ${appointment.lastname}`}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments scheduled.</p>
      )}
    </div>
  );

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const username = currentUser.firstname || 'Doctor';

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
              onClick={() => handleMenuClick('patientlist')}
              style={linkStyle}
            >
              Patient List
            </Link>
            <Link
              to="#"
              onClick={() => handleMenuClick('appointmentlist')}
              style={linkStyle}
            >
              Appointment List
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

export default DoctorDashboard;
