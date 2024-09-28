import React from 'react';

interface AvatarProps {
	src?: string;
	alt: string;
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
	src,
	alt,
	size = 'medium',
	className = '',
}) => {
	const sizeClasses = {
		small: 'w-8 h-8',
		medium: 'w-12 h-12',
		large: 'w-16 h-16',
	};

	const initials = alt
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	return (
		<div
			className={`${sizeClasses[size]} ${className} flex items-center justify-center overflow-hidden rounded-full bg-gray-200`}
		>
			{src ? (
				<img src={src} alt={alt} className="h-full w-full object-cover" />
			) : (
				<span className="font-medium text-gray-600">{initials}</span>
			)}
		</div>
	);
};

export default Avatar;
