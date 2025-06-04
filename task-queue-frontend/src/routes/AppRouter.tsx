import React from "react";
import Home from "../pages/Home";
import { useRoutes } from "react-router";
import { Navigate, type RouteObject } from 'react-router';
import BoardView from "../pages/BoardView";

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bord",
    element: <BoardView />,
  },
  {
    path: "*",
    element: <Navigate to={'/'} />,
  },
];
const AppRouter: React.FC = () => {
  return useRoutes(routes);
};

export default AppRouter;
