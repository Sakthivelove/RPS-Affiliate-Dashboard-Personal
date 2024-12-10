import { api } from "../api/api";

// Define the shape of tournament data
export interface TournamentData {
    tournamentName: string;
    dateTime: number;
    type: string;
    entryFee: number;
    nominalTournament: boolean;
    nominalFee: number;
    bannerImage: string;
}


// Function to create a new tournament
export const createTournament = async (tournamentData: TournamentData) => {
    try {
        const response = await api.post("/tournament", tournamentData);
        return response.data; // Returns the response data from the server
    } catch (error) {
        console.error("Error creating tournament:", error);
        throw error; // Propagate the error to be handled elsewhere
    }
};
