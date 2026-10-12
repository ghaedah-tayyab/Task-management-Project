import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, Bell, LogOut } from "lucide-react";
const Navbar = () => {

  const {user, logout} = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initial = user?.firstName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-6 py-4 text-white shadow-md">

      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-600 p-2">
          <ClipboardCheck size={22} />
        </div>
        <h2 className="text-lg font-bold tracking-wide">Task Manager</h2>
      </div>

      <div className="flex items-center gap-5">

        <button className="relative rounded-full p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white">
          <Bell size={22} />
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 rounded-full bg-slate-800 py-1 pl-1 pr-4 transition hover:bg-slate-700">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-sm font-bold">
            {initial}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{user?.firstName}</span>
         
            <span className="text-xs capitalize text-slate-400">{user?.role}</span>
          </div>
        </div>
        <button
            onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};


export default Navbar;