import Stats from "../components/Stats"
import TaskFilters from "../components/TaskFilters";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { tasks} = useTaskContext();
  const navigate = useNavigate();
  
      const handleClick = () =>{
        navigate("/create-task");
      }

  return (
<div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Task Management</h1>
          <p className="text-sm text-slate-500">Manage your tasks and stay organized</p>
        </div>

        <button
          onClick={handleClick}
          className="flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
        >
          <Plus size={18} /> Create Task
        </button>
      </div>

      <div>
        <Stats tasks={tasks} />
        <TaskFilters tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;