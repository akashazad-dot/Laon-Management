import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/" element={<Dashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};
