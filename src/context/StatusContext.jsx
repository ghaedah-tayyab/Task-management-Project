import {createContext, useContext, useState, useEffect} from 'react';
import { useTaskContext } from "./TaskContext";


const StatusContext = createContext();

const Statusprovider = ({children}) =>{
  const { tasks, editTask  } = useTaskContext();
  const [statuses, setStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem("statuses");
  
    return savedStatuses
      ? JSON.parse(savedStatuses)
      : [
          { id: 1, name: "Todo" },
          { id: 2, name: "In Progress" },
          { id: 3, name: "Completed" },
        ];
  });
  
  const addStatus = (newStatus) => {
    const trimmed = newStatus.trim();
    if (!trimmed) {
      return false;
    }
    const isDuplicate = statuses.some(
      (status) => status.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      return false;
    }

    const newStatusObject = {
      id: Date.now(),
      name: trimmed
    };
  
    setStatuses((prevStatuses) => [
      ...prevStatuses,
      newStatusObject
    ]);
  };


  const deleteStatus = (id) => {
    const status = statuses.find((status) => status.id === id);
  
    const isUsed = tasks.some(
      (task) => task.status === status.name
    );
  
    if (isUsed) {
      alert("Cannot delete this status because it is being used by a task.");
      return;
    }
  
    setStatuses((prev) => prev.filter((status) => status.id !== id));
  };

  
const editStatus = (id, updatedName) => {
  const trimmedName = updatedName.trim();
  
  if (!trimmedName) return;
  const oldStatus = statuses.find((status) => status.id === id);
   setStatuses((prev) => {
    const isDuplicate = prev.some(
      (status) =>
        status.id !== id &&
        status.name.toLowerCase() === trimmedName.toLowerCase()
    );
      if (isDuplicate) return prev;
      tasks
      .filter((task) => task.status === oldStatus.name)
      .forEach((task) => {
        editTask(task.id, {
          ...task,
          status: trimmedName
        });
      });
    return prev.map((status) =>
      status.id === id ? { ...status, name: trimmedName } : status
    );
  });
};
   
useEffect(() => {
  localStorage.setItem("statuses", JSON.stringify(statuses));
}, [statuses]);

return (
  <StatusContext.Provider value={{statuses, setStatuses, addStatus, deleteStatus, editStatus}}>
    {children}
  </StatusContext.Provider>
)
};


const useStatusContext = () => {
    return useContext(StatusContext);
  };

  
export {Statusprovider, useStatusContext };
