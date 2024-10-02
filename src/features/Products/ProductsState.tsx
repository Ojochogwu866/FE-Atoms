import React from 'react';

export const LoadingProducts: React.FC = () => (
	<div className="flex h-64 items-center justify-center">
		<p className="text-lg">Loading products...</p>
	</div>
);

export const ErrorProducts: React.FC<{ error: string }> = ({ error }) => (
	<div className="flex h-64 items-center justify-center">
		<p className="text-lg text-red-500">Error: {error}</p>
	</div>
);

export const NoProducts: React.FC = () => (
	<div className="flex h-64 items-center justify-center">
		<p className="text-lg">No products available.</p>
	</div>
);
