import React from "react";

// GreenButton and YellowButton images
import greenButtonImg from "/greenbutton.png";
import yellowButtonImg from "/yellowbutton.png";

// Defining types for the props

export interface ButtonProps {
  image: "green" | "yellow"; // Restrict to green or yellow image
  text: string; // The text to display inside the button
  onClick: (e: React.FormEvent) => void;  // Accepting FormEvent here
  textColor?: string; // Text color (default is #0B0E13)
  fontSize?: string; // Font size for the text
  fontWeight?: string; // Font weight for the text
  textAlign?: "left" | "center" | "right"; // Text alignment
  width?: string; // Tailwind width class (e.g., 'w-36', 'w-full')
  height?: string; // Tailwind height class (e.g., 'h-12', 'h-auto')
  isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  image,
  text,
  textColor = "text-[#0B0E13]",
  fontSize = "text-base", // Default to Tailwind's base text size
  fontWeight = "font-thin", // Default to thin font weight
  textAlign = "text-center", // Default to center-aligned text
  width = "w-36", // Default Tailwind width
  height = "h-12", // Default Tailwind height
  onClick,
  isDisabled = false
}) => {
  const backgroundImage = image === "green" ? greenButtonImg : yellowButtonImg;

  return (
    <button
      onClick={(e) => onClick(e)}  // Pass event to the onClick handler
      className={`flex justify-center items-center border-none cursor-pointer bg-cover bg-center ${width} ${height} ${fontSize} ${fontWeight} ${textAlign} ${textColor}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      disabled={isDisabled}  // Handle disabled state
    >
      {text}
    </button>
  );
};

export default Button;
