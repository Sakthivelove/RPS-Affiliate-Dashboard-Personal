import { useMutation } from '@tanstack/react-query';
import { createTournament, TournamentData } from "../services/tournamentService"

// Custom hook for creating a tournament
export const useCreateTournament = () => {
    // Use the mutation hook to create the tournament
    const mutation = useMutation({
        mutationFn: (data: TournamentData) => createTournament(data),
        onSuccess: (data) => {
            console.log("Tournament created successfully:", data);
            // Optionally handle success (e.g., show a success message or redirect)
        },
        onError: (error) => {
            console.error("Error creating tournament:", error);
            // Optionally handle error (e.g., show an error message)
        },
    }
    );

    return mutation;
};
