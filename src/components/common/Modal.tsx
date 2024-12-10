import React from "react";
import Button from "./AdminButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm?: () => void; // Optional for cases without "Yes/No" buttons
  buttons?: { text: string; onClick: () => void; image: "green" | "yellow" }[]; // Custom buttons array
  className?: string;
  type: "success" | "error"; // Added type for success or error differentiation
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  onConfirm,
  buttons,
  className,
  type,
}) => {
  if (!isOpen) return null;

  // Define styles based on modal type (success or error)
  const modalStyles =
    type === "success"
      ? "bg-gradient-to-r from-[#45F882] to-[#28a745]"
      : "bg-gradient-to-r from-[#FF6B6B] to-[#FF4F4F]";
  const icon = type === "success" ? "✔️" : "❌"; // Success and error icons

  return (
    <div className={`fixed w-full inset-0 flex justify-center items-center z-50 ${className}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Modal container */}
      <div className={`relative z-60 p-[1px] ${modalStyles} rounded-lg max-w-[400px] w-full`}>
        {/* Inner content */}
        <div className="relative bg-[#1A1D26] p-8 rounded-lg z-70">
          {/* Title */}
          <div className="text-center text-2xl font-bold text-[#fff] font-rajdhani">
            {icon} {title}
          </div>

          {/* Content */}
          <div className="text-center mt-4 text-white">{content}</div>

          {/* Buttons */}
          <div className="flex justify-around mt-6">
            {buttons ? (
              buttons.map((button, index) => (
                <Button
                  key={index}
                  image={button.image}
                  text={button.text}
                  onClick={button.onClick}
                  textColor="#0B0E13"
                  fontSize="1rem"
                  fontWeight="bold"
                />
              ))
            ) : (
              <Button
                image={type === "success" ? "green" : "yellow"} // Use different button color based on modal type
                text={type === "success" ? "Great!" : "Retry"}
                onClick={onConfirm || onClose}
                textColor="#0B0E13"
                fontSize="1rem"
                fontWeight="bold"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
