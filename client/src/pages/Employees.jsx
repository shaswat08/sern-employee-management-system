import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Employees = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchEmployeeList = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/get_employees");
      setEmployeeList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const response = await axiosInstance.delete(`/api/admin/remove/${id}`);
    fetchEmployeeList();
  };

  const handleEdit = (employee) => {
    setIsEdit(true);
    navigate("/dashboard/add_employees", { state: { isEdit: true, employee } });
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 bg-white shadow-md rounded-lg border border-gray-300">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Employees</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {employeeList.length > 0 ? (
            employeeList.map((employee) => (
              <div
                key={employee.id}
                className="p-4 flex flex-col gap-2 border border-gray-300 rounded-md text-gray-700 bg-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/${employee.image}`}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{employee.name}</p>
                    <p className="text-gray-500 text-sm">{employee.email}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Position: {employee.category}
                </p>
                <p className="text-gray-500 text-sm">
                  Salary: ${employee.salary}
                </p>
                <p className="text-gray-500 text-sm">
                  Address: {employee.address}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-blue-500 bg-blue-100 px-3 py-1 rounded-md hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-gray-500 bg-red-100 px-3 py-1 rounded-md hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No employees found.</p>
          )}
        </div>
        <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
          <Link to="/dashboard/add_employees">Add an Employee</Link>
        </button>
      </div>
    </div>
  );
};

export default Employees;
