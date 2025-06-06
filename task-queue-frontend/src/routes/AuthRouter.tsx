import React from "react";
import { useRoutes } from "react-router";
import { Navigate, type RouteObject } from "react-router";
import Login from "../pages/Login";

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];
const AuthRouter: React.FC = () => {
  return useRoutes(routes);
};

export default AuthRouter;
