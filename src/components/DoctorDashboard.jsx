import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  AppBar,
  CssBaseline,
  Divider,
  Button
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Logout as LogoutIcon,
  ChevronLeft,
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
    <Box>
      <Typography variant="h4" color="primary">Doctor Dashboard</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Manage your patients and appointments.
      </Typography>
    </Box>
  );

  const renderPatientList = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom color="secondary">
        Patient List
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Email</TableCell>
            <TableCell sx={{ color: 'white' }}>Contact</TableCell>
            <TableCell sx={{ color: 'white' }}>Problem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{`${patient.firstname} ${patient.lastname}`}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.problem}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No patients assigned.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderAppointmentList = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom color="secondary">
        Appointment List
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>Patient</TableCell>
            <TableCell sx={{ color: 'white' }}>Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{`${appointment.firstname} ${appointment.lastname}`}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No appointments scheduled.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
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
          width: 240,
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
          transition: 'margin 0.3s',
          marginLeft: isSidebarOpen ? '240px' : '0',
          width: isSidebarOpen ? 'calc(82vw - 240px)' : '82vw',
        }}
      >
        <Toolbar />
        {renderContent()}
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
