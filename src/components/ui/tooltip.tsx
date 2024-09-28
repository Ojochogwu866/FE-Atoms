import React, { useEffect, useRef, useState } from 'react';

interface TooltipProps {
	content: string;
	children: React.ReactElement;
	position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({
	content,
	children,
	position = 'top',
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node) &&
				targetRef.current &&
				!targetRef.current.contains(event.target as Node)
			) {
				setIsVisible(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const positionClasses = {
		top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
	};

	return (
		<div className="relative inline-block">
			<div
				ref={targetRef}
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
			>
				{children}
			</div>
			{isVisible && (
				<div
					ref={tooltipRef}
					className={`absolute z-10 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm ${positionClasses[position]}`}
					role="tooltip"
				>
					{content}
					<div className="tooltip-arrow" data-popper-arrow></div>
				</div>
			)}
		</div>
	);
};

export default Tooltip;
