import { Bell, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

const Header = ({ title, userInfo, cartItemCount, notificationCount }) => {
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

	return (
		<header className="bg-white shadow-md">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
				<div className="flex items-center space-x-4">
					<button className="relative p-2">
						<ShoppingCart className="h-6 w-6 text-gray-500" />
						{cartItemCount > 0 && (
							<span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
								{cartItemCount}
							</span>
						)}
					</button>
					<button className="relative p-2">
						<Bell className="h-6 w-6 text-gray-500" />
						{notificationCount > 0 && (
							<span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
								{notificationCount}
							</span>
						)}
					</button>
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
				</div>
			</div>
		</header>
	);
};

export default Header;
