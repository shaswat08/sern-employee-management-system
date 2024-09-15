import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const AddEmployees = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location?.state?.isEdit;
  const employee = location?.state?.employee;

  const [categoryList, setCategoryList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("api/admin/category_list");
      setCategoryList(response?.data);
    } catch (error) {
      if (error?.response?.data) {
        console.log(error?.response?.data?.message);
        alert(error?.response?.data?.error);
      } else {
        console.log("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEdit && employee) {
      setFormData({
        name: employee?.name,
        email: employee?.email,
        salary: employee?.salary,
        address: employee?.address,
        category_id: employee?.category_id,
        image: null,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
        image: null,
      });
    }
  }, [isEdit, employee]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("salary", formData.salary);
      form.append("address", formData.address);
      form.append("category_id", formData.category_id);
      form.append("image", formData.image);

      let response;

      if (isEdit) {
        response = await axiosInstance.put(
          `/api/admin/edit/${employee.id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axiosInstance.post("/api/admin/add_employee", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response?.data) {
        alert(response?.data?.message);
        setEmployeeList(response?.data?.data);
        setFormData({
          name: "",
          email: "",
          salary: "",
          address: "",
          category_id: "",
          image: null,
        });
        navigate("/dashboard/employees");
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
          {isEdit ? "Edit Employee Details" : "Add an Employee"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter an Employee name"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="salary" className="text-gray-700 font-medium">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            placeholder="Enter Salary"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            value={formData.salary}
            onChange={handleChange}
          />
          <label htmlFor="address" className="text-gray-700 font-medium">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="1234 Main St"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            value={formData.address}
            onChange={handleChange}
          />
          <label htmlFor="category" className="text-gray-700 font-medium">
            Category
          </label>
          <select
            name="category_id"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="disabled"> Select a category </option>
            {categoryList.map((category, index) => (
              <option value={category.id}> {category.name} </option>
            ))}
          </select>
          <label htmlFor="image" className="text-gray-700 font-medium">
            Select Image
          </label>
          <input
            type="file"
            name="image"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isEdit ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployees;
