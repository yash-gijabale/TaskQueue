import React, { useState } from "react";
import type { User } from "../../redux/userReducer/userReducer";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { createUser } from "../../redux/userReducer/action";
import { loginSingupHandler } from "../../redux/authReducer/action";
import {
  addAuthToLocalStorage,
  getAllusersFromLocalStorage,
  updateUserLocalStorage,
} from "../../utils/User";
import type { FormError } from "../common/Modal";
import { checkForReuiredFiled } from "../../utils/Board";
interface propType {
  setIsLogin: any;
}

const DEFAULT_USER: User = {
  firstName: "",
  lastName: "",
  id: uuid(),
  userName: "",
  password: "",
  type: "admin",
};
const SignupForm: React.FC<propType> = ({ setIsLogin }) => {
  const [signUpFrom, setSignUpForm] = useState<User>(DEFAULT_USER);
  const dispatch = useDispatch<AppDispatch>();
  const [formError, setFormError] = useState<FormError>({
    error: false,
    message: [],
  });
  const handleSignUp = () => {
    let fileds = ["firstName", "lastName", "userName", "password"];
    let check = checkForReuiredFiled(fileds, signUpFrom);
    if (check) {
      dispatch(createUser(signUpFrom));
      dispatch(loginSingupHandler(signUpFrom));
      addAuthToLocalStorage({
        isLogged: true,
        user: signUpFrom,
      });
      updateUserLocalStorage([...getAllusersFromLocalStorage(), signUpFrom]);
      setFormError({ error: false, message: [] });
    } else {
      setFormError({
        error: true,
        message: fileds.map((m) => `${m.toLocaleUpperCase()} is required`),
      });
    }
  };

  return (
    <div className="space-y-4 mt-5">
        <div className="w-full">
          {formError?.error && (
            <div className="w-full bg-red-300 text-red-900 px-2">
              {formError.message.map((m, ind) => {
                return <p className="w-full" key={ind}>{m}</p>;
              })}
            </div>
          )}
        </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <label>First Name</label>
          <input
            value={signUpFrom.firstName}
            onChange={(e: any) =>
              setSignUpForm((pre: User) => ({
                ...pre,
                firstName: e.target.value,
              }))
            }
            className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"
          ></input>
        </div>
        <div className="w-1/2">
          <label>Last Name</label>
          <input
            value={signUpFrom.lastName}
            onChange={(e: any) =>
              setSignUpForm((pre: User) => ({
                ...pre,
                lastName: e.target.value,
              }))
            }
            className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"
          ></input>
        </div>
      </div>
      <div className="w-full">
        <label>User Name</label>
        <input
          type="text"
          value={signUpFrom.userName}
          onChange={(e: any) =>
            setSignUpForm((pre: User) => ({ ...pre, userName: e.target.value }))
          }
          className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"
        ></input>
      </div>
      <div className="w-full">
        <label>Password</label>
        <input
          type="text"
          value={signUpFrom.password}
          onChange={(e: any) =>
            setSignUpForm((pre: User) => ({ ...pre, password: e.target.value }))
          }
          className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"
        ></input>
      </div>
      <button
        onClick={handleSignUp}
        className="w-full p-1 py-2 rounded font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white cursor-pointer hover:bg-indigo-800 transition-all"
      >
        Sign Up
      </button>

      <button
        onClick={() => setIsLogin(true)}
        className="w-full p-1 py-2 rounded font-medium text-violet-700 cursor-pointer hover:bg-gray-100 transition-all"
      >
        Log in
      </button>
    </div>
  );
};

export default SignupForm;
