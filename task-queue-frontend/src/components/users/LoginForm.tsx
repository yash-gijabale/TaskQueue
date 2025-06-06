import React from "react";

interface propType {
  setIsLogin: any;
}
const LoginForm: React.FC<propType> = ({ setIsLogin }) => {
  return (
    <div className="space-y-4">
      <div className="w-full">
        <label>User Name</label>
        <input className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"></input>
      </div>
      <div className="w-full">
        <label>Password</label>
        <input
          type="password"
          className="w-full border-2 border-gray-300 outline-violet-500 rounded p-1 py-2 bg-gray-100"
        ></input>
      </div>
      <button className="w-full p-1 py-2 rounded font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white cursor-pointer hover:bg-indigo-800 transition-all">
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
