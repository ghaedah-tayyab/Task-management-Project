import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { useAuthContext } from "../context/AuthContext";

const Tasks = () => {
  const { user } = useAuthContext();
    const navigate = useNavigate();
    const { tasks } = useTaskContext(); 
    const canAddTask = user?.role === "Admin" || user?.role === "Manager";

    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-1">
        <h1 className="font-bold text-3xl text-gray-900">All Tasks:{tasks.length}</h1>
        {canAddTask && (
          <button onClick={() => navigate("/create-task")}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        > + Add New Task</button>)}
        </div>
        <p className="text-gray-500 mb-8">Manage and organize all your tasks</p>
        {tasks.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400 text-lg mb-4">No tasks yet</p>
          {canAddTask && (
            <button
                onClick={() => navigate("/create-task")}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
              Add Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="font-medium text-gray-800">{task.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
      
  };
  
  export default Tasks;