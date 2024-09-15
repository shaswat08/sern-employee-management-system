import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCategories = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/admin/category", {
        category,
      });
      if (response?.data) {
        toast.success(response.data.message);
        setCategory("");
        navigate("/dashboard/categories");
      }
    } catch (error) {
      if (error?.response?.data) {
        console.log(error?.response?.data?.message);
        alert(error?.response?.data?.error);
      } else {
        console.log("Something went wrong");
      }
    }
  };
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg border border-gray-300">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Add a Category
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="category" className="text-gray-700 font-medium">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="Enter a category"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
