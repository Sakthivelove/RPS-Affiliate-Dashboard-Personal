// src/hooks/useUserTournaments.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

// Define the type for the UserTournament data
interface UserTournament {
    id: string;
    walletId: string;
    tournamentId: string;
    type: string;
    entryPaid: boolean;
    nominalPaid: boolean;
    transactionId: string;
    entryFee: number;
    nominalTournament: boolean;
    nominalFee: number;
    defaultMove: string;
    registeredAt: number;
    user: object; // You can define a more detailed User object type
    lastStage: number;
    status: string;
    dateTime: number;
    tournamentName: string;
    winner: string;
}

// Define the response format
interface UserTournamentsResponse {
    usertournament: UserTournament[];
    total: number;
}

// Custom hook for fetching user tournaments
const fetchUserTournaments = async (page: number, limit: number) => {
    try {
        // Attempt the API request
        const response = await api.get<UserTournamentsResponse>(`users/usertournaments`, {
            params: { page, limit },
        });

        // Return the data if the request is successful
        return response.data;
    } catch (error) {
        // Catch and handle errors
        console.error('Error fetching user tournaments:', error);

        // Optionally, throw the error again if you want the hook to handle it
        throw new Error('Failed to fetch user tournaments');
    }
};


// Use React Query's useQuery hook to fetch user tournaments
export const useUserTournaments = (page: number, limit: number) => {
    return useQuery<UserTournamentsResponse, Error>({
        queryKey: ['usertournaments', page, limit],
        queryFn: () => fetchUserTournaments(page, limit)
    });
};
