import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import bg from '../images/blur-hospital.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    usertype: 'patient',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.email === formData.email)) {
      setError('User with this email already exists');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully');
    navigate('/login');
  };

  return (
    <div
    style={{
      width: '100vw',
      background : `url(${bg}) center no-repeat`,
      backgroundSize : 'cover',
      height : '100vh',
      display: 'grid',
      placeItems : 'center'
    }}
    >
    <Box
      sx={{
        maxWidth: 400,
        p: 4,
        borderRadius: 3,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffffff',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1976d2',
          mb: 3,
        }}
      >
        Create Your Account
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <form onSubmit={handleSignup}>
        <TextField
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
          }}
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
          }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            backgroundColor: '#1976d2',
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Signup
        </Button>
      </form>

      <Typography
        variant="body2"
        sx={{
          mt: 3,
          color: '#555',
        }}
      >
        Already have an account? <a href="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>Login</a>
      </Typography>
    </Box>
    </div>
  );
};

export default Signup;
