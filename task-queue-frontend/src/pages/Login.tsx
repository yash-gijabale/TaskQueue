import React, { useState } from "react";
import LoginForm from "../components/users/LoginForm";
import SignupForm from "../components/users/SignupForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="w-[70%] h-full flex justify-center items-center bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="w-[60%] m-auto">
          <h1 className="text-white font-bold text-5xl/snug z-70">
            Task Quesue brings all your task, teammates and tool together.
          </h1>
          <div className="w-100 h-100 rounded-full bg-violet-500/65 absolute top-[-10%] left-[-5%] z-[0]"></div>
          <div className="w-70 h-70 rounded-full bg-indigo-500/65 absolute top-110 left-200"></div>
        </div>
      </div>
      <div className="w-[30%] h-full flex justify-between items-center bg-gray-100 z-10">
        <div className="w-[90%] m-auto rounded-lg shadow bg-white p-3 py-6">
          {/* <div className="w-full bg-red-300 rounded p-1 text-red-900 text-center">Invalid Credential</div> */}
          <div className="w-full text-center font-medium text-xl ">
            {isLogin ? 'Log In' : 'Sign Up'}
          </div>
          {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
