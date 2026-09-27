import { useJwt } from "react-jwt";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const rawUserData = localStorage.getItem("userData");
  const userData = rawUserData ? JSON.parse(rawUserData) : {};
  const token = userData?.user?.accessToken ?? "";
  const { isExpired } = useJwt(token);

  if (!token || isExpired) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
