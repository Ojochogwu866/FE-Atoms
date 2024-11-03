import { Bell, ShoppingCart, User } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import {
	logout,
	selectIsAuthenticated,
	selectUser,
} from '../../store/authSlice';
import {
	removeItemFromCart,
	updateCartItemQuantity,
} from '../../store/cartSlice';
import { AppDispatch, RootState } from '../../store/store';
import Drawer from './Drawer';
import Modal from './Modal';
import SearchBar from './Searchbar';
import Button from './button';

interface HeaderProps {
	title?: string;
	notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ title, notificationCount }) => {
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const cartItemCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	const handleLogout = () => {
		dispatch(logout());
		setIsProfileMenuOpen(false);
	};

	const renderCartDrawer = () => (
		<Drawer
			isOpen={isCartOpen}
			onClose={() => setIsCartOpen(false)}
			width="50%"
		>
			<div className="space-y-6">
				<h2 className="text-2xl font-bold">Shopping Cart</h2>
				{cartItems.length === 0 ? (
					<p className="text-gray-500">
						You currently have no products in your cart, please add products to
						continue
					</p>
				) : (
					<>
						<div className="space-y-4">
							{cartItems.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-4 border-b pb-4"
								>
									<img
										src={item.image}
										alt={item.title}
										className="h-20 w-20 rounded-lg object-cover"
									/>
									<div className="flex-1">
										<h3 className="font-semibold">{item.title}</h3>
										<p className="text-gray-600">${item.price}</p>
										<div className="mt-2 flex items-center gap-2">
											<button
												onClick={() =>
													dispatch(
														updateCartItemQuantity({
															productId: item.id,
															quantity: Math.max(0, item.quantity - 1),
														})
													)
												}
												className="rounded-md bg-gray-100 px-2 py-1"
											>
												-
											</button>
											<span>{item.quantity}</span>
											<button
												onClick={() =>
													dispatch(
														updateCartItemQuantity({
															productId: item.id,
															quantity: item.quantity + 1,
														})
													)
												}
												className="rounded-md bg-gray-100 px-2 py-1"
											>
												+
											</button>
										</div>
									</div>
									<button
										onClick={() => dispatch(removeItemFromCart(item.id))}
										className="text-red-500"
									>
										Remove
									</button>
								</div>
							))}
						</div>
						<div className="mt-6">
							<div className="flex justify-between text-lg font-semibold">
								<span>Total:</span>
								<span>
									$
									{cartItems
										.reduce(
											(total, item) =>
												total + Number(item.price) * item.quantity,
											0
										)
										.toFixed(2)}
								</span>
							</div>
							<Button className="mt-4 w-full">Proceed to Checkout</Button>
						</div>
					</>
				)}
			</div>
		</Drawer>
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
							Download Atom App
						</a>
					</div>
					<div className="flex items-center space-x-4">
						{!isAuthenticated ? (
							<>
								<button
									onClick={() => setIsLoginOpen(true)}
									className="text-sm font-medium text-gray-700 hover:text-gray-900"
								>
									Sign In
								</button>
								<button
									onClick={() => setIsRegisterOpen(true)}
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
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
										<span className="text-sm font-medium text-gray-600">
											{user?.email?.[0]?.toUpperCase() || 'U'}
										</span>
									</div>
								</button>
								{isProfileMenuOpen && (
									<div className="absolute right-0 z-40 mt-2 w-48 rounded-md border-[0.5px] border-[#4b532051] bg-white py-1 shadow-sm">
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
										<button
											onClick={handleLogout}
											className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign out
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center space-x-4">
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
				</div>
				<div className="mx-4 flex-grow">
					<div className="relative">
						<SearchBar onSearch={() => {}} />
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
					<button className="relative p-2" onClick={() => setIsCartOpen(true)}>
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
			{renderCartDrawer()}
		</header>
	);
};

export default Header;
