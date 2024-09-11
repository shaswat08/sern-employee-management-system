import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-slate-800 text-white flex flex-col items-center py-6 px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">Console</h1>
        </div>
        <nav className="w-full flex flex-col gap-2">
          <Link to="/dashboard" className="w-full">
            <div className="p-4 flex items-center gap-3 bg-slate-700 hover:bg-slate-600 rounded-md transition duration-200">
              <FaTachometerAlt className="text-xl" />
              <span className="text-lg">Dashboard</span>
            </div>
          </Link>
          <Link to="/dashboard/employees" className="w-full">
            <div className="p-4 flex items-center gap-3 bg-slate-700 hover:bg-slate-600 rounded-md transition duration-200">
              <FaUsers className="text-xl" />
              <span className="text-lg">Employees</span>
            </div>
          </Link>
          <Link to="/dashboard/categories" className="w-full">
            <div className="p-4 flex items-center gap-3 bg-slate-700 hover:bg-slate-600 rounded-md transition duration-200">
              <MdCategory className="text-xl" />
              <span className="text-lg">Categories</span>
            </div>
          </Link>
          <Link to="/dashboard/profile" className="w-full">
            <div className="p-4 flex items-center gap-3 bg-slate-700 hover:bg-slate-600 rounded-md transition duration-200">
              <FaUser className="text-xl" />
              <span className="text-lg">Profile</span>
            </div>
          </Link>
          <Link to="/logout" className="w-full">
            <div className="p-4 flex items-center gap-3 bg-slate-700 hover:bg-slate-600 rounded-md transition duration-200">
              <FaSignOutAlt className="text-xl" />
              <span className="text-lg">Log out</span>
            </div>
          </Link>
        </nav>
      </div>
      <div className="flex-1">
        <div className="text-center border-b border-gray-300 shadow-md bg-white py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Employee Management System
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
