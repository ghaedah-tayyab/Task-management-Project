import { useNavigate } from "react-router-dom"
import { memo } from 'react';
import { useAuthContext } from "../context/AuthContext";
import { useSortable } from "@dnd-kit/react/sortable";
import { Calendar, Pencil, Trash2 } from "lucide-react";

const labelColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];
const getLabelColor = (name) => {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return labelColors[sum % labelColors.length];
};
const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};


const Taskcard = ({task, deleteTask,  index, column  }) => {
  const {ref} = useSortable({
    id: task.id,
    type: "task",
    group: column,
    index,
  
  });
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleclick = () =>{
    navigate(`/edit-task/${task.id}`)
  }

  const hanndleDetails = () =>{
    navigate(`/task-details/${task.id}`)
  }

  const canEditTask = user?.role === "Admin" || user?.role === "Manager";
  const canDeleteTask = user?.role === "Admin" || user?.role === "Manager";
 


  return (
    <div
      ref={ref}
      onClick={hanndleDetails}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
    
      <div className="mb-2 text-base font-semibold text-slate-800">{task.title}</div>
      {task.priority && (
        <span className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${priorityColors[task.priority.toLowerCase()] ?? "bg-slate-100 text-slate-600"}`}>
          {task.priority}
        </span>
      )}

      {task.labels && task.labels.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {task.labels.map((name) => (
            <span
              key={name}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${getLabelColor(name)}`}
            >
              {name}
            </span>
          ))}
        </div>
      )}
      {task.dueDate && (
        <div className="mb-4 flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar size={14} />
          {task.dueDate}
        </div>
      )}
      <div className="flex gap-2 border-t border-slate-100 pt-3">
        {canDeleteTask && (
          <button
            onClick={(event) => { event.stopPropagation(); deleteTask(task.id); }} 
            className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <Trash2 size={14} /> Delete
          </button>
        )}
        {canEditTask && (
          <button
            onClick={(event) => { event.stopPropagation(); handleclick(); }} 
            className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            <Pencil size={14} /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Taskcard);
