
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/resultados?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    // Use flex-col on small screens and flex-row on medium and up
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-xl mx-auto my-4 gap-2 sm:gap-0">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por código CID ou nome..."
        // Adjust rounding for stacked vs inline layout
        className="flex-grow p-3 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        // Adjust rounding and width for stacked vs inline layout
        className="bg-blue-600 text-white p-3 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;

