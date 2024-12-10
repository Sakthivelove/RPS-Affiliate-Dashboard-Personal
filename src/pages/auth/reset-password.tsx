import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/AdminButton"; // Reusable Button component
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password fields
import logo from "/RockMainLogo.png";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api";

// Updated mutation function
const resetPassword = async (password: string) => {
  const response = await api.post("/auth/resetpassword", { password });
  return response.data;
};

const ResetPassword = () => {
  const [password, setPassword] = useState(""); // New password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [error, setError] = useState(""); // Error state for API errors
  const [success, setSuccess] = useState(""); // Success message after reset
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Use React Query Mutation to handle the API call
  const { mutateAsync,isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setSuccess("Your password has been successfully reset.");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (err: any) => {
      // Handle API errors directly in the onError callback
      const errorMessage = err.response?.data?.message || "Failed to reset the password. Please try again.";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
    },
  });
  

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);

  // Toggle confirm password visibility
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle form submission to reset the password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return;
    }
  
    setError(""); // Reset error state
    setSuccess(""); // Reset success message
  
    try {
      // Trigger password reset API call via React Query
      await mutateAsync(password);
    } catch (err: any) {
      // Extract error message from the caught error
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
        {/* Logo */}
        <img src={logo} alt="Rock Main Logo" className="mx-auto mb-4 h-24 w-auto" />

        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ color: "rgba(69, 248, 130, 1)" }}
        >
          Reset Password
        </h1>

        {/* Error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Success message */}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form
          onSubmit={handleSubmit}
          className="relative z-10 p-[0.07rem] rounded-lg w-[50%]"
          style={{ background: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)" }}
        >
          <div
            className="p-8 rounded-lg bg-opacity-90"
            style={{ backgroundColor: "rgba(26, 29, 38, 1)" }}
          >
            <div className="flex flex-col gap-3">
              {/* Password Input with eye icon */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password Input with eye icon */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <Button
                  image="green"
                  text={isPending ? "Resetting..." : "Reset Password"}
                  onClick={handleSubmit}
                  isDisabled={isPending}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
