import React, { useState } from 'react';
import useTournaments from '../hooks/useTournaments';
import Table from '../components/common/Table';
import { useSidebar } from '../context/SidebarContext';
import { getContainerClass, truncateAddress } from '../utils';
import StatusMessage from '../components/StatusMessage';

const TournamentTable: React.FC = () => {
    const { data, error, isLoading, isError } = useTournaments();
    const [searchQuery, setSearchQuery] = useState('');
    const { sidebarActive } = useSidebar();


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

    // Map data to include all fields in the table with fallbacks
    const tableData = data?.map((tournament, index) => ({
        'Tournament ID': tournament.tournamentId || 'N/A',
        'Banner Image': tournament.bannerImage || 'N/A',
        'Tournament Name': tournament.tournamentName || 'Unknown',
        'Primary Tournament ID': tournament.primaryTournamentId || 'N/A',
        // Assuming 'dateTime' is a string representing a Unix timestamp in seconds
        'Date & Time': tournament.dateTime && tournament.dateTime !== "0"
            ? new Date(Number(tournament.dateTime) * 1000).toLocaleString()
            : '-',
        'Type': tournament.type || 'N/A',
        'Entry Fee': tournament.entryFee || 'N/A',
        'Nominal Tournament': tournament.nominalTournament ? 'Yes' : 'No',
        'Nominal Fee': tournament.nominalFee || 'N/A',
        'Prize Pool': tournament.totalPrizePool ?? 'N/A',
        'Winner': tournament.winner ? truncateAddress(tournament.winner, 6) : 'N/A',
        'Current Stage': tournament.currentStage || 'N/A',
        'Status': tournament.status || 'N/A',
        'Payment Window': tournament.paymentWindow ? 'Open' : 'Closed',
        'No. of Players': tournament.noOfPlayersRegistered || '0',
        'Payment Start': tournament.paymentWindowStart ? new Date(tournament.paymentWindowStart).toLocaleString() : 'N/A',
        'Payment End': tournament.paymentWindowEnd ? new Date(tournament.paymentWindowEnd).toLocaleString() : 'N/A',
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
                    isLoading={isLoading}
                    error={isError}
                    loadingMessage="Loading tournament data..."
                    errorMessage={error?.message}
                />
            </div>
        </div>
    );
};

export default TournamentTable;
