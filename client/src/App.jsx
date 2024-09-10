import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
