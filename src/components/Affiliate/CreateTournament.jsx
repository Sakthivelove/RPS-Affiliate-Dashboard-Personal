import React from "react";

const CreateTournament = () => {
  return (
    <div className="w-full h-auto p-6 md:p-8 gap-4 bg-[rgba(11,13,19,1)] flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-center py-3">
        <h1 className="text-lg md:text-2xl font-semibold text-[rgba(69,248,130,1)]">
          Create New Rock Tournament
        </h1>
      </div>

      {/* Image Upload Container */}
      <div className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1523px] h-auto bg-[rgba(26,29,38,1)] flex items-center justify-center gap-4 opacity-100 p-4 md:p-6 rounded-lg">
        <img
          src="../../../public/uploadimageicon.png"
          alt="Upload Icon"
          className="w-10 h-10"
        />
        <div className="text-white text-lg">100 x 100</div>
        <div className="text-[rgba(69,248,130,1)] text-lg">Below 1 MB</div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1522px] h-auto bg-[rgba(26,29,38,1)] p-6 md:p-10 pt-0 rounded-t-lg opacity-100 flex justify-center">
        <form className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[1463px] flex flex-col gap-6 md:gap-8">
          {/* Example Form Fields */}
          <div className="flex flex-col">
            <label
              className="text-green-500 mb-2 text-lg"
              htmlFor="tournamentName"
            >
              Tournament Name
            </label>
            <input
              className="p-2 bg-[rgba(14,27,34,1)] border border-gray-300 rounded-md text-lg placeholder-gray-400"
              type="text"
              id="tournamentName"
              placeholder="Enter Tournament Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-green-500 mb-2 text-lg" htmlFor="date">
              Date
            </label>
            <input
              className="p-2 bg-[rgba(14,27,34,1)] border border-gray-300 rounded-md text-lg placeholder-gray-400"
              type="date"
              id="date"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-green-500 mb-2 text-lg" htmlFor="location">
              Location
            </label>
            <input
              className="p-2 bg-[rgba(14,27,34,1)] border border-gray-300 rounded-md text-lg placeholder-gray-400"
              type="text"
              id="location"
              placeholder="Enter Location"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              type="button"
              className="relative p-3 bg-green-600 text-[rgba(11,14,19,1)] font-semibold focus:outline-none"
              style={{
                clipPath:
                  "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="relative p-3 bg-green-600 text-[rgba(11,14,19,1)] font-semibold focus:outline-none"
              style={{
                clipPath:
                  "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTournament;
