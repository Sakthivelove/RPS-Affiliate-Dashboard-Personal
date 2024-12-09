import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

interface Tournament {
  id: string;
  bannerImage: string;
  tournamentName: string;
  tournamentId: string;
  primaryTournamentId: string;
  dateTime: string;
  type: string;
  entryFee: number;
  nominalTournament: boolean;
  nominalFee: number;
  totalPrizePool: number | null;
  winner: string;
  currentStage: number;
  status: string;
  paymentWindow: boolean;
  noOfPlayersRegistered: number;
  paymentWindowStart: number;
  paymentWindowEnd: number;
}

const fetchTournaments = async () => {
  const response = await api.get('/tournament');
  return response.data;
};

const useTournaments = () => {
  return useQuery<Tournament[]>({
    queryKey: ['tournaments'],
    queryFn: fetchTournaments,
  });
};

export default useTournaments;
