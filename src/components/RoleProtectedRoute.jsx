import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({children, allowedRoles}) => {
 const {user} = useAuthContext();

 if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.map((r) => r.toLowerCase()).includes(user.role?.toLowerCase())) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RoleProtectedRoute;
