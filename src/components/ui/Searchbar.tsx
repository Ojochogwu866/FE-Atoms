import { Search } from 'lucide-react';
import React, { useState } from 'react';

interface SearchBarProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	placeholder = 'Search...',
	className = '',
}) => {
	const [query, setQuery] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form onSubmit={handleSubmit} className={`relative ${className}`}>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholder}
				className="w-full rounded-md border bg-white py-2 pl-10 pr-4 text-gray-700 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
			/>
			<button
				type="submit"
				className="absolute inset-y-0 left-0 flex items-center pl-3"
			>
				<Search className="h-5 w-5 text-gray-700" />
			</button>
		</form>
	);
};

export default SearchBar;
