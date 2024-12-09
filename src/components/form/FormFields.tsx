import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface Field {
    type: "text" | "email" | "password" | "number" | "tel"; // Add more types as needed
    placeholder: string;
    label?: string; // Optional label for the input field
    labelColor?: string; // Optional label color (default: #45F882)
    labelSize?: string; // Optional label font size (e.g., "text-sm", "text-lg")
    inputBgColor?: string; // Input background color (default: #0E1B22)
    inputTextColor?: string; // Input text color (default: white)
    inputPlaceholderColor?: string; // Input placeholder color (default: gray-500)
    inputBorderColor?: string; // Input border color (default: #969EB280)
    inputFocusBorderColor?: string; // Input focus border color (default: green-500)
    inputPadding?: string; // Padding for input field (e.g., "p-3")
    iconColor?: string; // Icon color (default: gray-500)
    iconSize?: string; // Icon size (default: "w-5 h-5")
    name?: string;
}

interface DynamicFormFieldsProps {
    fields?: Field[]; // Array of form field data
}

const DynamicFormFields: React.FC<DynamicFormFieldsProps> = ({ fields = [] }) => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean[]>(fields.map(() => false)); // Track visibility for each password field

    const togglePasswordVisibility = (index: number) => {
        // Toggle the visibility of the password field at the specified index
        setPasswordVisibility(prevState => {
            const newVisibility = [...prevState];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    return (
        <div className="space-y-4 overflow-auto">
            {fields?.map((field, index) => (
                <div className="relative" key={index}>
                    {field.label && (
                        <label
                            htmlFor={field.placeholder}
                            className={`block ${field.labelSize || "text-sm"} font-medium font-rajdhani ${field.labelColor || "text-[#45F882]"}`}
                        >
                            {field.label}
                        </label>
                    )}
                    <div className="relative">
                        <input
                            type={field.type === "password" && passwordVisibility[index] ? "text" : field.type} // Dynamically set type based on visibility
                            placeholder={field.placeholder}
                            id={field.placeholder}
                            className={`w-full ${field.inputPadding || "p-3"} ${field.inputBgColor || "bg-[#0E1B22]"} ${field.inputTextColor || "text-white"
                                } ${field.inputPlaceholderColor || "placeholder-gray-500"} rounded-lg border-[1px] ${field.inputBorderColor || "border-[#969EB280]"} focus:outline-none focus:${field.inputFocusBorderColor || "border-green-500"}`}
                        />
                        {field.type === "password" && (
                            <div
                                className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-green-500`}
                                onClick={() => togglePasswordVisibility(index)}
                            >
                                {passwordVisibility[index] ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicFormFields;
