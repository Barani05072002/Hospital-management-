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
      <Typography variant="h4">Doctor Dashboard</Typography>
      <Typography variant="body1">
        Manage your patients and appointments.
      </Typography>
    </Box>
  );

  const renderPatientList = () => (
    <TableContainer component={Paper}>
      <Typography variant="h5" gutterBottom>
        Patient List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Problem</TableCell>
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
    <TableContainer component={Paper}>
      <Typography variant="h5" gutterBottom>
        Appointment List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
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
    <Box sx={{ display: 'flex', position: 'relative' }}>
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Welcome, {username}</Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => handleMenuClick('dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('patientlist')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Patient List" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('appointmentlist')}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Appointment List" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('logout')}>
            <ListItemIcon>
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
          p: 3,
          transition: 'margin 0.3s',
          marginLeft: isSidebarOpen ? '240px' : '0',
          width: isSidebarOpen ? 'calc(100% - 240px)' : '100%',
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
          left: isSidebarOpen ? '240px' : '16px',
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
