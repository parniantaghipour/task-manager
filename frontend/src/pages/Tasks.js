// // import React, { useState, useEffect } from 'react';
// // import api from '../services/api';
// // import Task from '../components/Task';

// // const Tasks = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');

// //   useEffect(() => {
// //     const fetchTasks = async () => {
// //       try {
// //         const response = await api.get('/tasks');
// //         setTasks(response.data);
// //       } catch (error) {
// //         console.error('Error fetching tasks', error);
// //       }
// //     };
// //     fetchTasks();
// //   }, []);

// //   const handleAddTask = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await api.post('/tasks', { title, description });
// //       setTasks([...tasks, response.data]);
// //       setTitle('');
// //       setDescription('');
// //     } catch (error) {
// //       console.error('Error adding task', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Tasks</h2>
// //       <form onSubmit={handleAddTask}>
// //         <input
// //           type="text"
// //           placeholder="Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Description"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />
// //         <button type="submit">Add Task</button>
// //       </form>
// //       <div>
// //         {tasks.map((task) => (
// //           <Task key={task._id} task={task} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Tasks;
// import React, { useState, useEffect } from 'react';
// import api from '../services/api';  // Make sure this points to your API service

// function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         console.log("response")
//         const response = await api.get('/api/tasks');
//         console.log("response", response.data)
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
//       console.error('Error adding task', error);  // Log the error to see more details
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
//           <div key={task._id}>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <p>{task.completed ? 'Completed' : 'Incomplete'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Tasks;
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Task from '../components/Task';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5001/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      const response = await api.post('http://localhost:5001/api/tasks', { title, description });
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
          className="border border-gray-400 rounded-md p-2 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-400 rounded-md p-2 mr-2 mb-2"
        />
        <button type="submit" className="bg-orange-600 text-white rounded-md p-2">Add Task</button>
      </form>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-orange-600 text-white">
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Completed</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className={index % 2 === 0 ? 'bg-yellow-100' : 'bg-yellow-200'}>
                <td className="px-4 py-2 border border-gray-300">{task.title}</td>
                <td className="px-4 py-2 border border-gray-300">{task.description}</td>
                <td className="px-4 py-2 border border-gray-300">{task.completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
