import { useEffect, useState } from "react";

const useFetchTasks = (url) =>{ 
   const [tasks, setTasks] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      
    const fetchTasks = async () => {
      try{
       const response = await fetch(url);
       const data = await response.json();
       setTasks(data.todos);
       setLoading(false)
      }catch (error) {
         setError("Failed to fetch tasks");
         setLoading(false);
       }
    }
    fetchTasks();
   
   },[url])
   return ({tasks,loading, error});
}

export default useFetchTasks;