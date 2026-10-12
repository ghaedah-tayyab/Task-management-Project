import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListChecks, Users, UserPlus, Settings } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const canManage = ["manager", "admin"].includes(user?.role?.toLowerCase());

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "border-l-4 border-blue-500 bg-blue-600/20 text-white"   
        : "border-l-4 border-transparent text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;
  return (
    <div className="flex h-full flex-col gap-2 bg-slate-800 p-4 text-white">

      <NavLink to="/" end className={linkClass}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink to="/tasks" className={linkClass}>
        <ListChecks size={18} /> Tasks
      </NavLink>

      <NavLink to="/team" className={linkClass}>
        <Users size={18} /> Team Members
      </NavLink>

      {canManage && (
        <NavLink to="/add-member" className={linkClass}>
          <UserPlus size={18} /> Add Member
        </NavLink>
      )}

      <NavLink to="/status-manager" className={linkClass}>
        <Settings size={18} /> Status Manager
      </NavLink>
    </div>
  )
}

export default Sidebar;