import { Star } from 'lucide-react';
import React, { useState } from 'react';

interface RatingProps {
	initialRating?: number;
	totalStars?: number;
	onRatingChange?: (rating: number) => void;
	readOnly?: boolean;
}

const Rating: React.FC<RatingProps> = ({
	initialRating = 0,
	totalStars = 5,
	onRatingChange,
	readOnly = false,
}) => {
	const [rating, setRating] = useState(initialRating);
	const [hover, setHover] = useState(0);

	const handleRatingChange = (newRating: number) => {
		if (!readOnly) {
			setRating(newRating);
			if (onRatingChange) {
				onRatingChange(newRating);
			}
		}
	};

	return (
		<div className="flex">
			{[...Array(totalStars)].map((_, index) => {
				const starValue = index + 1;
				return (
					<button
						type="button"
						key={index}
						className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} ${
							starValue <= (hover || rating)
								? 'text-yellow-400'
								: 'text-gray-300'
						} transition-colors duration-200 ease-in-out focus:outline-none`}
						onClick={() => handleRatingChange(starValue)}
						onMouseEnter={() => !readOnly && setHover(starValue)}
						onMouseLeave={() => !readOnly && setHover(0)}
					>
						<Star
							size={24}
							fill={starValue <= (hover || rating) ? 'currentColor' : 'none'}
						/>
					</button>
				);
			})}
		</div>
	);
};

export default Rating;
