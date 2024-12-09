import React from 'react';

interface StatusMessageProps {
    isLoading?: boolean;
    error?: { message: string } | null;
    loadingMessage?: string;
    errorMessage?: string;
    className?: string; // Allow custom classes
}

const StatusMessage: React.FC<StatusMessageProps> = ({
    isLoading = false,
    error = null,
    loadingMessage = 'Loading...',
    errorMessage = 'Something went wrong.',
    className = '', // Default to empty string
}) => {
    if (isLoading) {
        return (
            <div
                className={`p-8 text-white flex justify-center items-center ${className}`}
                aria-busy="true"
            >
                <div className="flex items-center">
                    <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-4 border-[#45F882] rounded-full mr-4"></div>
                    <span className="text-xl">{loadingMessage}</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className={`p-8 text-white flex justify-center items-center ${className}`}
                role="alert"
            >
                <div className="bg-red-500 p-6 rounded-md shadow-lg">
                    <h2 className="text-xl font-bold text-white">
                        {errorMessage || 'An error occurred!'}
                    </h2>
                    {error.message && (
                        <p className="mt-2 text-white">
                            Details: {error.message}
                        </p>
                    )}
                </div>
            </div>
        );
    }


    return null; // Render nothing if no loading or error
};

export default StatusMessage;
