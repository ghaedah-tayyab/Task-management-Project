import { useTaskContext } from "../context/TaskContext";
import { useAuthContext } from "../context/AuthContext";

const Team = () => {
  const { teamMembers, deleteTeamMember } = useTaskContext();
  const { user } = useAuthContext();

  const canManage = ["manager", "admin"].includes(user?.role?.toLowerCase());

  const handleDelete = (name) => {
    if (window.confirm(`Delete ${name} from the team? Their tasks will become Unassigned.`)) {
      deleteTeamMember(name);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Team Members: {teamMembers.length}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {teamMembers.map((member) => {
          const name = member.memberName || member.name;

          return (
            <div
              key={name}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100"
            >
              <div className="font-bold text-gray-800 text-lg">👤 {name}</div>

              <div className="text-sm text-gray-400 mt-1 truncate">
                📧 {member.email || "No email"}
              </div>

              {canManage && (
                <button
                  onClick={() => handleDelete(name)}
                  className="mt-3 text-sm text-red-600 border border-red-200 hover:bg-red-50 rounded-lg px-3 py-1 transition-colors"
                >
                  🗑 Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;