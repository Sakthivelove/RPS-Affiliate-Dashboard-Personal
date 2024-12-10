import React, { useState } from 'react';
import useTournaments from '../hooks/useTournaments';
import Table from '../components/common/Table';
import { useSidebar } from '../context/SidebarContext';
import { getContainerClass, truncateAddress } from '../utils';
import StatusMessage from '../components/StatusMessage';

const TournamentTable: React.FC = () => {
    const { data, error, isLoading } = useTournaments();
    const [searchQuery, setSearchQuery] = useState('');
    const { sidebarActive } = useSidebar();

    // If loading or error occurs, render the StatusMessage
    if (isLoading || error) {
        return (
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading tournament data..."
                errorMessage={error?.message || 'Unable to fetch tournament data.'}
                className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} flex justify-center items-center h-full`}
            />
        );
    }

    // Define columns with all fields from the Tournament interface
    const columns = [
        'Tournament ID',
        'Banner Image',
        'Tournament Name',
        'Primary Tournament ID',
        'Date & Time',
        'Type',
        'Entry Fee',
        'Nominal Tournament',
        'Nominal Fee',
        'Prize Pool',
        'Winner',
        'Current Stage',
        'Status',
        'Payment Window',
        'No. of Players',
        'Payment Start',
        'Payment End',
    ];

    // Map data to include all fields in the table
    const tableData = data?.map((tournament) => ({
        'Tournament ID': tournament.tournamentId,
        'Banner Image': tournament.bannerImage,
        'Tournament Name': tournament.tournamentName,
        'Primary Tournament ID': tournament.primaryTournamentId,
        'Date & Time': tournament.dateTime,
        'Type': tournament.type,
        'Entry Fee': tournament.entryFee,
        'Nominal Tournament': tournament.nominalTournament ? 'Yes' : 'No',
        'Nominal Fee': tournament.nominalFee,
        'Prize Pool': tournament.totalPrizePool ?? 'N/A',
        'Winner': truncateAddress(tournament.winner, 6),
        'Current Stage': tournament.currentStage,
        'Status': tournament.status,
        'Payment Window': tournament.paymentWindow ? 'Open' : 'Closed',
        'No. of Players': tournament.noOfPlayersRegistered,
        'Payment Start': new Date(tournament.paymentWindowStart).toLocaleString(),
        'Payment End': new Date(tournament.paymentWindowEnd).toLocaleString(),
    }));

    // Filter tournaments based on search query
    const filteredData = tableData?.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Handle search functionality
    const handleSearch = (searchTerm: string) => {
        setSearchQuery(searchTerm); // Update search query state
    };

    return (
        <div className={`${getContainerClass(sidebarActive)}`}>
            <div className="m-4 overflow-auto h-[95vh]">
                <Table
                    columns={columns}
                    data={filteredData}
                    title="Tournament List"
                    rowColor="bg-[#0F1C23]"
                    tableBgColor="bg-[#1A1D26]"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                    onSearch={handleSearch}
                />
            </div>
        </div>
    );
};

export default TournamentTable;
