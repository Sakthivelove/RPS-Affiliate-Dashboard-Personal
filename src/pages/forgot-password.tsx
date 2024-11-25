import { useState } from "react";
import logo from "/RockMainLogo.png"; // Adjust the path as necessary
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"; // Importing eye icons and lock icons
import Button from "../components/AffiliateButton"; // Import the Button component

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showRePassword, setShowRePassword] = useState(false); // State to toggle re-enter password visibility

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">

      {/* Logo */}
      <img
        src={logo}
        alt="Rock Main Logo"
        className="mx-auto mb-4 h-24 w-auto" // Adjust the height as needed
      />

      <h1
        className="text-4xl font-bold text-center text-white mb-8"
        style={{ color: "rgba(69, 248, 130, 1)" }}
      >
        Reset Password
      </h1>
      <div className="relative p-[0.1rem] rounded-lg bg-gradient-to-r from-green-400 to-yellow-500">
        {/* Gradient Border */}
        <div
          className="bg-opacity-90 rounded-lg shadow-lg p-8"
          style={{
            backgroundColor: "rgba(26, 29, 38)",
            // borderRadius: "25px",
          }}
        >

          <form className="relative z-10">
            <div className="flex flex-col gap-3">
              {/* Enter Password input with icon */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Enter Password"
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
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                  style={{ background: "none", border: "none" }}
                >
                  {showPassword ? (
                    <FaEyeSlash color="white" />
                  ) : (
                    <FaEye color="white" />
                  )}
                </button>
              </div>

              {/* Re-enter Password input with icon */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showRePassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Re-enter Password"
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
                  onClick={() => setShowRePassword(!showRePassword)} // Toggle visibility
                  style={{ background: "none", border: "none" }}
                >
                  {showRePassword ? (
                    <FaEyeSlash color="white" />
                  ) : (
                    <FaEye color="white" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <Button
                image="green" // Use the green button background
                text="Reset Password"
                textColor="text-black"
                fontSize="text-lg"
                fontWeight="font-semibold"
                width="w-40" // Adjust the button size
                height="h-12"
                onClick={() => console.log("Reset Password Clicked")} // Add functionality as needed
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
