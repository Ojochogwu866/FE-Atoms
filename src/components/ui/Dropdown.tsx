import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface DropdownOption {
	value: string;
	label: string;
}

interface DropdownProps {
	options: DropdownOption[];
	onSelect: (option: DropdownOption) => void;
	placeholder?: string;
	className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	onSelect,
	placeholder = 'Select an option',
	className = '',
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
		null
	);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSelect = (option: DropdownOption) => {
		setSelectedOption(option);
		onSelect(option);
		setIsOpen(false);
	};

	return (
		<div
			ref={dropdownRef}
			className={`relative inline-block text-left ${className}`}
		>
			<div>
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
				>
					{selectedOption ? selectedOption.label : placeholder}
					<ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
				</button>
			</div>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					<div
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
					>
						{options.map((option) => (
							<button
								key={option.value}
								onClick={() => handleSelect(option)}
								className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
								role="menuitem"
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
