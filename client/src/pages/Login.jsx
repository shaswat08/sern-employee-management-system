import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/admin/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response?.data) {
        console.log(response.data.message);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error?.response?.data) {
        setError(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="p-7 mt-20 h-[80vh] flex items-center">
      <div className="flex flex-col gap-5 w-[30%] mx-auto p-5 border border-red-200">
        <h1 className="text-2xl font-bold tracking-widest"> Login </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-md font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="py-2 pl-5 bg-red-200 rounded outline-none text-sm"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <PasswordInput
            eye={FaEye}
            slash={FaEyeSlash}
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
          <button
            className="mt-2 w-[50%] bg-green-200 px-5 py-2 rounded tracking-wider hover:bg-green-300"
            type="submit"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
