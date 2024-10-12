import React from 'react';

type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'outline'
	| 'noOutline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	isLoading?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	isLoading = false,
	size = 'md',
	className = '',
	disabled,
	...props
}) => {
	const baseClasses =
		'rounded-md text-sm h-10 font-medium focus:outline-none transition duration-300 ease-in-out';

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg',
	};

	const variantClasses = {
		primary:
			'bg-[#4B5320] text-white hover:bg-[#3A4119] focus:ring-2 focus:ring-[#4B5320] focus:ring-opacity-50',
		secondary:
			'bg-[#E6E8DE] text-[#4B5320] hover:bg-[#D1D6C3] focus:ring-2 focus:ring-[#4B5320] focus:ring-opacity-50',
		danger:
			'bg-[#8B0000] text-white hover:bg-[#A52A2A] focus:ring-2 focus:ring-[#8B0000] focus:ring-opacity-50',
		outline:
			'bg-transparent text-[#4B5320] border border-[#4B5320] hover:bg-[#E6E8DE] focus:ring-2 focus:ring-[#4B5320] focus:ring-opacity-50',
		noOutline:
			'bg-transparent text-[#4B5320] hover:bg-[#E6E8DE] focus:ring-2 focus:ring-[#4B5320] focus:ring-opacity-50',
	};

	const disabledClasses = 'opacity-50 cursor-not-allowed';

	return (
		<button
			className={` ${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled || isLoading ? disabledClasses : ''} ${className} `}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<span className="flex items-center justify-center">
					<svg
						className="-ml-1 mr-3 h-5 w-5 animate-spin"
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
