import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	isLoading = false,
	className = '',
	disabled,
	...props
}) => {
	const baseClasses =
		'px-4 py-2 rounded-[2px] font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';
	const variantClasses = {
		primary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
		secondary:
			'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
		danger: 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-600',
		outline:
			'bg-transparent text-gray-700 border border-gray-400 hover:bg-gray-100 focus:ring-gray-400',
	};

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<span className="flex items-center justify-center">
					<svg
						className="-ml-1 mr-3 h-5 w-5 animate-spin text-current"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Loading...
				</span>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
