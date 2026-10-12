import { createContext, useContext, useState, useEffect } from 'react';
import useFetchTasks from '../hooks/useFetchTasks';
import useFetchUsers from '../hooks/useFetchUsers';
import { useCallback } from 'react';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
     
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem("teamMembers");
    if (!saved) return [];

    const seen = new Set();
    return JSON.parse(saved).map((m, i) => {
      let id = m.id;
      if (id == null || seen.has(id)) id = Date.now() + i; 
      seen.add(id);
      return { ...m, id };
    });
  });
  useEffect(() => {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
  }, [teamMembers]);
  
 const addTeamMember = (member) => {
  const name = member.memberName.trim().toLowerCase();
  const email = member.email.trim().toLowerCase();


  const duplicate = teamMembers.find(
      (m) =>
        (m.memberName || m.name || "").trim().toLowerCase() === name ||
        (m.email || "").trim().toLowerCase() === email
    );

    if (duplicate) {
      return { success: false, message: "A member with this name or email already exists." };
    }

    setTeamMembers((prevMembers) => [
      ...prevMembers,
      {
        id: Date.now(),
        ...member,
        memberName: member.memberName.trim(),
        email: member.email.trim(),
      },
    ]);

    return { success: true };
 };
    const { tasks: fetchedTasks, loading, error } =
    useFetchTasks("https://dummyjson.com/todos");

    const { users: fetchedUsers, loading: usersLoading, error: usersError} =
    useFetchUsers("https://dummyjson.com/users?limit=0");
    const [tasks, setTasks] = useState(() => {
          const savedTasks = localStorage.getItem("tasks");
          return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const newTasks = fetchedTasks.map((task) => {

        const user = fetchedUsers.find((user) => user.id === task.userId);
        return {
          id: task.id,
          title: task.todo,
          description: "Task from API",
          priority: task.id % 3 === 0
          ? "High"
          : task.id % 3 === 1
          ? "Low"
          : "Medium",
          status: task.id % 3 === 0
            ? "Completed"
            : task.id % 3 === 1
            ? "Todo"
            : "In Progress",
            assignedTo: user
            ? `${user.firstName} ${user.lastName}`
            : "Unassigned"
        };
      
      });
      const isValidEmail = (email) => email && email !== "No email";

      const existingMembers = tasks
        .filter((task) => task.assignedTo && task.assignedTo !== "Unassigned")
        .map((task) => {
          const apiUser = fetchedUsers.find(
            (user) => `${user.firstName} ${user.lastName}` === task.assignedTo
          );
      
          const boardMember = teamMembers.find(
            (member) =>
              member.name === task.assignedTo ||
              member.memberName === task.assignedTo ||
              `${member.firstName || ""} ${member.lastName || ""}`.trim() ===
                task.assignedTo
          );
      
          return {
            id: boardMember?.id || apiUser?.id || task.id,
            memberName: task.assignedTo,
            email: isValidEmail(boardMember?.email)
              ? boardMember.email
              : isValidEmail(apiUser?.email)
              ? apiUser.email
              : "No email",
          };
        })
        .filter(
          (member, index, array) =>
            array.findIndex((item) => item.memberName === member.memberName) === index
        );
    
    useEffect(() => {
      if (existingMembers.length === 0) return;
    
      setTeamMembers((prevMembers) => {
        const updatedMembers = [...prevMembers];
    
        existingMembers.forEach((newMember) => {
          const index = updatedMembers.findIndex(
            (member) =>
              (member.memberName || member.name) === newMember.memberName
          );
    
          if (index === -1) {
            
            updatedMembers.push(newMember);
          } else {
           
            updatedMembers[index] = {
              ...updatedMembers[index],
              memberName: newMember.memberName,
              email: isValidEmail(newMember.email)
                  ? newMember.email
                  : updatedMembers[index].email,
            };
          }
        });
    
        return updatedMembers;
      });
    }, [tasks, fetchedUsers]);

      const addTask = (task) =>{
        const newTask = {
          ...task,
          id: Date.now()
        };
        setTasks((prevTasks) => [...prevTasks, newTask])
      };

      useEffect(() => { 
        if (newTasks.length > 0 && tasks.length === 0) {
          setTasks(newTasks); 
        };
      }, 
        [fetchedTasks, fetchedUsers]);

      const deleteTask = useCallback((id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }, []);
      const deleteTeamMember = (memberName) => {
       
        setTeamMembers((prevMembers) =>
          prevMembers.filter(
            (member) => (member.memberName || member.name) !== memberName
          )
        );

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.assignedTo === memberName
              ? { ...task, assignedTo: "Unassigned" }
              : task
          )
        );
      };

      const editTask = (id, updatedTask) => {
        setTasks((prevTasks) => prevTasks.map((task)=> task.id === id ? updatedTask : task))
     }

    const moveTask = (id, newStatus, beforeId) => {
      setTasks((prevTasks) => {
        const moved = prevTasks.find((task) => task.id === id);
        if (!moved) return prevTasks;
    
        const rest = prevTasks.filter((task) => task.id !== id);
        const updated = { ...moved, status: newStatus };
    
        const insertAt = beforeId
          ? rest.findIndex((task) => task.id === beforeId)
          : -1;
    
        if (insertAt === -1) return [...rest, updated];
    
        return [...rest.slice(0, insertAt), updated, ...rest.slice(insertAt)];
      });
    };
      

     const updateTaskStatus = (id, newStatus) =>{
      setTasks((prevTasks) =>
        prevTasks.map((task)=> task.id === id ? { ...task, status: newStatus } : task) );
     }

     
    return (
        <TaskContext.Provider value={{tasks, addTask, deleteTask, editTask, loading, error, 
        usersLoading, usersError, updateTaskStatus, fetchedUsers, moveTask, teamMembers,addTeamMember, deleteTeamMember}}>
          {children}
        </TaskContext.Provider>
      );
};

const useTaskContext = () => {
    return useContext(TaskContext);
  };
 

export { TaskProvider, useTaskContext };