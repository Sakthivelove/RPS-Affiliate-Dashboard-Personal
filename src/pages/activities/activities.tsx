import React, { useEffect, useState } from 'react';
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

interface ApiResponse {
    activities: Activity[];
    totalCount: number
}

// Fetch activities function
const fetchActivities = async (page: number, limit: number): Promise<ApiResponse> => {
    const response = await api.get('/activities', {
        params: {
            page,
            limit,
        },
    });
    return response.data;
};

const Activities: React.FC = () => {
    const { sidebarActive } = useSidebar();
    const [page, setPage] = useState<number>(1)
    const limit = 10
    const [totalPages, setTotalPages] = useState<number>(0)

    const { data: activities, error, isLoading, isError } = useQuery<ApiResponse>({
        queryKey: ['activities', page, limit],
        queryFn: () => fetchActivities(page, limit),
    });


    // Update total pages when totalCount changes
    useEffect(() => {
        if (activities?.totalCount) {
            setTotalPages(Math.ceil(activities.totalCount / limit));
        }
    }, [activities?.totalCount, limit]);

    const columns = [
        'S.No',
        'Telegram ID',
        'Action',
        //  'IP Address', 
        'Status',
        //  'Device Info', 
        'Reason',
        'Created At'];

    const data = activities?.activities.map((activity, index) => ({
        'S.No': index + 1,
        'Telegram ID': activity.telegramId,
        Action: activity.action,
        // 'IP Address': activity.ip,
        Status: activity.status,
        // 'Device Info': activity.device,
        Reason: activity.reason || 'N/A',
        'Created At': new Date(activity.createdAt).toLocaleString(),
    }));

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (totalPages || 0)) {
            setPage(newPage);
        }
    };

    return (
        <div
            className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'
                } h-screen`}
        >

            <div className="m-[2%]">
                {/* <h1 className="text-4xl font-bold text-[#45F882] sticky top-0 mb-6">
                       
                    </h1>
                    <div className="mb-6 sticky top-16">
                        <SearchBar placeholder="Search activities..." onSearch={handleSearch} />
                    </div> */}
                <div className="relative z-10 overflow-auto">
                    <Table
                        columns={columns}
                        data={data}
                        title='Activity Log'
                        showSearchBar={true}
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
                        height='63vh'
                        page={page}
                        limit={limit}
                        onPageChange={handlePageChange}
                        totalPages={totalPages}
                        // totalItems={data?.totalCount || 0}
                        isLoading={isLoading}
                        error={isError}
                        errorMessage={error?.message}
                        loadingMessage="Fetching activity logs. Please wait..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Activities;