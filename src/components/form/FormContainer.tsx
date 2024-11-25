import React from "react";
import DynamicFormFields, { Field } from "./FormFields";
import Button from "../AffiliateButton";

interface ButtonProps {
    image: "green" | "yellow"; // Restrict to green or yellow image
    text: string; // The text to display inside the button
    onClick: () => void; // The click handler function
    textColor?: string; // Text color (default is #0B0E13)
    fontSize?: string; // Font size for the text
    fontWeight?: string; // Font weight for the text
    textAlign?: "left" | "center" | "right"; // Text alignment
    width?: string; // Tailwind width class (e.g., 'w-36', 'w-full')
    height?: string; // Tailwind height class (e.g., 'h-12', 'h-auto')
}


interface ContainerProps {
    fields?: Field[]; // Optional fields prop
    buttons?: ButtonProps[]; // Array of button objects, each with image, text, and onClick
    title?: string; // Title for the container
    logo?: React.ReactNode | string; // Logo component or element
    containerWidth?: string; // Custom width for the container (optional)
    containerHeight?: string; // For dynamic height
}



const Container: React.FC<ContainerProps> = ({
    fields,
    buttons = [],
    title,
    logo,
    containerWidth = 'max-w-xl',
    containerHeight = 'max-h-[80vh]' // Default height (you can set this to any value you prefer)
}) => {
    return (
        <div className="flex justify-center items-center w-full">
            {/* Outer wrapper for gradient border with customizable width and dynamic height */}
            <div className={`w-full p-[2px] rounded-3xl bg-gradient-to-r from-[#45F882] to-[#FFBE18] ${containerWidth}`}>
                {/* Inner container for form with space around content */}
                <div
                    className={`bg-[#1A1D26] p-8 rounded-3xl ${containerHeight} overflow-auto no-scrollbar`}
                >
                    {/* Logo and Title (conditionally rendered) */}
                    <div className="flex items-center justify-center space-x-3">
                        {logo && (
                            typeof logo === 'string' ? (
                                // If logo is a string (URL), render it as an image
                                <img src={logo} alt="Logo" className="flex-shrink-0" />
                            ) : (
                                // If logo is a React component or node, render it directly
                                <div className="flex-shrink-0">{logo}</div>
                            )
                        )}
                        {title && <h2 className="text-[#45F882] font-[Rajdhani] text-3xl mb-6">{title}</h2>}
                    </div>

                    <div className="px-8"> {/* More horizontal padding here */}
                        {/* Dynamic form fields */}
                        <DynamicFormFields fields={fields} />
                    </div>

                    {/* Render buttons dynamically */}
                    <div className="flex justify-center gap-4 mt-6">
                        {buttons.length === 0 ? null : (
                            buttons.length === 1 ? (
                                // Single button - center aligned
                                <Button
                                    image={buttons[0].image}
                                    text={buttons[0].text}
                                    onClick={buttons[0].onClick}
                                    width={buttons[0].width}
                                    height={buttons[0].height}
                                />
                            ) : (
                                // Two buttons - side by side
                                <>
                                    <Button
                                        image={buttons[0].image}
                                        text={buttons[0].text}
                                        onClick={buttons[0].onClick}
                                        width={buttons[0].width}
                                        height={buttons[0].height}
                                    />
                                    <Button
                                        image={buttons[1].image}
                                        text={buttons[1].text}
                                        onClick={buttons[1].onClick}
                                        width={buttons[0].width}
                                        height={buttons[0].height}
                                    />
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Container;
