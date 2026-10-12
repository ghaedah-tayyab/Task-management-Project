import { useState } from "react";
import { useStatusContext } from "../context/StatusContext";

const StatusManager = () => {
  const { addStatus, statuses, deleteStatus, editStatus } =
    useStatusContext();

  const [newStatus, setNewStatus] = useState("");

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-2 text-2xl font-bold text-slate-800"> Status Manager </h1>
      <p className="mb-6 text-sm text-slate-500"> Create and manage task statuses </p>

      <div className="flex gap-3">
        <input type="text" value={newStatus} placeholder="Enter status"
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          onChange={(e) => setNewStatus(e.target.value)}
        />
          <button
                onClick={() => {
                addStatus(newStatus);
                setNewStatus("");
                }}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
              Add Status
          </button>

      </div>
      
      <h2 className="mt-8 mb-4 text-lg font-semibold text-slate-700">
        Your Statuses
      </h2>
       
        <div className="space-y-3">
          <ul>
             {statuses.map((status) => (
              <li key={status.id} 
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <span className="font-medium text-slate-700">
                  {status.name}
                </span>

                <button onClick={() => deleteStatus(status.id)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
                  Delete
                </button>

                <input
                  type="text" id={`edit-${status.id}`}
                  defaultValue={status.name}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                />

                <button
                  onClick={() => {
                    const input = document.getElementById(
                      `edit-${status.id}`
                    );

                    editStatus(status.id, input.value);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default StatusManager;

