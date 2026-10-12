import {createContext, useContext, useState} from 'react';


const AuthContext = createContext();

const  AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const authUsers = localStorage.getItem("loggedInUser");
        return authUsers ? JSON.parse(authUsers) : null;

    }); 

    const logout = () =>{
       setUser(null);
      localStorage.removeItem("loggedInUser");
    }

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
        )


}

const useAuthContext = () => {
    return useContext(AuthContext);
  };

  
export {AuthProvider, useAuthContext };