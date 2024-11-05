import React, { useState } from "react";
import logo from "../../../public/RockMainLogo.png";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Step state to control which inputs to display
  const [telegramId, setTelegramId] = useState(""); // State for Telegram ID
  const [otp, setOtp] = useState(""); // State for OTP
  const [username, setUsername] = useState(""); // State for Username
  const [password, setPassword] = useState(""); // State for Password

  const handleTelegramIdSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to the next step to show the OTP input field
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);
    // Logic for submitting OTP can be added here
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with username:", username);
    // Logic for logging in with username and password can be added here
  };

  // Function to toggle login method
  const handleToggleLoginMethod = () => {
    setStep(step === 1 ? 3 : 1); // Toggle between step 1 (Username/Password) and step 3 (Telegram ID)
    setUsername(""); // Clear username
    setPassword(""); // Clear password
    setTelegramId(""); // Clear Telegram ID
    setOtp(""); // Clear OTP
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 overflow-hidden"
      style={{
        backgroundImage: "url('../../../public/background.png')",
      }}
    >
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundImage: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)",
            zIndex: -1,
            borderRadius: "25px",
            padding: "2px",
          }}
        />
        <img
          src={logo}
          alt="Rock Main Logo"
          className="mx-auto mb-4 h-24 w-auto"
        />
        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ color: "rgba(69, 248, 130, 1)" }}
        >
          Admin Login
        </h1>

        {/* Toggle between Username/Password and Telegram ID Login */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleToggleLoginMethod}
            className={`mx-2 px-4 py-2 rounded-lg text-white ${
              step === 1 ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            Login with Username/Password
          </button>
          <button
            onClick={handleToggleLoginMethod}
            className={`mx-2 px-4 py-2 rounded-lg text-white ${
              step === 3 ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            Login with Telegram ID
          </button>
        </div>

        {/* Step 1: Username and Password Input */}
        {step === 1 && (
          <form
            className="relative z-10 bg-opacity-90 p-8 rounded-lg"
            style={{ backgroundColor: "rgba(26, 29, 38, 0.8)" }}
            onSubmit={handleLoginSubmit}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <FaUser color="green" className="mr-2" />
                <input
                  type="text"
                  placeholder="User name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full" // Ensure full width
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
              <div className="relative flex items-center">
                <FaLock color="green" className="mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full" // Ensure full width
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: "none", border: "none" }}
                >
                  {showPassword ? (
                    <FaEyeSlash color="white" />
                  ) : (
                    <FaEye color="white" />
                  )}
                </button>
              </div>
            </div>
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
          </form>
        )}

        {/* Step 3: Telegram ID Input (Before OTP) */}
        {step === 3 && (
          <form
            className="relative z-10 bg-opacity-90 p-8 rounded-lg"
            style={{ backgroundColor: "rgba(26, 29, 38, 0.8)" }}
            onSubmit={handleTelegramIdSubmit}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <FaUser color="green" className="mr-2" />
                <input
                  type="text"
                  placeholder="Telegram ID"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full" // Ensure full width
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
            </div>
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
                Continue
              </button>
            </div>
          </form>
        )}

        {/* Step 2: OTP Input (Displayed after Telegram ID is submitted) */}
        {step === 2 && (
          <form
            className="relative z-10 bg-opacity-90 p-8 rounded-lg"
            style={{ backgroundColor: "rgba(26, 29, 38, 0.8)" }}
            onSubmit={handleOtpSubmit}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <FaUser color="green" className="mr-2" />
                <input
                  type="text"
                  placeholder="Telegram ID"
                  value={telegramId}
                  readOnly // Keep the Telegram ID read-only on this step
                  className="p-2 rounded-md bg-gray-600 text-white focus:outline-none w-full" // Ensure full width
                />
              </div>
              <div className="flex items-center">
                <FaLock color="green" className="mr-2" />
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full" // Ensure full width
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
            </div>
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
                Submit OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
