import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import Pagination from '@mui/material/Pagination';

interface TableProps {
  columns: string[]; // Column names
  data: any[] | undefined; // Table rows (dynamic data)
  rowColor?: string; // Color for rows (default: #0F1C23)
  tableBgColor?: string; // Table background color (default: #1A1D26)
  title?: string; // Optional title for the table
  headerTextColor?: string; // Optional customizable header text color
  showSearchBar?: boolean; // Whether to show the search bar
  onSearch?: (searchTerm: string) => void; // Search functionality handler
  customCellTextColor?: (row: any, col: string) => string; // Optional custom text color for cells
  alternateColumnTextColors?: (column: string) => string[]; // Optional logic for alternate column text colors
  height?: string; // Optional height for the table
  width?: string; // Optional width for the table
  searchPlaceholder?: string; // Optional prop to customize the search bar placeholder
  scrollX?: string;
  scrollY?: string;
  className?: string;
  page?: number; // Current page
  limit?: number; // Items per page
  onPageChange?: (newPage: number) => void; // Callback to handle page change
  totalItems?: number; // Total number of items for pagination
  totalPages?: number, // Accept totalPages as a prop
  loadingMessage?: string; // Custom message for loading state
  errorMessage?: string; // Custom message for error state
  isLoading?: boolean; // Loading state from parent
  error?: boolean; // Error state from parent
  customTextPosition?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowColor = 'bg-[#0F1C23]',
  tableBgColor = 'bg-[#1A1D26]',
  title,
  headerTextColor = 'text-white',
  showSearchBar = false,
  onSearch,
  customCellTextColor,
  alternateColumnTextColors,
  height = 'auto',
  searchPlaceholder = 'Search...',
  scrollX = 'auto',
  scrollY = 'auto',
  className,
  page = 1,
  limit = 10,
  onPageChange,
  totalItems = 0,
  width = '', // Default width
  totalPages = 1,
  loadingMessage = 'Loading data...',
  errorMessage = 'Error loading data, please try again.',
  isLoading = false,
  error = false,
  customTextPosition
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>(data || []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = data?.filter(row =>
        columns.some(col =>
          String(row[col])?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered || []);
    } else {
      setFilteredData(data || []);
    }
  }, [searchTerm, data, columns]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  const handlePageChange = (newPage: number) => {
    if (onPageChange) onPageChange(newPage);
  };

  const generatePageNumbers = (): number[] => {
    const maxPageLinks = 5;
    const startPage = Math.max(1, page - Math.floor(maxPageLinks / 2));
    const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
  };

  return (
    <div className={`${tableBgColor} h-full rounded-lg flex p-2 flex-col text-sm`} 
    >
      <div>
        {title && (
          <h1 className={`text-2xl font-semibold text-[#45F882] sticky top-0 z-10 bg-[#1A1D26] p-2 ${columns.length === 2 || 3 ? 'text-center' : ""}`}>
            {title}
          </h1>
        )}

        {showSearchBar && (
          <div className='flex justify-center'>
            <div className={`sticky top-16 z-10 bg-[#1A1D26] p-2 ${(columns.length <= 4) ? "w-1/2" : "w-full"}`}>
              <SearchBar placeholder={searchPlaceholder} onSearch={handleSearch} />
            </div>
          </div>
        )}
      </div>

      <div className={`overflow-x-${scrollX} overflow-y-${scrollY} flex-grow scrollbar-thin ${className} ${(columns.length <= 4) ? "flex justify-center items-start" : ""}`} style={{ height }}>
        {isLoading && <div className="text-center text-white flex justify-center items-center h-full">{loadingMessage}</div>}
        {error && <div className="text-center text-red-500 flex justify-center items-center h-full">{errorMessage}</div>}
        {(!isLoading && !error && filteredData.length === 0) && (
          <div className="text-center text-white font-semibold flex justify-center items-center h-full">
            No data available
          </div>
        )}

        {(!isLoading && !error && filteredData.length !== 0) && (
          <table className={`${columns.length === 2 ? "w-1/2" : columns.length === 3 ? "w-1/2" : "w-full"} table-auto ${tableBgColor} table-layout-auto`}
          style={{ width }} // Apply dynamic width
          >
            <thead className="sticky top-0 bg-[#1A1D26]">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`px-4 py-2 text-sm ${idx === 0 ? 'text-center' : idx === columns.length - 1 || columns.length <= 4 ? 'text-center' : `${customTextPosition ? customTextPosition :'text-left'}`} ${headerTextColor} break-words whitespace-normal`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((row, rowIndex) => (
                <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? `${rowColor}` : 'bg-transparent'}`}>
                  {columns.map((col, colIndex) => {
                    const alternateTextColors = alternateColumnTextColors ? alternateColumnTextColors(col) : [];
                    const textColor = alternateTextColors.length > 0
                      ? alternateTextColors[rowIndex % 2]
                      : customCellTextColor
                        ? customCellTextColor(row, col)
                        : 'white';

                    return (
                      <td
                        key={colIndex}
                        className={`px-4 py-2 text-sm ${colIndex === 0 ? 'text-center' : colIndex === columns.length - 1 || columns.length <= 4 ? 'text-center' : `${customTextPosition ? customTextPosition :'text-left'}`} break-words whitespace-normal`}
                        style={{ color: textColor }}
                      >
                        {row[col]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <div className="text-sm flex justify-center items-center p-4">
        {page > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1 || isLoading}
              className={`px-2 py-1 mx-1 ${isLoading ? 'bg-gray-400' : 'bg-[#1A1D26]'} text-white border border-[#45F882] rounded`}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isLoading}
              className={`px-2 py-1 mx-1 ${isLoading ? 'bg-gray-400' : 'bg-[#1A1D26]'} text-white border border-[#45F882] rounded`}
            >
              Previous
            </button>
          </>
        )}
        {totalPages > 1 && generatePageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => !isLoading && handlePageChange(pageNum)}
            className={`px-2 py-1 mx-1 ${page === pageNum ? 'bg-[#45F882] text-white' : 'bg-[#1A1D26] text-white'} border border-[#45F882] rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {pageNum}
          </button>
        ))}
        {page < totalPages && (
          <>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || isLoading}
              className={`px-2 py-1 mx-1 ${isLoading ? 'bg-gray-400' : 'bg-[#1A1D26]'} text-white border border-[#45F882] rounded`}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages || 1)}
              disabled={page === totalPages || isLoading}
              className={`px-2 py-1 mx-1 ${isLoading ? 'bg-gray-400' : 'bg-[#1A1D26]'} text-white border border-[#45F882] rounded`}
            >
              Last
            </button>
          </>
        )}
      </div> */}

            {/* MUI Pagination */}
            <div className="flex justify-center items-center p-4">
        {totalPages > 1 && (
          <Pagination
            count={totalPages} // Total number of pages
            page={page} // Current page
            onChange={(_, newPage) => handlePageChange(newPage)} // Handle page changes
            size="medium" // Adjust size (small, medium, large)
            shape="rounded" // Ensures rounded shape
            disabled={isLoading} // Disable during loading state
            sx={{
              '& .MuiPaginationItem-root': {
                backgroundColor: '#1A1D26 !important',
                color: '#FFF !important', // Ensure the styles are applied
                borderColor: '#1A1D26',
                borderRadius: '16px',
              },
              '& .Mui-selected': {
                backgroundColor: '#45F882 !important', // Bright green for selection
                color: '#FFF !important', // White text
                borderRadius: '16px',
                borderColor: '#45F882',
              },
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: 'rgba(69, 248, 130, 0.2) !important',
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
