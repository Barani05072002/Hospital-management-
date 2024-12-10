import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../images/blur-hospital.jpg';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Toolbar,
  AppBar,
  CssBaseline,
  Divider,
  Paper,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Logout as LogoutIcon,
  ChevronLeft,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

const DoctorDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const doctorPatients = storedAppointments.filter(
      (app) => app.doctor === `${currentUser.firstname} ${currentUser.lastname}`
    );
    setAppointments(doctorPatients);
    setPatients(doctorPatients);
  }, []);

  const handleMenuClick = (path) => {
    if (path === 'logout') {
      localStorage.removeItem('auth');
      localStorage.removeItem('currentUser');
      navigate('/login');
    } else {
      setCurrentView(path);
    }
  };

  const handleCompleteAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status: 'Completed' } : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'patientlist':
        return renderPatientList();
      case 'appointmentlist':
        return renderAppointmentList();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <Card sx={{ width: '300px', boxShadow: 3, padding: 2 }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Total Patients
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PersonIcon sx={{ fontSize: 40, color: '#2c3e50' }} />
            <Typography variant="h5" color="secondary">
              {patients.length}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ width: '300px', boxShadow: 3, padding: 2 }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Total Appointments
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EventIcon sx={{ fontSize: 40, color: '#2c3e50' }} />
            <Typography variant="h5" color="secondary">
              {appointments.length}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderPatientList = () => (
    <Box>
      <Typography variant="h5" gutterBottom color="secondary">
        Patient List
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <Card key={index} sx={{ width: '300px', boxShadow: 3, marginBottom: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Avatar sx={{ width: 50, height: 50, marginRight: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="h6">{`${patient.firstname} ${patient.lastname}`}</Typography>
                </Box>
                <Typography color="text.secondary">Email: {patient.email}</Typography>
                <Typography color="text.secondary">Contact: {patient.contact}</Typography>
                <Typography color="text.secondary">Problem: {patient.problem}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No patients assigned.</Typography>
        )}
      </Box>
    </Box>
  );

  const renderAppointmentList = () => (
    <Box>
      <Typography variant="h5" gutterBottom color="secondary">
        Appointment List
      </Typography>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{`${appointment.firstname} ${appointment.lastname}`}</Typography>
              <Typography>Date: {appointment.date}</Typography>
              <Typography>Time: {appointment.time}</Typography>
              <Typography>Status: {appointment.status || 'Pending'}</Typography>
            </CardContent>
            <CardActions>
              {appointment.status !== 'Completed' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCompleteAppointment(appointment.id)}
                >
                  Complete
                </Button>
              )}
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography>No appointments scheduled.</Typography>
      )}
    </Box>
  );

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const username = currentUser.firstname || 'Doctor';

  return (
    <Box sx={{ display: 'flex', position: 'relative', backgroundColor: '#f0f4f7', minHeight: '100vh' }}>
      <CssBaseline />
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50',
            color: 'white',
            zIndex: 800,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" color="inherit">Welcome, {username}</Typography>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <List>
          <ListItem button onClick={() => handleMenuClick('dashboard')} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('patientlist')} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Patient List" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('appointmentlist')} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Appointment List" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('logout')} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          transition: 'margin 0.3s ease',
          marginLeft: isSidebarOpen ? '240px' : '0',
          width: isSidebarOpen ? '82vw' : '100vw',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          paddingBottom: '20px',
          border: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: `url(${bg})`, // Add the URL of your background image here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {renderContent()}
        </Box>
      </Box>

      <IconButton
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        sx={{
          position: 'fixed',
          top: '16px',
          left: isSidebarOpen ? '220px' : '16px',
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: 1,
        }}
      >
        <ChevronLeft />
      </IconButton>
    </Box>
  );
};

export default DoctorDashboard;
