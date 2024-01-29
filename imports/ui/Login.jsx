import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call("users.login", { email, password }, (error, res) => {
      if (error) {
        console.error("Error login user:", error.reason);
        alert(error.reason);
      } else {
        console.log("User logged in successfully");
        localStorage.setItem("role", res.role);
        localStorage.setItem("email", email);
        navigate("/");
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center mx-5 md:mx-0">
      <div className="bg-white p-5 rounded-lg w-full md:w-[25%]">
        <h1 className="text-2xl text-center font-semibold mb-4">
          Welcome user!
        </h1>
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <p className="text-center mt-3 mb-1 text-gray-800">Login</p>
          <input
            className="mt-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mt-4 mb-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2 mb-4 flex justify-end">
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Let's go!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
