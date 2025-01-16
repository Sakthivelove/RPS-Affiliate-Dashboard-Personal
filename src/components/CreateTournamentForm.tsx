import React, { useEffect, useState } from "react";
import CreateTournamentInput from "./CreateTournamentInput";
import AdminButton from "./common/AdminButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUploadImage } from "../hooks/useUploadImage";
import ImagePreview from "./imageupload";

interface CreateTournamentFormProps {
  title: string;
  tournamentPlaceholder: string;
  buttonLabel: string;
  onSubmit: (data: TournamentData) => Promise<void>;
  onSuccess: () => void;
  isDisabled?: boolean;
  errorMessage?: string;
  tournamentType: string;
}

export interface TournamentData {
  tournamentName: string;
  dateTime: number;
  type: string;
  entryFee: number;
  nominalTournament: boolean;
  nominalFee: number;
  bannerImage: string;
}

const CreateTournamentForm: React.FC<CreateTournamentFormProps> = ({
  title,
  tournamentPlaceholder,
  buttonLabel,
  onSubmit,
  onSuccess,
  tournamentType
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [tournamentName, setTournamentName] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | string>(new Date()); // Ensure it's a Date object
  const [type, setType] = useState<string>(tournamentType);
  const [entryFee, setEntryFee] = useState<number>(5);
  const [nominalTournament, setNominalTournament] = useState<boolean>(true);
  const [nominalFee, setNominalFee] = useState<number>(5);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);  // State to manage the selected file

  const handleTournamentName = (value: string) => setTournamentName(value);

  const handleDateTime = (value: string) => {
    let selectedDate = new Date(value);
    const currentDate = new Date();

    // Check if selected date is invalid and adjust accordingly
    if (isNaN(selectedDate.getTime())) {
      selectedDate = new Date(currentDate.getTime() + 15 * 60 * 1000); // Default to current time + 15 minutes
    }

    // Check if the selected date is in the past
    if (selectedDate <= currentDate) {
      selectedDate = new Date(currentDate.getTime() + 15 * 60 * 1000); // Add 15 minutes
    }

    setDateTime(selectedDate);
  };

  const handleEntryFee = (value: string) => setEntryFee(Math.max(0, Number(value)));
  const handleNominalTournament = (value: string) => setNominalTournament(value === "true");
  const handleNominalFee = (value: string) => setNominalFee(Number(value));

  const { uploadImage, mutation } = useUploadImage(setBannerImage);  // Use the custom hook

  const handleReset = () => {
    setTournamentName("");
    setDateTime(new Date());
    setType(tournamentType);
    setEntryFee(0);
    setNominalTournament(true);
    setNominalFee(0);
    setBannerImage("");
  };

  const validateForm = () => {
    const errors: any = {};

    if (!tournamentName) {
      errors.tournamentName = "Tournament Name is required.";
    }

    if (!dateTime || new Date(dateTime).getTime() < new Date().getTime() + 15 * 60 * 1000) {
      errors.dateTime = "Tournament date must be at least 15 minutes in the future.";
    }

    if (entryFee <= 0) {
      errors.entryFee = "Entry Fee must be a positive value.";
    }

    if (nominalTournament && nominalFee <= 0) {
      errors.nominalFee = "Nominal Fee must be a positive value.";
    }

    // Check if banner image is selected
    if (!file) {
      errors.bannerImage = "Banner image is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // If no errors, return true
  };

  const handleFileChange = (validatedFile: File | null) => {
    setFile(validatedFile);  // Update the file state with the validated file
  };

  const handleRemoveImage = () => {
    setFile(null);  // Clear the selected file
  };

  // Handle the image upload API trigger
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('Banner', file);

    try {
      // Call the uploadImage function, which triggers mutation's onSuccess callback
      await uploadImage(formData);  // This will trigger the onSuccess callback from the mutation hook
      setImageUploaded(true);  // Flag that the image upload was successful
      console.log("Image uploaded successfully");
      return true; // Image uploaded successfully
    } catch (err) {
      toast.error('Error uploading image');
      setImageUploaded(false);  // Flag that image upload failed
      console.log("Image upload failed");
      return false; // Image upload failed
    }
  };

  // UseEffect to detect when image is uploaded and set
  useEffect(() => {
    const submitTournament = async () => {
      try {
        console.log("Preparing to submit tournament with bannerImage:", bannerImage);
        if (!bannerImage) {
          throw new Error("Banner image is required but is null.");
        }

        const tournamentData: TournamentData = {
          tournamentName,
          dateTime: Math.floor(new Date(dateTime).getTime() / 1000), // Convert to UNIX timestamp
          type,
          entryFee,
          nominalTournament,
          nominalFee,
          bannerImage, // Use the updated bannerImage
        };

        await onSubmit(tournamentData);
        console.log("Tournament created successfully.");
        onSuccess(); // Call success handler
      } catch (error: any) {
        console.error("Error while creating tournament:", error);
        toast.error(
          error.message || "An error occurred while creating the tournament."
        );
      }
    };

    // Trigger submission only if conditions are met
    if (imageUploaded && bannerImage) {
      submitTournament(); // Call async function
    } else if (imageUploaded && !bannerImage) {
      console.error("Image upload succeeded, but the banner image URL is not available.");
      toast.error("Image uploaded successfully, but the banner image URL is missing. Please try again.");
    }
  }, [imageUploaded, bannerImage]); // Dependency on imageUploaded and bannerImag

  const handleCreateTournament = async () => {
    console.log("Create Tournament button clicked");

    if (!validateForm()) return; // Only proceed if form is valid
    if (!file) {
      toast.error("Please select a file to upload.");
      return; // Ensure file is selected
    }
    console.log("All validations passed");

    setIsLoading(true);
    setError(null);

    try {
      await handleImageUpload(file); // Await image upload
    } catch (err: any) {
      console.error("Error occurred:", err);
      setError({
        message: err.message || "An error occurred while creating the tournament",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-4">
      <ToastContainer />
      <section>
        <h1 className="capitalize text-[#45F882] text-[2rem] md:text-[2.5rem] rajdhani-bold">
          {title}
        </h1>
      </section>
      <ImagePreview
        file={file}
        onRemove={handleRemoveImage}
        onFileChange={handleFileChange}
      />

      {formErrors.bannerImage && <p className="text-red-500">{formErrors.bannerImage}</p>}
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
      {isLoading && <div className="text-green-500 mt-2">Creating tournament...</div>}

      <section className="bg-[#1A1D26] w-full p-[3.125px] rounded-[1.5rem] mt-[2rem]">
        <div className="p-[1.125rem]">
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Tournament Name */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Tournament Name"
                isRequired={true}
                placeHolder={tournamentPlaceholder}
                type="text"
                value={tournamentName}
                callback={handleTournamentName}
              />
              {formErrors.tournamentName && <p className="text-red-500">{formErrors.tournamentName}</p>}
            </div>

            {/* Date and Time */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Tournament Date"
                isRequired={true}
                placeHolder="Select a date and time"
                type="datetime-local"
                value={dateTime ? new Date(dateTime).toLocaleString('sv-SE').slice(0, 16) : ""} // Local timezone format
                callback={handleDateTime}
              />

              {formErrors.dateTime && <p className="text-red-500">{formErrors.dateTime}</p>}
            </div>

            {/* Entry Fee */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Entry Fee"
                isRequired={true}
                placeHolder="Enter fee amount"
                type="number"
                value={entryFee.toString()}
                callback={(e) => handleEntryFee(e)}
              />
              {formErrors.entryFee && <p className="text-red-500">{formErrors.entryFee}</p>}
            </div>

            {/* Nominal Tournament */}
            <div className="mb-[2.75rem]">
              <CreateTournamentInput
                inputLabel="Nominal Tournament"
                isRequired={true}
                placeHolder="Select true/false"
                type="select"
                value={nominalTournament ? "true" : "false"}
                callback={handleNominalTournament}
                options={["true", "false"]}
              />
            </div>

            {/* Nominal Fee */}
            {nominalTournament && (
              <div className="mb-[2.75rem]">
                <CreateTournamentInput
                  inputLabel="Nominal Fee"
                  isRequired={true}
                  placeHolder="Enter nominal fee"
                  type="number"
                  value={nominalFee.toString()}
                  callback={(e) => handleNominalFee(e)}
                />
                {formErrors.nominalFee && <p className="text-red-500">{formErrors.nominalFee}</p>}
              </div>
            )}

            <div className="flex gap-[1rem] flex-col md:flex-row items-center justify-center">
              <AdminButton
                image={"yellow"}
                text={"Reset"}
                width="sm:w-32 lg:w-48"
                height="sm:h-12 lg:h-16"
                onClick={handleReset}
                fontWeight="font-[700]"
              />
              <AdminButton
                image={"green"}
                text={buttonLabel}
                width="sm:w-32 lg:w-48"
                height="sm:h-12 lg:h-16"
                onClick={handleCreateTournament}
                fontWeight="font-[700]"
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateTournamentForm;
