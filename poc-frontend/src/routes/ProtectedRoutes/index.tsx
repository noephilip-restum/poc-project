import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const userJson = localStorage.getItem("loggedIn");
  let user = userJson !== null ? JSON.parse(userJson) : {};
  if (userJson && user.account_role === "admin") {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoutes = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
