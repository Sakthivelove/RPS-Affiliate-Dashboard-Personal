import React, { useState, ChangeEvent } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { tournamentHistoryData } from '../constants';

interface Tournament {
  id: number;
  name: string;
  prizePool: string;
  fee: string;
  winner?: string;
  gameHistory?: string;
}

interface TournamentPageProps {
  backgroundColor?: string; // Accept background color as a prop
}


const TournamentPage: React.FC<TournamentPageProps> = ({ backgroundColor="#0c1016" }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedTournaments, setExpandedTournaments] = useState<{ [key: number]: boolean }>({});

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleTournamentExpand = (id: number) => {
    setExpandedTournaments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = tournamentHistoryData.filter((tournament) =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTournament = (tournament: Tournament) => (
    <div key={tournament.id} className="p-4 mb-2 bg-[#1A1D26] rounded-lg font-poppins text-white border border-[#969EB2]">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleTournamentExpand(tournament.id)}
      >
        <h3 className="text-lg font-semibold font-rajdhani">{tournament.name}</h3>
        <span>{expandedTournaments[tournament.id] ? '-' : '+'}</span>
      </div>
      {expandedTournaments[tournament.id] && (
        <div className="mt-2">
          <p>Prize Pool: {tournament.prizePool}</p>
          <p>Tournament Fee: {tournament.fee}</p>
          {tournament.winner && <p>Winner: {tournament.winner}</p>}
          {tournament.gameHistory && <p>Game History: {tournament.gameHistory}</p>}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor }}>
      <div className="w-full max-w-6xl p-4 space-y-8">
        {/* Current Tournament Section with border */}
        <section className="border border-[#969EB2] rounded-lg p-4">
          <h2 className="text-2xl font-bold font-rajdhani mb-4 text-center text-[#45F882]">Current Tournament</h2>
          {tournamentHistoryData.slice(0, 2).map(renderTournament)}
        </section>

        {/* Upcoming Tournament Section with border */}
        <section className="border border-[#969EB2] rounded-lg p-4">
          <h2 className="text-2xl font-bold font-rajdhani mb-4 text-center text-[#45F882]">Upcoming Tournament</h2>
          {tournamentHistoryData.slice(2, 4).map(renderTournament)}
        </section>

        {/* Tournament History Section */}
        <section>
          <h2 className="text-2xl font-bold font-rajdhani mb-4 text-center text-[#45F882]">Tournament History</h2>

          {/* Container for search and table */}
          <div className="space-y-6">

            {/* Search Container */}
            <div className="relative p-2 bg-[#1A1D26] border border-[#969EB2] rounded-full w-full">
              <div className="flex items-center w-full">
                <FiSearch className="text-gray-400 ml-2" /> {/* Search icon */}
                <input
                  type="text"
                  placeholder="Search Tournament"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="flex-1 bg-transparent border-none outline-none text-white px-4 font-poppins"
                />
                <FiFilter className="text-gray-400 mr-2" /> {/* Filter icon */}
              </div>
            </div>

            {/* Tournament Table Section */}
            <div className="overflow-y-auto max-h-80 no-scrollbar w-full rounded-lg">
              <table className="w-full text-left border-collapse font-rajdhani rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-[#1a2a33] text-white">S.No</th>
                    <th className="px-4 py-2 bg-[#1a2a33] text-white">Tournament Name</th>
                    <th className="px-4 py-2 bg-[#1a2a33] text-white">Prize Pool</th>
                    <th className="px-4 py-2 bg-[#1a2a33] text-white">Tournament Fee</th>
                    <th className="px-4 py-2 bg-[#1a2a33] text-white">Winner</th>
                    <th className="px-4 py-2 bg-[#1a2a33] text-white">Game History</th>
                    <th className="px-4 py-2 bg-[#1a2a33] text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((tournament, index) => (
                    <tr key={tournament.id} className={index % 2 === 0 ? 'bg-[#1f2f38]' : 'bg-[#0c1016]'}>
                      <td className="px-4 py-2 text-white">{index + 1}</td>
                      <td className="px-4 py-2 text-white">{tournament.name}</td>
                      <td className="px-4 py-2 text-white">{tournament.prizePool}</td>
                      <td className="px-4 py-2 text-white">{tournament.fee}</td>
                      <td className="px-4 py-2 text-white">{tournament.winner}</td>
                      <td className="px-4 py-2 text-white">{tournament.gameHistory}</td>
                      <td className="px-4 py-2 space-x-2 text-white">
                        <button className="text-lg" title="View">👁️</button>
                        <button className="text-lg" title="Edit">✏️</button>
                        <button className="text-lg" title="Delete">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default TournamentPage;
