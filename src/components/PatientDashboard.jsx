import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Person, List, ExitToApp, ChevronLeft, ChevronRight } from '@mui/icons-material';
import bg from '../images/blur-hospital.jpg';
import defaultProfilePic from '../images/doctor.png';
import patienProfilePic from '../images/user_219988.png';

const PatientDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [problem, setProblem] = useState('');
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

  const handleAppointment = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    const newAppointment = {
      id: Date.now(),
      doctor: selectedDoctor,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      email: currentUser.email,
      problem: problem,
      status: 'Pending',
    };

    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setOpenAppointmentDialog(false);  // Close the form
    alert('Appointment successfully booked!');
  };

  const cancelAppointment = (id) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    alert('Appointment canceled successfully!');
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
      <h1 style={{ color: '#222' }}>Patient Dashboard</h1>
      <p style={{ color: '#222' }}>Here you can view and manage your appointments.</p>
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
                  color="secondary"
                  style={{ marginTop: '10px' }}
                  onClick={() => cancelAppointment(a.id)}
                >
                  Cancel Appointment
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
    <h2 style={{ color: '#222' }}>Doctors List</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {doctors.length > 0 ? (
        doctors.map((doctor, index) => (
          <Card
            key={index}
            style={{
              width: '300px',
              marginBottom: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              position: 'relative',
            }}
          >
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={doctor.profilePic || defaultProfilePic}
                  alt="Profile"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '10px',
                  }}
                />
                <div>
                  <Typography variant="h6" component="div" style={{ marginBottom: '10px' }}>
                    Dr. {`${doctor.firstname} ${doctor.lastname}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specialization: {doctor.extraField}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                    Contact: {doctor.email}
                  </Typography>
                </div>
              </div>
              {/* Book Appointment Button placed below content */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedDoctor(`${doctor.firstname} ${doctor.lastname}`);
                    setOpenAppointmentDialog(true);
                  }}
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    width: '100%', // To ensure the button spans the entire width
                  }}
                >
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  </div>
);


  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const username = currentUser.firstname || 'Patient';
  const profilePic = currentUser.profilePic || defaultProfilePic;

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          style={{
            width: '250px',
            backgroundColor: '#2C3E50',
            padding: '20px',
            borderRight: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'fixed',
            height: '100vh',
            color: 'white',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <img
              src={patienProfilePic}
              alt="Profile"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '10px',
              }}
            />
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#ecf0f1' }}>
              {`Welcome, ${username}`}
            </div>
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

      {/* Fixed Toggle Button */}
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: '100px',
          left: isSidebarOpen ? '260px' : '10px',
          zIndex: 1,
          cursor: 'pointer',
          backgroundColor: '#3498db',
          padding: '10px',
          borderRadius: '30%',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'background-color 0.3s',
        }}
      >
        {isSidebarOpen ? (
          <ChevronLeft style={{ fontSize: '30px', color: 'white' }} />
        ) : (
          <ChevronRight style={{ fontSize: '30px', color: 'white' }} />
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '50px',
          marginLeft: isSidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          overflowY: 'auto',
          color: 'white',
          width: isSidebarOpen ? '72vw' : '100vw',
        }}
      >
        {renderContent()}
      </div>

      {/* Appointment Dialog */}
      <Dialog open={openAppointmentDialog} onClose={() => setOpenAppointmentDialog(false)}>
        <DialogContent>
          <h3>Book Appointment with {selectedDoctor}</h3>
          <TextField
            label="Problem"
            fullWidth
            multiline
            rows={4}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <FormControl fullWidth style={{ marginBottom: '15px' }}>
            <InputLabel>Doctor</InputLabel>
            <Select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              label="Doctor"
            >
              {doctors.map((doctor, index) => (
                <MenuItem key={index} value={`${doctor.firstname} ${doctor.lastname}`}>
                  Dr. {doctor.firstname} {doctor.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAppointmentDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAppointment} color="primary">Book Appointment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const linkStyle = {
  display: 'block',
  padding: '10px',
  fontSize: '15px',
  color: '#ecf0f1',
  textDecoration: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
};

export default PatientDashboard;
