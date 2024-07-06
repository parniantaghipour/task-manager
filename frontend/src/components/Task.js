const Task = ({ task }) => {
  return (
    <div className="p-6 bg-yellow-100 border border-yellow-500 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-orange-800">{task.title}</h3>
      <p className="text-orange-600">{task.description}</p>
      <p className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
        {task.completed ? 'Completed' : 'Not completed'}
      </p>
    </div>
  );
};

export default Task;
