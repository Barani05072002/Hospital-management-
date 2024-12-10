import React, { useEffect, useState, useCallback } from 'react';
import { List, ListItem, ListItemText, IconButton, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Dashboard, People, Person, Event, ExitToApp, ChevronLeft, ChevronRight, MedicalServices, PersonAdd, CalendarToday } from '@mui/icons-material';
import bg from '../images/blur-hospital.jpg'; // Import your background image

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ firstname: '', lastname: '', email: '', password: '', specialization: '', usertype: 'doctor' });
  const specializations = [
    'Cardiology', 
    'Dermatology', 
    'Neurology', 
    'Pediatrics', 
    'Orthopedics', 
    'Psychiatry', 
    'Radiology'
  ];

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

    setUsers(storedUsers);
    setDoctors(storedUsers.filter((user) => user.usertype === 'doctor'));
    setPatients(storedUsers.filter((user) => user.usertype === 'patient'));
    setAppointments(storedAppointments);
  }, []);

  // Memoize menu click handler to avoid unnecessary rerenders
  const handleMenuClick = useCallback((path) => {
    if (path === 'logout') {
      localStorage['auth'] = false;
      localStorage.removeItem('currentUser');
      setCurrentView('logout');
    } else {
      setCurrentView(path);
    }
  }, []);

  // Memoize delete user function
  const handleDeleteUser = useCallback((email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    setDoctors(updatedUsers.filter((user) => user.usertype === 'doctor'));
    setPatients(updatedUsers.filter((user) => user.usertype === 'patient'));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }, [users]);

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleCreateDoctor = () => {
    // Validate inputs before creating doctor
    if (!newDoctor.firstname || !newDoctor.lastname || !newDoctor.email || !newDoctor.specialization) {
      alert('Please fill out all fields');
      return;
    }
    const updatedUsers = [...users, newDoctor];
    setUsers(updatedUsers);
    setDoctors(updatedUsers.filter((user) => user.usertype === 'doctor'));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setOpenDialog(false);
    setNewDoctor({ firstname: '', lastname: '', email: '', password: '', extraField: '', usertype: 'doctor' });
  };

  const renderDashboard = () => {
    const doctorCount = doctors.length;
    const patientCount = patients.length;
    const appointmentCount = appointments.length;

    return (
      <div>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <Card sx={{ width: 200, boxShadow: 3, cursor: 'pointer' }}>
            <CardContent>
              <MedicalServices style={{ fontSize: '40px', color: '#2c3e50' }} />
              <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>Doctors</Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{doctorCount}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: 200, boxShadow: 3, cursor: 'pointer' }}>
            <CardContent>
              <PersonAdd style={{ fontSize: '40px', color: '#2c3e50' }} />
              <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>Patients</Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{patientCount}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ width: 200, boxShadow: 3, cursor: 'pointer' }}>
            <CardContent>
              <CalendarToday style={{ fontSize: '40px', color: '#2c3e50' }} />
              <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>Appointments</Typography>
              <Typography variant="body2" color="text.secondary" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{appointmentCount}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderUserTable = (data, title) => (
    <div style={{ marginBottom: '20px' }}>
      <h2>{title}</h2>
      {title === 'Doctors List' && (
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} style={{ marginBottom: '20px' }}>
          Create Doctor
        </Button>
      )}
      {data.length > 0 ? (
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>User Type</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.usertype}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small" 
                      onClick={() => handleDeleteUser(user.email)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );

  const renderAppointmentsTable = () => (
    <div style={{ marginBottom: '20px' }}>
      <h2>Appointments</h2>
      {appointments.length > 0 ? (
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Doctor</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Patient</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Time</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small" 
                      onClick={() => handleDeleteAppointment(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'doctors':
        return renderUserTable(doctors, 'Doctors List');
      case 'patients':
        return renderUserTable(patients, 'Patients List');
      case 'appointments':
        return renderAppointmentsTable();
      case 'dashboard':
        return renderDashboard();
      case 'logout':
        return navigate('/login');
    }
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const username = currentUser.firstname || 'User';

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div style={{ width: '230px', backgroundColor: '#2c3e50', padding: '20px', borderRight: '1px solid #ddd' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>{`Welcome, ${username}`}</div>
          <List>
            <ListItem button onClick={() => handleMenuClick('dashboard')}>
              <IconButton edge="start" color="inherit"><Dashboard /></IconButton>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('doctors')}>
              <IconButton edge="start" color="inherit"><People /></IconButton>
              <ListItemText primary="Doctors List" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('patients')}>
              <IconButton edge="start" color="inherit"><Person /></IconButton>
              <ListItemText primary="Patients List" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('appointments')}>
              <IconButton edge="start" color="inherit"><Event /></IconButton>
              <ListItemText primary="Appointments" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('logout')}>
              <IconButton edge="start" color="inherit"><ExitToApp /></IconButton>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      )}

      {/* Toggle Sidebar Button */}
      <IconButton
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'absolute',
          top: '20px',
          left: isSidebarOpen ? '250px' : '10px',
          zIndex: 1,
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: '50%',
          padding: '10px',
        }}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      {/* Content Area */}
      <div style={{
        flex: 1,
        padding: '20px',
        color: '#222',
        width: isSidebarOpen ? '77vw' : '97vw',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {renderContent()}
      </div>

      {/* Create Doctor Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            variant="outlined"
            value={newDoctor.firstname}
            onChange={(e) => setNewDoctor({ ...newDoctor, firstname: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Last Name"
            fullWidth
            variant="outlined"
            value={newDoctor.lastname}
            onChange={(e) => setNewDoctor({ ...newDoctor, lastname: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={newDoctor.password}
            onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
      label="Specialization"
      fullWidth
      select
      variant="outlined"
      value={newDoctor.specialization}
      onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
      SelectProps={{
        native: true, // This enables the native HTML `<select>` rendering
      }}
      style={{ marginBottom: '10px' }}
    >
      <option value="">Select Specialization</option>
      {specializations.map((spec, index) => (
        <option key={index} value={spec}>
          {spec}
        </option>
      ))}
    </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleCreateDoctor} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
