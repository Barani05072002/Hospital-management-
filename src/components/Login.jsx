import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import bg from '../images/blur-hospital.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = [{"firstname":"one","lastname":"theprime","email":"one@email","password":"12345","usertype":"admin"}]
    users.push(JSON.parse(localStorage.getItem('users')))
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('usertype', user.usertype);
      localStorage.setItem('currentUser', JSON.stringify(user)); // Store the logged-in user's details

      // Navigate based on user type
      if (user.usertype === 'admin') navigate('/admin');
      else if (user.usertype === 'doctor') navigate('/doctor');
      else if (user.usertype === 'patient') navigate('/patient');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width:'100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:`url(${bg}) center no-repeat`,
        backgroundSize :'cover',
        bgcolor: '#eceff1', // Light gray background color
      }}
    >
      <Container maxWidth="xs" sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#3f51b5', textAlign: 'center' }}>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
              mb: 2,
            }}
          >
            Login
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/signup" style={{ textDecoration: 'none', color: '#3f51b5' }}>
              <Typography variant="body2" sx={{ textAlign: 'center', color: '#3f51b5' }}>
                Don't have an account? Sign up
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
