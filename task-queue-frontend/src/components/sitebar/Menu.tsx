import React from "react";
import { MdAssessment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router";

const MENUS = [
  // {
  //   id: "dashboard",
  //   name: "Dashboard",
  //   icon: <MdSpaceDashboard className="text-[25px]" />,
  //   target: "",
  // },
  {
    id: "board",
    name: "Board",
    icon: <MdAssessment className="text-[25px]" />,
    target: "board-list",
  },
  {
    id: "users",
    name: "Users",
    icon: <FaUsers className="text-[25px]" />,
    target: "users",
  },
];

const Menu: React.FC = () => {
  return (
    <>
      {MENUS.map((menu: any) => {
        return (
          <Link  key={menu.id} to={menu.target}>
            <div
              className="w-full h-10 flex rounded px-2 items-center text-gray-700 hover:bg-gray-200 cursor-pointer hover:text-black"
            >
              <div className="flex space-x-1 items-center justify-center">
                {menu.icon}
                <span className="text-md">{menu.name}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Menu;
