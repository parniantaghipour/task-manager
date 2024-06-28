// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import Task from '../components/Task';

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await api.get('/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks', error);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/tasks', { title, description });
//       setTasks([...tasks, response.data]);
//       setTitle('');
//       setDescription('');
//     } catch (error) {
//       console.error('Error adding task', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Tasks</h2>
//       <form onSubmit={handleAddTask}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <button type="submit">Add Task</button>
//       </form>
//       <div>
//         {tasks.map((task) => (
//           <Task key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;
import React, { useState, useEffect } from 'react';
import api from '../services/api';  // Make sure this points to your API service

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("response")
        const response = await api.get('/api/tasks');
        console.log("response", response.data)
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
      console.error('Error adding task', error);  // Log the error to see more details
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed ? 'Completed' : 'Incomplete'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
