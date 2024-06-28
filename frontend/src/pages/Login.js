import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// console.log("hereeee")
// function Login() {
//     return <h1>Login Page</h1>;
//   }
  
// export default Login;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('http://localhost:5001/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (error) {   
      console.error('Error logging in', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
