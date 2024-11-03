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
	const [_, setIsFocused] = useState(false);

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
					className={`peer mt-1 h-10 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-3 leading-tight text-gray-700 focus:outline-none ${
						touched && errorMessage ? 'border-red-500' : ''
					} ${className}`}
					{...props}
					onBlur={handleBlur}
					onFocus={handleFocus}
				/>
			</div>
			{touched && errorMessage && (
				<p className="mt-1 text-xs italic text-red-500">{errorMessage}</p>
			)}
		</div>
	);
};

export default Input;
