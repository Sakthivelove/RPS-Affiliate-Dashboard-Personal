import React, { useState } from "react";
import logo from "/RockMainLogo.png";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import Button from "../components/AffiliateButton"

const AffiliateLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // Step state to control which inputs to display
  const [telegramId, setTelegramId] = useState<string>(""); // State for Telegram ID
  const [otp, setOtp] = useState<string>(""); // State for OTP
  const [username, setUsername] = useState<string>(""); // State for Username
  const [password, setPassword] = useState<string>(""); // State for Password

  const handleTelegramIdSubmit = () => {
    // e.preventDefault();
    // if (!telegramId) {
    //   alert("Please enter your Telegram ID.");
    //   return;
    // }
    setStep(2); // Move to the next step to show the OTP input field
  };

  const handleOtpSubmit = () => {
    // e.preventDefault();
    console.log("Submitting OTP:", otp);
    // Logic for submitting OTP can be added here
  };

  const handleLoginSubmit = () => {
    // e.preventDefault();
    // if (!username || !password) {
    //   alert("Please enter both username and password.");
    //   return;
    // }
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
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden"
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
        <div className="flex justify-center gap-4 mb-4">
          <Button
            image="green"
            text="Login with Username/Password"
            onClick={handleToggleLoginMethod}
            textColor="text-black"
            fontSize="text-base"
            fontWeight="font-medium"
            width="w-full sm:w-52" // Full width on small screens, 600px on medium and above
            height="flex-grow h-12"
          />
          <Button
            image="yellow"
            text="Login with Telegram ID"
            onClick={handleToggleLoginMethod}
            textColor="text-black"
            fontSize="text-base"
            fontWeight="font-medium"
            width="w-full sm:w-52" // Full width on small screens, 600px on medium and above
            height="flex-grow h-12"
          />
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
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
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
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
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
              <Button
                image="green"
                text="Login"
                onClick={handleLoginSubmit}
                textColor="text-[rgba(11, 14, 19, 1)]"
                fontSize="text-base"
                fontWeight="font-semibold"
                width="w-36"
                height="h-12"
              />
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
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                image="green"
                text="Continue"
                onClick={handleTelegramIdSubmit}
                textColor="text-[rgba(11, 14, 19, 1)]"
                fontSize="text-base"
                fontWeight="font-semibold"
                width="w-36"
                height="h-12"
              />
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
                  className="p-2 rounded-md bg-gray-600 text-white focus:outline-none w-full"
                />
              </div>
              <div className="flex items-center">
                <FaLock color="green" className="mr-2" />
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                image="green"
                text="Verify OTP"
                onClick={handleOtpSubmit}
                textColor="text-[rgba(11, 14, 19, 1)]"
                fontSize="text-base"
                fontWeight="font-semibold"
                width="w-36"
                height="h-12"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AffiliateLogin;
