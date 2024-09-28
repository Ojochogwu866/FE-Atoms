import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

interface Column<T> {
	key: keyof T;
	header: string;
	render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataGridProps<T> {
	data: T[];
	columns: Column<T>[];
	className?: string;
}

function DataGrid<T extends { id: string | number }>({
	data,
	columns,
	className = '',
}: DataGridProps<T>) {
	const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

	const handleSort = (column: keyof T) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	const sortedData = [...data].sort((a, b) => {
		if (!sortColumn) return 0;
		if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
		if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	return (
		<div className={`overflow-x-auto ${className}`}>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{columns.map((column) => (
							<th
								key={column.key as string}
								scope="col"
								className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								onClick={() => handleSort(column.key)}
							>
								<div className="flex items-center">
									{column.header}
									{sortColumn === column.key &&
										(sortDirection === 'asc' ? (
											<ChevronUp size={14} />
										) : (
											<ChevronDown size={14} />
										))}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{sortedData.map((item) => (
						<tr key={item.id}>
							{columns.map((column) => (
								<td
									key={column.key as string}
									className="whitespace-nowrap px-6 py-4"
								>
									{column.render
										? column.render(item[column.key], item)
										: (item[column.key] as React.ReactNode)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default DataGrid;
