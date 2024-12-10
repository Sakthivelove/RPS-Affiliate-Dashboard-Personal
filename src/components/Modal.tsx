import React from "react";
import Button from "./AffiliateButton";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    onConfirm?: () => void; // Optional for cases without "Yes/No" buttons
    buttons?: { text: string; onClick: () => void; image: "green" | "yellow" }[]; // Custom buttons array
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, onConfirm, buttons }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Modal container */}
            <div className="relative p-[1px] bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-lg max-w-[400px] w-full">
                {/* Inner content */}
                <div className="relative bg-[#1A1D26] p-8 rounded-lg">
                    {/* Title */}
                    <div className="text-center text-2xl font-bold text-[#45F882] font-rajdhani">
                        {title}
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
                                image="green"
                                text="Ok"
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
