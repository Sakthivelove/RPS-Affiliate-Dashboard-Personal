import React from "react";
import logo from "../../../public/RockMainLogo.png"; // Adjust the path as necessary

const AffiliateSignUp = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 overflow-hidden" // Add overflow-hidden
      style={{
        backgroundImage: "url('../../../public/background.png')", // Updated path for the background image
      }}
    >
      <div className="bg-opacity-90 rounded-lg shadow-lg overflow-hidden relative w-[60%]">
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
          Affiliate SignUp
        </h1>

        <form
          className="relative z-10 bg-opacity-90 p-8 rounded-lg max"
          style={{ backgroundColor: "rgba(26, 29, 38, 0.8)" }}
        >
          <div className="flex flex-col gap-3 pb-[10rem]">
            <input
              type="text"
              placeholder="*Username"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              style={{
                backgroundColor: "rgba(14, 27, 34, 1)",
                color: "white",
                border: "none",
              }}
            />
            <input
              type="text"
              placeholder="*Telegram ID"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              style={{
                backgroundColor: "rgba(14, 27, 34, 1)",
                color: "white",
                border: "none",
              }}
            />
            <input
              type="text"
              placeholder="First Name"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              style={{
                backgroundColor: "rgba(14, 27, 34, 1)",
                color: "white",
                border: "none",
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              style={{
                backgroundColor: "rgba(14, 27, 34, 1)",
                color: "white",
                border: "none",
              }}
            />
            <input
              type="text"
              placeholder="*Timezone"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              style={{
                backgroundColor: "rgba(14, 27, 34, 1)",
                color: "white",
                border: "none",
              }}
            />
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
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSignUp;
