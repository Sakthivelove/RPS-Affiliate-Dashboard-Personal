import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';

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
  searchPlaceholder?: string; // Optional prop to customize the search bar placeholder
  scrollX?: string;
  scrollY?: string;
  className?: string;
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
  className
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search term
  const [filteredData, setFilteredData] = useState<any[]>(data || []); // Filtered data for table rows

  useEffect(() => {
    if (searchTerm) {
      // Filter rows based on search term
      const filtered = data?.filter(row =>
        columns.some(col =>
          String(row[col])?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered || []);
    } else {
      // If no search term, show all data
      setFilteredData(data || []);
    }
  }, [searchTerm, data, columns]);

  // Handle search input changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term); // Pass the search term to the parent component if provided
    }
  };

  return (
    <div className={`${tableBgColor} h-full rounded-lg flex p-4 flex-col`}>
      {/* Title and SearchBar outside the scrollable content */}
      <div>
        {title && (
          <h1 className={`text-3xl font-semibold text-[#45F882] sticky top-0 z-10 bg-[#1A1D26] p-4 ${columns.length === 2 ? 'text-center' : ""}`}>
            {title}
          </h1>
        )}

        {showSearchBar && (
          <div className='flex justify-center'>
            <div className={`sticky top-16 z-10 bg-[#1A1D26] p-4 ${columns.length === 2 ? "w-1/2" : "w-full"}`}>
              <SearchBar placeholder={searchPlaceholder} onSearch={handleSearch} />
            </div>
          </div>
        )}
      </div>

      {/* Scrollable table content */}
      <div className={`overflow-x-${scrollX} overflow-y-${scrollY} flex-grow scrollbar-thin ${className} ${columns.length === 2 ? "flex justify-center items-start" : ""}`} style={{ height }}>
        <table className={`${columns.length === 2 ? "w-1/2" : "w-full"} table-auto ${tableBgColor} table-layout-auto`}>
          <thead className="sticky top-0 bg-[#1A1D26]">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-2 ${idx === 0
                    ? 'text-center'
                    : idx === columns.length - 1
                      ? 'text-center'
                      : 'text-left'
                    } ${headerTextColor} break-words whitespace-normal`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? `${rowColor}` : 'bg-transparent'}`}
              >
                {columns.map((col, colIndex) => {
                  const alternateTextColors = alternateColumnTextColors
                    ? alternateColumnTextColors(col)
                    : [];

                  const textColor =
                    alternateTextColors.length > 0
                      ? alternateTextColors[rowIndex % 2]
                      : customCellTextColor
                        ? customCellTextColor(row, col)
                        : 'white'; // Default color if no alternation or custom color is provided

                  return (
                    <td
                      key={colIndex}
                      className={`px-4 py-2 ${colIndex === 0
                        ? 'text-center'
                        : colIndex === columns.length - 1
                          ? 'text-center'
                          : 'text-left'
                        } break-words whitespace-normal`} // Added classes for wrapping
                      style={{
                        color: textColor, // Set the dynamic text color
                      }}
                    >
                      {row[col]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
