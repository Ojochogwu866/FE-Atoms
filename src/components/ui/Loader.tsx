import { LoaderPinwheel } from 'lucide-react';
import React from 'react';

interface LoadingSpinnerProps {
	size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
	const sizeClasses = {
		small: 'w-4 h-4',
		medium: 'w-8 h-8',
		large: 'w-12 h-12',
	};

	return (
		<div className="flex items-center justify-center">
			<LoaderPinwheel
				className={` ${sizeClasses[size]} animate-spin text-gray-500`}
			/>
		</div>
	);
};

export default LoadingSpinner;
