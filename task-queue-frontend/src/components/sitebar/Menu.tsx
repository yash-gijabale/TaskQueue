import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { MdAssessment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";


const Menu: React.FC = () => {
  return (
    <>
      <div className="w-full h-10 flex rounded px-2 items-center text-gray-700 hover:bg-gray-200 cursor-pointer hover:text-black">
        <div className="flex space-x-1 items-center justify-center">
          <MdSpaceDashboard className="text-[25px]" />
          <span className="text-md">Dashboard</span>
        </div>
      </div>
      <div className="w-full h-10 flex rounded px-2 items-center text-gray-700 hover:bg-gray-200 cursor-pointer hover:text-black">
        <div className="flex space-x-1 items-center justify-center">
          <MdAssessment className="text-[25px]" />
          <span className="text-md">Board</span>
        </div>
      </div>
      <div className="w-full h-10 flex rounded px-2 items-center text-gray-700 hover:bg-gray-200 cursor-pointer hover:text-black">
        <div className="flex space-x-1 items-center justify-center">
          <FaUsers className="text-[25px]" />
          <span className="text-md">User</span>
        </div>
      </div>
    <div className="w-full h-10 flex rounded px-2 items-center text-gray-700 hover:bg-gray-200 cursor-pointer hover:text-black">
        <div className="flex space-x-1 items-center justify-center">
          <IoSettingsSharp className="text-[25px]" />
          <span className="text-md">Account</span>
        </div>
      </div>
    </>
  );
};

export default Menu;
