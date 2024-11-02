import { X } from 'lucide-react';
import React from 'react';

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	width?: string;
}

const Drawer: React.FC<DrawerProps> = ({
	isOpen,
	onClose,
	children,
	width = '50%',
}) => {
	if (!isOpen) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
				onClick={onClose}
			/>
			<div
				className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
				style={{ width }}
			>
				<button
					onClick={onClose}
					className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
				>
					<X className="h-6 w-6" />
				</button>
				<div className="h-full overflow-y-auto p-6">{children}</div>
			</div>
		</>
	);
};

export default Drawer;
