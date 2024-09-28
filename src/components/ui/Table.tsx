import React from 'react';

interface TableColumn<T> {
	header: string;
	accessor: keyof T | ((data: T) => React.ReactNode);
}

interface TableProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	onRowClick?: (item: T) => void;
}

function Table<T extends object>({ data, columns, onRowClick }: TableProps<T>) {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{data.map((item, rowIndex) => (
						<tr
							key={rowIndex}
							onClick={() => onRowClick && onRowClick(item)}
							className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
						>
							{columns.map((column, colIndex) => (
								<td
									key={colIndex}
									className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
								>
									{typeof column.accessor === 'function'
										? column.accessor(item)
										: (item[column.accessor] as React.ReactNode)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
