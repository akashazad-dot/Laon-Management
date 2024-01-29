import React, { useEffect } from "react";
import LoanRequest from "./LoanRequest";
import Lender from "./Lender";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  var role = localStorage.getItem("role");
  var email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/signup");
  };

  useEffect(() => {
    role = localStorage.getItem("role");
    email = localStorage.getItem("email");
    if (!role || !email) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gray-100">
      <div className="bg-white flex sm:px-4 md:px-12 py-3 flex justify-between items-center">
        <h1 className="text-black text-sm md:text-3xl font-bold">
          {role && role}
        </h1>
        <p className="text-sm md:text-lg">{email}</p>
      </div>

      <div className="bg-white p-5 mt-5 sm:w-[90%] md:w-[85%] mx-auto rounded-lg shadow-lg">
        {role === "Borrower" && <LoanRequest role={role} email={email} />}
        {role === "Lender" && <Lender role={role} email={email} />}
        {role === "Admin" && <Admin email={email} />}

        <div className="flex item-center justify-center mt-12">
          <button
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
