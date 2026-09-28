import { useJwt } from "react-jwt";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const rawUserData =
    localStorage.getItem("userData") || sessionStorage.getItem("userData");
  const userData = rawUserData ? JSON.parse(rawUserData) : {};
  const token = userData?.accessToken ?? "";
  const { isExpired } = useJwt(token);

  if (!token || isExpired) {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
