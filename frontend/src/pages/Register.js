import React, { useState } from 'react';
import api from '../services/api';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      console.log('Registering:', { username, password });
      const response = await axios.post('http://localhost:5001/api/register', { username, password });
      console.log( "response", response)
      localStorage.setItem('token', response.data.token);
      alert('Registration Successful');
      setUsername('');
      setPassword('');
      setError('');
      navigate('/tasks');

    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
