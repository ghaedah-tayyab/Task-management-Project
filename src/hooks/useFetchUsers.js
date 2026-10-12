import { useEffect, useState } from "react";

const useFetchUsers = (url) => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {

    const fetchUsers = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setUsers(data.users);
            setLoading(false);
          } catch (error) {
            setError("Failed to fetch users");
            setLoading(false);
          }
    };
    fetchUsers();
  }, [url]);

  return { users, loading, error }; 
};

export default useFetchUsers;