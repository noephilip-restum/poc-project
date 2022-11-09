import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const userJson = localStorage.getItem("loggedIn");
  let user = userJson !== null ? JSON.parse(userJson) : {};
  if (user.account_role === "admin" || user.account_role === "root") {
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
