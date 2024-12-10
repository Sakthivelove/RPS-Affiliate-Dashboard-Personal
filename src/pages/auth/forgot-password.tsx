import React, { useState } from "react";
import logo from "/RockMainLogo.png";
import { FaTelegram } from "react-icons/fa"; // Importing Telegram icon
import Button from "../../components/common/AdminButton";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from "../../api/api";

const ForgotPassword = () => {
  const [telegramId, setTelegramId] = useState(""); // State for Telegram ID
  const [error, setError] = useState(""); // State to capture error messages
  const [success, setSuccess] = useState(""); // State to capture success messages
  const navigate = useNavigate();

  // Use React Query's useMutation for handling form submission
  const mutation = useMutation({
    mutationFn: (telegramId: string) => api.post('/auth/forgotpassword', { telegramId }), // API request using axios instance
    onMutate: () => {
      setError(""); // Clear previous errors before starting
      setSuccess(""); // Clear previous success messages
    },
    onSuccess: (data) => {
      setSuccess("Password reset instructions have been sent to your Telegram.");
      setTelegramId(""); // Clear the input after success
      setTimeout(() => setSuccess(""), 5000); // Clear success message after 5 seconds
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after a delay
      }, 3000);
    },

    onError: (err) => {
      setError("Failed to send password reset instructions. Please try again later.");
      // Automatically clear the error after 5 seconds
      setTimeout(() => setError(""), 5000);
    },

  });

  // Handle form submission to reset password
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Basic validation
    if (!telegramId) {
      setError("Telegram ID is required.");
      return;
    }

    mutation.mutate(telegramId); // Call the mutation function
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-full flex flex-col justify-center items-center">
        {/* Logo Image */}
        <img
          src={logo}
          alt="Rock Main Logo"
          className="mx-auto mb-4 h-24 w-auto" // Adjust the height as needed
        />

        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ color: "rgba(69, 248, 130, 1)" }}
        >
          Forgot Password
        </h1>

        {/* Display success message */}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Display error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Loading indicator */}
        {mutation.isPending && !success && !error && (
          <div className="mb-4">
            <div className="text-green-700">Sending password reset instructions...</div>
          </div>
        )}


        {/* Form to reset password */}
        <form
          onSubmit={handleSubmit} // Form submit handler
          className="relative z-10 p-[0.07rem] rounded-lg w-[50%]"
          style={{
            background: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)", // Gradient for border
          }}
        >
          <div
            className="p-8 rounded-lg bg-opacity-90"
            style={{ backgroundColor: "rgba(26, 29, 38, 1)" }} // Background color of the form
          >
            <div className="flex flex-col gap-3">
              {/* Telegram ID input with icon */}
              <div className="relative">
                <FaTelegram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  type="text"
                  placeholder="Enter your Telegram ID"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)} // Update state with user input
                  className="p-2 pl-10 pr-3 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-center mt-6">
                <Button
                  image="green"
                  text={mutation.isPending ? "Sending..." : "Send Reset Link"}
                  onClick={handleSubmit}
                  isDisabled={mutation.isPending} // Disable button while loading
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
