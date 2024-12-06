import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Person, List, ExitToApp, Visibility } from '@mui/icons-material';

const PatientDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const doctorList = storedUsers.filter(user => user.usertype === 'doctor');
    const appointmentList = JSON.parse(localStorage.getItem('appointments')) || [];
    setDoctors(doctorList);
    setAppointments(appointmentList);
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

  const handleAppointment = (doctor) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    const newAppointment = {
      id: Date.now(),
      doctor: `${doctor.firstname} ${doctor.lastname}`,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      email: currentUser.email,
      problem: currentUser.extraField,
      status: 'Pending',
    };

    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    alert('Appointment successfully booked!');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'doctorslist':
        return renderDoctorsList();
      case 'dashboard':
        return renderDashboard();
      case 'login':
        return navigate('/login');
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div>
      <h1>Patient Dashboard</h1>
      <p>Here you can view and manage your appointments.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {appointments.length > 0 ? (
          appointments.map((a) => (
            <Card key={a.id} style={{ width: '300px', marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Appointment with Dr. {a.doctor}
                </Typography>
                <Typography color="text.secondary">
                  {a.date} at {a.time}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                  Problem: {a.problem}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                  Email: {a.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                  Status: {a.status}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{ marginTop: '10px' }}
                  onClick={() => alert('Appointment details will be updated here.')}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No appointments booked yet.</p>
        )}
      </div>
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
                <td>{doctor.extraField}</td>
                <td>{doctor.email}</td>
                <td>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleAppointment(doctor)}
                  >
                    Book Appointment
                  </Button>
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
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
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
            position: 'fixed',
            height: '100vh',
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
              <Person style={{ marginRight: '8px' }} /> Dashboard
            </Link>
            <Link
              to="#"
              onClick={() => handleMenuClick('doctorslist')}
              style={linkStyle}
            >
              <List style={{ marginRight: '8px' }} /> Doctors List
            </Link>
            <Link
              to="#"
              onClick={() => handleMenuClick('logout')}
              style={linkStyle}
            >
              <ExitToApp style={{ marginRight: '8px' }} /> Logout
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
      <div
        style={{
          flex: 1,
          padding: '20px',
          marginLeft: isSidebarOpen ? '300px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {renderContent()}
      </div>
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
