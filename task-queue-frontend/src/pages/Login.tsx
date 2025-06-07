import React, { useState } from "react";
import LoginForm from "../components/users/LoginForm";
import SignupForm from "../components/users/SignupForm";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="hidden md:block w-[70%] h-full">
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-violet-600 to-indigo-600">
          <div className="w-[60%] m-auto">
            <h1 className="text-white font-bold text-5xl/snug z-70">
              Task Quesue brings all your task, teammates and tool together.
            </h1>
            {/* <div className="hidden md:block md:w-100 h-100 rounded-full bg-violet-500/65 absolute top-[-10%] left-[-5%] z-[0]"></div>
            <div className="hidden md:block md:w-70 h-70 rounded-full bg-indigo-500/65 absolute top-110 left-200"></div> */}
          </div>
        </div>
      </div>

      <div
        className="w-full md:w-[30%] h-full flex flex-col  justify-between items-center z-10 bg-gradient-to-r from-violet-600 to-indigo-600 
  md:bg-gray-100 md:bg-none"
      >
        <h1 className="inline text-2xl h-[20%] pt-20 p-1 space-x md:hidden text-white font-bold items-center ">
          Task Quesue brings all your task, teammates and tool together.
        </h1>

        <div className="w-[90%] h-auto m-auto rounded-lg shadow bg-white p-3 py-6">
          {/* <div className="w-full bg-red-300 rounded p-1 text-red-900 text-center">Invalid Credential</div> */}
          <div className="w-full text-center font-medium text-xl ">
            {isLogin ? "Log In" : "Sign Up"}
          </div>
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
          ) : (
            <SignupForm setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
