import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />  // Define the Login route
        <Route path="/register" element={<Register />} />  // Define the Login route
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
