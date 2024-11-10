import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../pages/User/Profile";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Profile/> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
