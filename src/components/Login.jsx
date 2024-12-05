// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to="/signup">Sign up</Link>
      </form>
    </div>
  );
};

export default Login;
