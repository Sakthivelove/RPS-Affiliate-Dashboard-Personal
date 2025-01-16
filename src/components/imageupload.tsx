import React, { useState, useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

interface ImagePreviewProps {
  file: File | null; // The file object passed from the parent component
  onRemove: () => void; // Function to remove the image
  onFileChange: (file: File) => void; // Callback to pass the validated file to the parent component
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove, onFileChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State for the preview URL
  const [validationError, setValidationError] = useState<string>(''); // State to handle validation errors

  useEffect(() => {
    // Generate preview URL when file changes
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Clean up the preview URL to prevent memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null); // Clear preview URL if file is removed
    }
  }, [file]);

  // Validate the image resolution and size
  const validateImage = (file: File): Promise<boolean> => {
    const image = new Image();
    return new Promise<boolean>((resolve, reject) => {
      image.onload = () => {
        if (image.width === 440 && image.height === 255 && file.size <= 1024 * 1024) {
          resolve(true); // Valid image
        } else {
          reject('Image must be 440x255 and less than 1MB');
        }
      };
      image.onerror = () => reject('Invalid image');
      image.src = URL.createObjectURL(file); // Trigger image loading
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      try {
        await validateImage(selectedFile); // Validate the selected file
        onFileChange(selectedFile); // Pass the validated file to the parent component
        setValidationError(''); // Clear validation error
      } catch (error) {
        setValidationError(error as string); // Set validation error message
      }
    }
  };

  return (
    <section className="mt-2">
      <div className="w-full h-60 lg:h-80 bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-xl p-1">
        <div className="bg-[#0B0D13] rounded-xl w-full h-full flex justify-center items-center">
          {file && previewUrl ? (
            <div className="relative w-full h-full flex justify-center items-center rounded-xl">
              <img
                src={previewUrl}
                alt={`Preview of ${file.name}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
              />
              <button
                onClick={onRemove}
                className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full hover:bg-red-700"
              >
                <IoIosCloseCircle className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-xl cursor-pointer bg-[#1A1D26]"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img
                  src="/create-tournament/file_upload.png"
                  alt="Upload Icon"
                  className="h-20 w-20 lg:h-40 lg:w-40"
                />
                <p className="text-center text-white text-base lg:text-lg">
                  440*255 <span className="text-[#45F882]">Below 1 MB</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange} // Handle file change with validation
              />
            </label>
          )}
        </div>
      </div>

      {/* Display validation error message */}
      {validationError && (
        <div className="text-red-500 text-center mt-2">
          {validationError}
        </div>
      )}
    </section>
  );
};

export default ImagePreview;
