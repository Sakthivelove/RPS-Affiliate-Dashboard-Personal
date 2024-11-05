import React, { useState } from "react";
import logo from "../../../public/RockMainLogo.png"; // Adjust the path as necessary
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa"; // Importing eye icons and user/lock icons

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 overflow-hidden"
      style={{
        backgroundImage: "url('../../../public/background.png')", // Updated path for the background image
      }}
    >
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative">
        {/* Gradient border around the entire form */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundImage: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)",
            zIndex: -1,
            borderRadius: "25px",
            padding: "2px", // Create space for the gradient effect
          }}
        />

        {/* Logo Image */}
        <img
          src={logo}
          alt="Rock Main Logo"
          className="mx-auto mb-4 h-24 w-auto" // Adjust the height as needed
        />

        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ color: "rgba(69, 248, 130, 1)" }} // Corrected casing for color
        >
          Forgot Password
        </h1>

        <form
          className="relative z-10 bg-opacity-90 p-8 rounded-lg"
          style={{ backgroundColor: "rgba(26, 29, 38, 0.8)" }}
        >
          <div className="flex flex-col gap-3">
            {/* Username input with icon */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type="text"
                placeholder="User name"
                className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                style={{
                  backgroundColor: "rgba(14, 27, 34, 1)",
                  color: "white",
                  border: "none",
                }}
              />
            </div>

            {/* Password input with icon */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Password"
                className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                style={{
                  backgroundColor: "rgba(14, 27, 34, 1)",
                  color: "white",
                  border: "none",
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)} // Toggle the visibility state
                style={{ background: "none", border: "none" }}
              >
                {showPassword ? (
                  <FaEyeSlash color="white" />
                ) : (
                  <FaEye color="white" />
                )}{" "}
                {/* Toggle icon */}
              </button>
            </div>

            {/* Forgot Password link positioned below the password input */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-lg text-[rgba(69, 248, 130, 1)] px-2 py-1 rounded"
                style={{ color: "rgba(69, 248, 130, 1)" }} // Add background color
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </form>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="relative p-3 bg-green-600 text-[rgba(11, 14, 19, 1)] font-semibold focus:outline-none"
            style={{
              clipPath:
                "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
