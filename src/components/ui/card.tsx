import React from 'react';

interface CardProps {
	title: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
}

const Card: React.FC<CardProps> = ({
	title,
	children,
	footer,
	className = '',
}) => {
	return (
		<div
			className={`overflow-hidden rounded-[2px] bg-white shadow-sm ${className}`}
		>
			<div className="px-6 py-4">
				<h3 className="mb-2 text-base font-semibold text-gray-800">{title}</h3>
				<div className="text-gray-600">{children}</div>
			</div>
			{footer && (
				<div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
					{footer}
				</div>
			)}
		</div>
	);
};

export default Card;
