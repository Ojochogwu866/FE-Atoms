import { CircleOff } from 'lucide-react';
import React from 'react';
import LoadingSpinner from '../../components/ui/Loader';

export const LoadingProducts: React.FC = () => (
	<div className="flex h-64 items-center justify-center">
		<LoadingSpinner />
	</div>
);

export const ErrorProducts: React.FC<{ error: string }> = ({ error }) => (
	<div className="flex h-64 items-center justify-center">
		<p className="text-lg text-red-500">
			<CircleOff className="text-red-700" /> {error}
		</p>
	</div>
);

export const NoProducts: React.FC = () => (
	<div className="flex h-64 items-center justify-center">
		<p className="text-lg">No products available.</p>
	</div>
);
