import React from "react";

const AffiliateSignUp = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('../../../public/background.png')",
      }}
    >
      <div className="w-full max-w-4xl px-4 py-8 bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
        <h1
          className="text-4xl font-bold text-center text-white mb-8"
          style={{ backgroundColor: "rgba(69, 248, 130, 1)" }}
        >
          Affiliate SignUp
        </h1>
        <form
          className="bg-white p-8 border-2 rounded-lg mx-auto max-w-md"
          style={{
            borderImageSource: "linear-gradient(90deg, #45F882 0%, #FFBE18 100%)",
            borderImageSlice: 1,
          }}
        >
          <div className="flex flex-col gap-6">
            {["Username", "Telegram ID", "First Name", "Last Name", "Timezone"].map((label) => (
              <div key={label} className="flex flex-col">
                <label
                  className="text-sm font-semibold px-3 py-1"
                  style={{
                    backgroundColor: "rgba(14, 27, 34, 1)",
                    color: "rgba(150, 158, 178, 1)",
                  }}
                >
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
            ))}
            <button
              type="submit"
              className="mt-8 p-3 bg-gradient-to-r from-green-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-yellow-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AffiliateSignUp;
