import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/userSlice";

export default function ProtectRoutes({ children }) {
   
  
  const userToken = useSelector((store) => store.user.token);

  return userToken ? children : <Navigate to={"/login"} />;
}
