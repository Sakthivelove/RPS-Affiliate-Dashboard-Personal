import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/common/Table';
import { api } from '../../api/api';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';

// Define the Activity interface
interface Activity {
    id: number;
    telegramId: string;
    action: string;
    ip: string;
    status: string;
    device: string;
    reason: string | null;
    createdAt: string;
    updatedAt: string;
}

// Fetch activities function
const fetchActivities = async (): Promise<Activity[]> => {
    const response = await api.get('/activities', {
        params: {
            page: 1,
            limit: 10,
        },
    });
    return response.data.activities;
};

const Activities: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { sidebarActive } = useSidebar();

    const { data: activities, error, isLoading } = useQuery<Activity[]>({
        queryKey: ['activities'],
        queryFn: fetchActivities,
    });

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm.toLowerCase());
    };

    const columns = ['S.No', 'Telegram ID', 'Action', 'IP Address', 'Status', 'Device Info', 'Reason', 'Created At'];

    const filteredData =
        activities?.filter((activity) =>
            Object.values(activity).some((value) =>
                value?.toString().toLowerCase().includes(searchTerm)
            )
        ) || [];

    const data = filteredData.map((activity, index) => ({
        'S.No': index + 1,
        'Telegram ID': activity.telegramId,
        Action: activity.action,
        'IP Address': activity.ip,
        Status: activity.status,
        'Device Info': activity.device,
        Reason: activity.reason || 'N/A',
        'Created At': new Date(activity.createdAt).toLocaleString(),
    }));

    return (
        <div
            className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'
                } h-screen`}
        >

            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Fetching activity logs. Please wait..."
                errorMessage="Unable to retrieve activity logs. Please try again later."
                className="h-screen"
            />

            {!isLoading && !error && (
                <div className="m-[2%]">
                    <h1 className="text-4xl font-bold text-[#45F882] sticky top-0 mb-6">
                        Dashboard - Activity Log
                    </h1>
                    <div className="mb-6 sticky top-16">
                        <SearchBar placeholder="Search activities..." onSearch={handleSearch} />
                    </div>
                    <div className="relative z-10 overflow-auto h-[75vh]">
                        <Table
                            columns={columns}
                            data={data}
                            rowColor="bg-[#0F1C23]"
                            tableBgColor="bg-[#1A1D26]"
                            headerTextColor="text-[#45F882]"
                            customCellTextColor={(row, col) =>
                                col === 'Status'
                                    ? row['Status'] === 'Failed'
                                        ? '#FF5722'
                                        : '#4CAF50'
                                    : 'white'
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Activities;