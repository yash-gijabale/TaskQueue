import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Auth } from "../../redux/authReducer/authReducer";
import type { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/authReducer/action";
import { removeAuthStateFormLocalStorage } from "../../utils/User";

const getFirstLetter = (str: string) => {
  let letter = str.split("")[0];
  return letter || "";
};
const MainHeader: React.FC = () => {
  const auth: Auth = useSelector((state: any) => state.authReducer);
  let letter: string = "";
  if (auth.user) {
    letter = `${getFirstLetter(auth.user?.firstName)}${getFirstLetter(
      auth.user?.lastName
    )}`;
  }

  useEffect(() => {}, [auth]);

  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logout());
    removeAuthStateFormLocalStorage()
  };

  return (
    <header className="h-14  bg-white border-b-1 border-gray-300 flex items-center justify-end px-4">
      <div className="space-x-2 flex">
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex justify-center items-center text-xs text-white">
          {letter.toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="p-1 px-2 rounded bg-red-200 transition-all items-center text-red-800 text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
