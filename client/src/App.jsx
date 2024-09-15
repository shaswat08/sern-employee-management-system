import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import AddCategories from "./components/AddCategories";
import AddEmployees from "./components/AddEmployees";

const App = () => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="employees" element={<Employees />} />
          <Route path="add_employees" element={<AddEmployees />} />
          <Route path="categories" element={<Categories />} />
          <Route path="add_categories" element={<AddCategories />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
