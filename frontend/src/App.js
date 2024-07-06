import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import TaskPage from './components/TaskPage';
import './App.css';

function App() {
  
  return (
    <div className="bg-yellow-300 min-h-screen p-10">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Define the Login route */}
          <Route path="/register" element={<Register />} /> {/* Define the Register route */}
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </div>
    // <div className="bg-yellow-300 min-h-screen p-10">
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />  // Define the Login route
    //     <Route path="/register" element={<Register />} />  // Define the Login route
    //     <Route path="/tasks" element={<Tasks />} />
    //   </Routes>
    // </Router>
  // </div>

  );
}

export default App;
