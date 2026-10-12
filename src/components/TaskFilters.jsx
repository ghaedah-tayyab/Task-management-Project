import Taskboard from "./Taskboard";
import { useRef, useEffect, useMemo, useState  } from "react";
import { Search, ChevronDown, SearchX, Inbox } from "lucide-react";
import { useStatusContext } from "../context/StatusContext";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
const TaskFilters = ({tasks}) => {
  
 const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const { statuses } = useStatusContext();

  const filteredTasks = useMemo(() => {
   return tasks.filter((task) =>{
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase() )
    const matchesStatus = statusFilter === "all" || task.status.toLowerCase() === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter
  return matchesSearch && matchesStatus && matchesPriority}); 
}, [tasks, search, statusFilter, priorityFilter]);
  
  const myref = useRef();
  useEffect(() => {
      myref.current.focus();
  }, [])
  
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

        {/* CHANGE 4: search icon inside the input.
            The wrapper is "relative", the icon is "absolute", so it sits on top of the input.
            "pointer-events-none" lets clicks pass through the icon to the input.
            The input gets "pl-11" (left padding) so the typed text doesn't overlap the icon. */}
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            ref={myref}
            placeholder="Search tasks..."
            onChange={(event) => setSearch(event.target.value)} // UNCHANGED
            className={`${fieldClass} pl-11 pr-4`}
          />
        </div>

        {/* CHANGE 5: custom dropdown arrow.
            "appearance-none" hides the browser's default arrow (which looks different in every browser).
            Our own ChevronDown icon is placed on the right instead. */}
        <div className="relative">
          <select
            onChange={(event) => setStatusFilter(event.target.value)} // UNCHANGED
            className={`${fieldClass} cursor-pointer appearance-none pl-4 pr-10`}
          >
            <option value="all">All Status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.name.toLowerCase()}>
                {status.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <div className="relative">
          <select
            onChange={(event) => setPriorityFilter(event.target.value)} // UNCHANGED
            className={`${fieldClass} cursor-pointer appearance-none pl-4 pr-10`}
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {/* CHANGE 6: the two plain gray messages became proper empty states
          (icon + title + hint inside a dashed box). Same conditions as before. */}
      {tasks.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white/50 py-14 text-slate-400">
          <Inbox size={36} />
          <p className="font-medium text-slate-600">No tasks available</p>
          <p className="text-sm">Click "Create Task" to add your first one.</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white/50 py-14 text-slate-400">
          <SearchX size={36} />
          <p className="font-medium text-slate-600">No tasks found</p>
          <p className="text-sm">Try a different search or clear the filters.</p>
        </div>
      ) : (
        <Taskboard filteredTasks={filteredTasks} /> 
      )}
    </div>
  );
};

export default TaskFilters;