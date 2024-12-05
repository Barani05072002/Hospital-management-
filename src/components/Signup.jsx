import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    usertype: '',
    extraField: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find((user) => user.email === formData.email)) {
      alert('User with this email already exists');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User registered successfully');
    navigate('/login');
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <select
          name="usertype"
          value={formData.usertype}
          onChange={handleInputChange}
          required
        >
          <option value="">Select User Type</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>

        {formData.usertype === 'doctor' && (
          <input
            type="text"
            name="extraField"
            placeholder="Specialization"
            value={formData.extraField}
            onChange={handleInputChange}
            required
          />
        )}

        {formData.usertype === 'patient' && (
          <input
            type="text"
            name="extraField"
            placeholder="Problem"
            value={formData.extraField}
            onChange={handleInputChange}
            required
          />
        )}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

