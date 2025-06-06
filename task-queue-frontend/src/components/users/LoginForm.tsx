import React, { useEffect, useState } from "react";
import {
  addAuthToLocalStorage,
  getAllusersFromLocalStorage,
} from "../../utils/User";
import type { User } from "../../redux/userReducer/userReducer";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { loginSingupHandler } from "../../redux/authReducer/action";

interface LoginData {
  userName: string;
  password: string;
}

interface propType {
  setIsLogin: any;
}

const DEFAULT_LOGIN: LoginData = {
  userName: "",
  password: "",
};

const users: User[] = getAllusersFromLocalStorage();

const LoginForm: React.FC<propType> = ({ setIsLogin }) => {
  const [loginData, setLoginData] = useState<LoginData>(DEFAULT_LOGIN);

  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const checkLoginCredentials = () => {
    let authUser: any = users.find((user: User) => {
      if (
        user.userName === loginData.userName &&
        user.password === loginData.password
      ) {
        return user;
      }
    });
    return authUser;
  };
  const handleLogin = () => {
    let authUser: any = checkLoginCredentials();
    if (authUser) {
      dispatch(loginSingupHandler(authUser));
      addAuthToLocalStorage({
        isLogged: true,
        user: authUser,
      });
    } else {
      setError("Invalid credentials");
    }
    setLoginData(DEFAULT_LOGIN);
  };

  useEffect(() => {
    return () => {
      setError("");
    };
  }, []);

  return (
    <div className="space-y-4">
      {error && (
        <div className="w-full text-center bg-red-300 rounded">{error}</div>
      )}
      <div className="w-full">
        <label>User Name</label>
        <input
          onChange={(e) => {
            setLoginData((pre) => ({ ...pre, userName: e.target.value }));
          }}
          className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"
        ></input>
      </div>
      <div className="w-full">
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setLoginData((pre) => ({ ...pre, password: e.target.value }));
          }}
          className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"
        ></input>
      </div>
      <button
        onClick={handleLogin}
        className="w-full p-1 py-2 rounded font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white cursor-pointer hover:bg-indigo-800 transition-all"
      >
        Log in
      </button>

      <button
        onClick={() => setIsLogin(false)}
        className="w-full p-1 py-2 rounded font-medium text-violet-700 cursor-pointer hover:bg-gray-100 transition-all"
      >
        Sign up
      </button>
    </div>
  );
};

export default LoginForm;
