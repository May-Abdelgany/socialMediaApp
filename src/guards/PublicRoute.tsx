import { Navigate, Outlet } from "react-router-dom";

import { useJwt } from "react-jwt";

export const PublicRoute = () => {
  const rawUserData = localStorage.getItem("userData")|| sessionStorage.getItem("userData");
  const userData = rawUserData ? JSON.parse(rawUserData) : {};
  const token = userData?.accessToken ?? "";
  const { isExpired } = useJwt(token);

  if (token && !isExpired) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};