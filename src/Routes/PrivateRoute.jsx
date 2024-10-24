import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
  
  const { user, loading } = useAuth();
  const location = useLocation()
  console.log(location.pathname);


  if (loading) {
    return <div className="flex items-center justify-center"><progress className="progress w-56"></progress></div>
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;
// location.pathname