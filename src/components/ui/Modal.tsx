import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="w-full max-w-md rounded-lg bg-white shadow-xl"
			>
				<div className="flex items-center justify-between border-b px-6 py-4">
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-500"
					>
						<X size={24} />
					</button>
				</div>
				<div className="px-6 py-4">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
