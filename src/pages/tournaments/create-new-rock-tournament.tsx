import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateTournament } from '../../hooks/useCreateTournament';
import CreateTournamentForm from '../../components/CreateTournamentForm';
import { TournamentData } from '../../services/tournamentService';
import { useSidebar } from '../../context/SidebarContext'
import Modal from "../../components/common/Modal"

const CreateRockTournament: React.FC = () => {
  const { mutateAsync, isPending, isError, error } = useCreateTournament();
  const { sidebarActive } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // New state for error modal
  const navigate = useNavigate();

  // Submit handler for the form
  const handleCreateRockTournament = async (data: TournamentData) => {
    try {
      await mutateAsync(data); // Await the mutation promise
      setIsModalOpen(true); // Open success modal
    } catch (err) {
      console.error("Error creating tournament:", err);
      setIsErrorModalOpen(true); // Open error modal on failure
    }
  };

  // Close modal and navigate
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/tournament-list"); // Navigate after the modal is closed
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  // Dynamic class for the container
  const containerClass = `absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen overflow-auto`;

  return (
    <div className={containerClass}>
      <CreateTournamentForm
        title="Create New Rock Tournament"
        tournamentPlaceholder="Enter Rock Tournament Name"
        buttonLabel={isPending ? "Creating tournament..." : "Create Rock Tournament"}
        onSubmit={handleCreateRockTournament}
        onSuccess={() => console.log("Tournament successfully created!")} // Optional success callback
        isDisabled={isPending} // Disable the form while submitting
        errorMessage={isError ? "Unable to create the tournament." : undefined} // Display error message if any
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Tournament Created"
          content="The Rock Tournament has been created successfully!"
          onClose={handleCloseModal} // Navigate only after modal close
          type="success"
        />
      )}
      {/* Error Modal */}
      {isErrorModalOpen && error && (
        <Modal
          isOpen={isErrorModalOpen}
          title="Error"
          content={`Failed to create the tournament: ${error.message}`}
          onClose={handleCloseErrorModal}
          type="error"
        />
      )}
    </div>
  );
};

export default CreateRockTournament;
