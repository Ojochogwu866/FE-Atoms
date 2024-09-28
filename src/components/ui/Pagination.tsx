import React from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="mt-4 flex justify-center">
			<ul className="flex">
				{pageNumbers.map((number) => (
					<li key={number} className="mx-1">
						<button
							onClick={() => onPageChange(number)}
							className={`rounded-md px-3 py-1 ${
								currentPage === number
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
