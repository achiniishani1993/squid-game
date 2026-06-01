import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  //console.log(user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
  
};

export default ProtectedRoutes;