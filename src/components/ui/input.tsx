import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	validate?: (value: string) => string | undefined;
}

const Input: React.FC<InputProps> = ({
	label,
	error,
	validate,
	className = '',
	...props
}) => {
	const [touched, setTouched] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(error);
	const [isFocused, setIsFocused] = useState(false);

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setTouched(true);
		setIsFocused(false);
		if (validate) {
			const validationError = validate(e.target.value);
			setErrorMessage(validationError);
		}
		if (props.onBlur) {
			props.onBlur(e);
		}
	};

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(true);
		if (props.onFocus) {
			props.onFocus(e);
		}
	};

	return (
		<div className="mb-4">
			<label
				className="block text-sm font-bold text-gray-700"
				htmlFor={props.id}
			>
				{label}
			</label>
			<div className="relative">
				<input
					className={`peer w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-3 leading-tight text-gray-700 focus:outline-none ${
						touched && errorMessage ? 'border-red-500' : ''
					} ${className}`}
					{...props}
					onBlur={handleBlur}
					onFocus={handleFocus}
				/>
				{/* <div
					className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gray-950 transition-all duration-300 ${
						isFocused ? 'w-full' : ''
					}`}
				></div> */}
			</div>
			{touched && errorMessage && (
				<p className="mt-1 text-xs italic text-red-500">{errorMessage}</p>
			)}
		</div>
	);
};

export default Input;
