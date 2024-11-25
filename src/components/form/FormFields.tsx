import React from "react";

// Type definition for each form field
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
}

// Dynamic icon components for form fields
// const getIconForFieldType = (type: string) => {
//     switch (type) {
//         case "text":
//             return (
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20" stroke="currentColor">
//                     <path d="M10 5l7 7-7 7" />
//                 </svg>
//             );
//         case "email":
//             return (
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20" stroke="currentColor">
//                     <path d="M2 5l8 5 8-5v10l-8 5-8-5V5z" />
//                 </svg>
//             );
//         case "password":
//             return (
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20" stroke="currentColor">
//                     <path d="M10 4a3 3 0 00-3 3v3h6V7a3 3 0 00-3-3zM5 7a5 5 0 0110 0v7h3v7H2v-7h3V7z" />
//                 </svg>
//             );
//         default:
//             return null;
//     }
// };

interface DynamicFormFieldsProps {
    fields?: Field[]; // Array of form field data
}

// Example dynamic fields data
const DefaultFields: Field[] = [
    { type: "text", placeholder: "Enter your name", label: "Name", labelColor: "text-[#45F882]" },
    { type: "email", placeholder: "Enter your email", label: "Email", labelSize: "text-lg" },
    { type: "password", placeholder: "Enter your password", label: "Password", inputBgColor: "bg-gray-800" },
];

const DynamicFormFields: React.FC<DynamicFormFieldsProps> = ({ fields = DefaultFields }) => {
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
                    <input
                        type={field.type}
                        placeholder={field.placeholder}
                        id={field.placeholder}
                        className={`w-full ${field.inputPadding || "p-3"} ${field.inputBgColor || "bg-[#0E1B22]"} ${field.inputTextColor || "text-white"
                            } ${field.inputPlaceholderColor || "placeholder-gray-500"} rounded-lg border-[1px] ${field.inputBorderColor || "border-[#969EB280]"
                            } focus:outline-none focus:${field.inputFocusBorderColor || "border-green-500"} mt-2`}
                    />
                    {/* <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center ${
                            field.iconColor || "text-gray-500"
                        }`}
                    >
                        <div className={`${field.iconSize || "w-5 h-5"}`}>{getIconForFieldType(field.type)}</div>
                    </div> */}
                </div>
            ))}
        </div>
    );
};

export default DynamicFormFields;
