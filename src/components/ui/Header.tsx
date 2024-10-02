import { Bell, Search, ShoppingCart, User } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { RootState } from '../../store/store';
import Modal from './Modal';

interface HeaderProps {
	title?: string;
	userInfo?: { name: string } | null;
	cartItemCount?: number;
	notificationCount?: number;
	isAuthenticatedUser?: boolean;
	openLoginModal?: () => void;
	openRegisterModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({
	title,
	userInfo,
	notificationCount,
	isAuthenticatedUser,
	openLoginModal,
	openRegisterModal,
}) => {
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);

	const cartItems = useSelector((state: RootState) => state.cart.items);
	const cartItemCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	return (
		<header className="bg-white shadow-sm">
			<div className="w-full border-b border-gray-200 py-2">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
					<div>
						<a
							href="#"
							className="text-sm font-medium text-gray-700 hover:text-gray-900"
						>
							Download Infradash App
						</a>
					</div>
					<div className="flex items-center space-x-4">
						{!isAuthenticatedUser ? (
							<>
								<button
									onClick={openLoginModal}
									className="text-sm font-medium text-gray-700 hover:text-gray-900"
								>
									Sign In
								</button>
								<button
									onClick={openRegisterModal}
									className="text-sm font-medium text-gray-700 hover:text-gray-900"
								>
									Sign Up
								</button>
							</>
						) : (
							<div className="relative">
								<button
									onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
									className="flex items-center space-x-2"
								>
									<User className="h-6 w-6 text-gray-500" />
									<span className="text-gray-700">{userInfo.name}</span>
								</button>
								{isProfileMenuOpen && (
									<div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Your Profile
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Settings
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign out
										</a>
									</div>
								)}
							</div>
						)}
						{/* Other options can be added here */}
					</div>
				</div>
			</div>

			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center space-x-4">
					{/* <img
						src="/path-to-infradash-icon.png"
						alt="Infradash"
						className="h-8 w-8"
					/> */}
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
				</div>
				<div className="mx-4 flex-grow">
					<div className="relative">
						<input
							type="text"
							placeholder="Search by filter, all categories..."
							className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 outline-none"
						/>
						<Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-700" />
					</div>
				</div>
				<div className="flex items-center space-x-4">
					<button className="relative p-2">
						<Bell className="h-6 w-6 text-gray-700" />
						{notificationCount > 0 && (
							<span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
								{notificationCount}
							</span>
						)}
					</button>
					<button className="relative p-2">
						<ShoppingCart className="h-6 w-6 text-gray-700" />
						{cartItemCount > 0 && (
							<span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
								{cartItemCount}
							</span>
						)}
					</button>
				</div>
			</div>

			<Modal
				title="Sign in"
				isOpen={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
			>
				<Login onClose={() => setIsLoginOpen(false)} />
			</Modal>
			<Modal
				title="Sign up"
				isOpen={isRegisterOpen}
				onClose={() => setIsRegisterOpen(false)}
			>
				<Register onClose={() => setIsRegisterOpen(false)} />
			</Modal>
		</header>
	);
};

export default Header;
