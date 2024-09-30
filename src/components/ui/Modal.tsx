import React, { useEffect, useRef } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
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
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-40 transition-opacity duration-300">
			<div
				ref={modalRef}
				className="mx-4 w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-out"
				style={{
					animation: 'modalAppear 0.3s ease-out',
				}}
			>
				<div className="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
					<h3 className="text-lg font-semibold text-gray-900">
						{title || 'Modal'}
					</h3>
					<button
						onClick={onClose}
						className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-600"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
