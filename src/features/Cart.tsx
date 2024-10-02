import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { clearCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import { RootState } from '../store/store';

const Cart: React.FC = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cart.items);

	const handleRemoveItem = (id: number) => {
		dispatch(removeFromCart(id));
	};

	const handleUpdateQuantity = (id: number, quantity: number) => {
		dispatch(updateQuantity({ id, quantity }));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="container mx-auto mt-10">
			<div className="my-10 flex shadow-md">
				<div className="w-3/4 bg-white px-10 py-10">
					<div className="flex justify-between border-b pb-8">
						<h1 className="text-2xl font-semibold">Shopping Cart</h1>
						<h2 className="text-2xl font-semibold">{cartItems.length} Items</h2>
					</div>
					<div className="mb-5 mt-10 flex">
						<h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
							Product Details
						</h3>
						<h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
							Quantity
						</h3>
						<h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
							Price
						</h3>
						<h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
							Total
						</h3>
					</div>
					{cartItems.map((item) => (
						<div
							key={item.id}
							className="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100"
						>
							<div className="flex w-2/5">
								<div className="w-20">
									<img className="h-24" src={item.image} alt={item.title} />
								</div>
								<div className="ml-4 flex flex-grow flex-col justify-between">
									<span className="text-sm font-bold">{item.title}</span>
									<button
										onClick={() => handleRemoveItem(item.id)}
										className="text-xs font-semibold text-gray-500 hover:text-red-500"
									>
										Remove
									</button>
								</div>
							</div>
							<div className="flex w-1/5 justify-center">
								<Input
									type="text"
									label="qty"
									value={item.quantity}
									onChange={(e) =>
										handleUpdateQuantity(item.id, parseInt(e.target.value))
									}
								/>
							</div>
							<span className="w-1/5 text-center text-sm font-semibold">
								${item.price.toFixed(2)}
							</span>
							<span className="w-1/5 text-center text-sm font-semibold">
								${(item.price * item.quantity).toFixed(2)}
							</span>
						</div>
					))}
					<Button onClick={handleClearCart}>Clear Cart</Button>
				</div>
				<div id="summary" className="w-1/4 px-8 py-10">
					<h1 className="border-b pb-8 text-2xl font-semibold">
						Order Summary
					</h1>
					<div className="mb-5 mt-10 flex justify-between">
						<span className="text-sm font-semibold uppercase">Total</span>
						<span className="text-sm font-semibold">${total.toFixed(2)}</span>
					</div>
					<Button className="w-full bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600">
						Checkout
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
