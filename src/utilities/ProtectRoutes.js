import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const userToken = useSelector((store) => store.user.token);

  return userToken ? children : <Navigate to={"/login"} />;
}
