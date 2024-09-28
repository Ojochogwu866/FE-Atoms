import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
	type: NotificationType;
	message: string;
	duration?: number;
	onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
	type,
	message,
	duration = 5000,
	onClose,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	if (!isVisible) return null;

	const iconMap: Record<NotificationType, React.ReactNode> = {
		success: <CheckCircle className="h-5 w-5 text-green-400" />,
		error: <XCircle className="h-5 w-5 text-red-400" />,
		warning: <AlertCircle className="h-5 w-5 text-yellow-400" />,
		info: <Info className="h-5 w-5 text-blue-400" />,
	};

	const bgColorMap: Record<NotificationType, string> = {
		success: 'bg-green-50',
		error: 'bg-red-50',
		warning: 'bg-yellow-50',
		info: 'bg-blue-50',
	};

	return (
		<div
			className={`fixed right-4 top-4 w-96 ${bgColorMap[type]} border-l-4 border-${type === 'warning' ? 'yellow' : type}-400 rounded p-4 shadow-md`}
		>
			<div className="flex items-start">
				<div className="flex-shrink-0">{iconMap[type]}</div>
				<div className="ml-3 w-0 flex-1 pt-0.5">
					<p className="text-sm font-medium text-gray-900">{message}</p>
				</div>
				<div className="ml-4 flex flex-shrink-0">
					<button
						className="inline-flex rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={() => {
							setIsVisible(false);
							onClose();
						}}
					>
						<span className="sr-only">Close</span>
						<X className="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Notification;
