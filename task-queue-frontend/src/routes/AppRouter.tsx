import React from "react";
import Home from "../pages/Home";
import { useRoutes } from "react-router";
import { Navigate, type RouteObject } from "react-router";
import BoardView from "../pages/BoardView";
import BoardSectionList from "../pages/BoardSectionList";
import Users from "../pages/Users";

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/board-list",
    element: <BoardView />,
  },
  {
    path: "/board/:id",
    element: <BoardSectionList />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];
const AppRouter: React.FC = () => {
  return useRoutes(routes);
};

export default AppRouter;
