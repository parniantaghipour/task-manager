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
    <form onSubmit={handleSubmit} className="bg-yellow-300 p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4 text-left text-red-800">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 rounded-md border border-red-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 rounded-md border border-red-300 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Login
      </button>
    </form>
  );
  
};

export default Login;
