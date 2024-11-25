
import logo from "/RockMainLogo.png"; // Adjust the path as necessary
import Button from "../components/AffiliateButton"; // Import the Button component

const AffiliateSignUp = () => {
  const handleButtonClick = () => {
    // Your click handler logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-[60%] bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
        {/* Logo Image */}
        <img
          src={logo}
          alt="Rock Main Logo"
          className="mx-auto mb-4 h-24 w-auto"
        />

        <h1 className="text-4xl font-bold text-center text-white mb-8" style={{ color: "rgba(69, 248, 130, 1)" }}>
          Affiliate SignUp
        </h1>

        {/* Form with Gradient Border */}
        <form className="relative z-10 p-8 bg-[#1A1D26CC] rounded-lg max-w-lg mx-auto border-4 border-transparent">
          {/* Gradient border */}
          {/* <div className="absolute inset-0 rounded-lg border-4 border-transparent bg-gradient-to-r from-[#45F882] to-[#FFBE18] z-[-1]"></div> */}

          <div className="relative flex flex-col gap-3 pb-[10rem] z-10">
            <input
              type="text"
              placeholder="*Username"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 bg-[#0E1B22] text-white border-none"
            />
            <input
              type="text"
              placeholder="*Telegram ID"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 bg-[#0E1B22] text-white border-none"
            />
            <input
              type="text"
              placeholder="First Name"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 bg-[#0E1B22] text-white border-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 bg-[#0E1B22] text-white border-none"
            />
            <input
              type="text"
              placeholder="*Timezone"
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 bg-[#0E1B22] text-white border-none"
            />
          </div>
        </form>

        <div className="flex justify-center mt-6">
          <Button
            image="green" // Choose the green button
            text="Sign Up"
            onClick={handleButtonClick}
            textColor="text-black" // Custom text color
            fontSize="text-lg" // Custom font size
            fontWeight="font-semibold" // Custom font weight
            width="w-36" // Custom width
            height="h-12" // Custom height
          />
        </div>
      </div>
    </div>
  );
};

export default AffiliateSignUp;
