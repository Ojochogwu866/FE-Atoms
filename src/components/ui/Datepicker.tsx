import { Calendar } from 'lucide-react';
import React, { useState } from 'react';

interface DatePickerProps {
	onDateChange: (date: Date) => void;
	initialDate?: Date;
	className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
	onDateChange,
	initialDate = new Date(),
	className = '',
}) => {
	const [date, setDate] = useState<Date>(initialDate);
	const [isOpen, setIsOpen] = useState(false);

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(e.target.value);
		setDate(newDate);
		onDateChange(newDate);
	};

	const toggleCalendar = () => setIsOpen(!isOpen);

	return (
		<div className={`relative ${className}`}>
			<div className="flex items-center">
				<input
					type="date"
					value={date.toISOString().split('T')[0]}
					onChange={handleDateChange}
					className="rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={toggleCalendar}
					className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
				>
					<Calendar size={20} />
				</button>
			</div>
			{isOpen && (
				<div className="absolute z-10 mt-1 rounded-md border bg-white shadow-lg">
					<input
						type="date"
						value={date.toISOString().split('T')[0]}
						onChange={handleDateChange}
						className="border-none p-2 focus:outline-none"
					/>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
