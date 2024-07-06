import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Task from '../components/Task';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', { title, description });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div className="bg-yellow-300 min-h-screen p-10">
      <h2 className="text-4xl text-orange-600 font-bold mb-5">Tasks</h2>
      <form onSubmit={handleAddTask} className="mb-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-orange-600 p-2 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-orange-600 p-2 mr-2 mb-2"
        />
        <button type="submit" className="bg-orange-600 text-white p-2">Add Task</button>
      </form>
      <div>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
