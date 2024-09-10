import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
  return (
    <div className="p-7 mt-20 h-[80vh] flex items-center">
      <div className="flex flex-col gap-5 w-[30%] mx-auto p-5 border border-red-200">
        <h1 className="text-2xl font-bold tracking-widest"> Login </h1>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-md font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="py-2 pl-5 bg-red-200 rounded outline-none text-sm"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <PasswordInput eye={FaEye} slash={FaEyeSlash} />
          <button
            className="mt-2 w-[50%] bg-green-200 px-5 py-2 rounded tracking-wider hover:bg-green-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
