import { api } from "../../api/api";
import { Tournament } from '../../types/tournament';

export const fetchRegisteredUpcomingTournaments = async (
  page: number,
  limit: number
): Promise<Tournament[]> => {
  const response = await api.get(`/users/registeredupcomingtournament`, {
    params: { page, limit },
  });
  return response.data.userTournaments;
};

export interface UserTournamentDetails {
  id: string;
  walletId: string;
  tournamentId: string;
  type: string | null;
  entryPaid: boolean;
  nominalPaid: boolean;
  transactionId: string;
  entryFee: number;
  nominalTournament: boolean;
  nominalFee: number;
  defaultMove: string;
  registeredAt: number; // Unix timestamp
  lastStage: number;
  status: string;
  dateTime: number; // Unix timestamp
  tournamentName: string;
  winner: string;
}

export interface UserTournamentDetailsResponse {
  usertournament: UserTournamentDetails[];
  total: number;
}

export const fetchUserTournamentDetails = async (id: string): Promise<UserTournamentDetailsResponse> => {
  const response = await api.get(`/users/usertournament/${id}`);
  return response.data;  // Assuming the response contains { usertournament: [...], total: ... }
};

  

