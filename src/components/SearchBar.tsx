// components/SearchBar.tsx

import React, { useState, ChangeEvent } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa'; // Importing search and filter icons

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term); // Pass the search term to the parent component
    }
  };

  return (
    <div className="flex items-center bg-[#1A1D26] border border-[#969EB2] rounded-lg p-2">
      {/* Search icon on the left */}
      <FaSearch className="text-[#969EB2] text-lg mr-2 ml-2" />
      
      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder || 'Search...'}
        className="bg-transparent text-white placeholder-[#969EB2] focus:outline-none w-full"
      />
      
      {/* Filter icon on the right */}
      <FaFilter className="text-[#969EB2] text-lg ml-2" />
    </div>
  );
};

export default SearchBar;
