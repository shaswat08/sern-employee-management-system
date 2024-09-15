import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/category_list");
      setCategoryList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/admin/category/${id}`);
      if (response.status === 200) {
        fetchCategories();
        toast.success("Category deleted successfully");
      }
    } catch (error) {
      if (error?.response?.data) {
        alert(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg border border-gray-300">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Job Categories
        </h1>
        <div className="flex flex-col gap-2 mb-4">
          {categoryList.length > 0 ? (
            categoryList.map((category) => (
              <div
                key={category.id}
                className="p-2 px-5 flex justify-between items-center border border-gray-300 rounded-md text-gray-700"
              >
                <p className="text-gray-500 text-sm">{category.name}</p>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-gray-500 bg-red-100 px-3 py-1 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No categories found.</p>
          )}
        </div>
        <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
          <Link to="/dashboard/add_categories">Add a Category</Link>
        </button>
      </div>
    </div>
  );
};

export default Categories;
