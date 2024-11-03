import gsap from 'gsap';
import { Search, Tally4 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import Button from '../../components/ui/button';
import Drawer from '../../components/ui/Drawer';
import ProductCard from '../../features/Products/ProductCard';
import {
	ErrorProducts,
	LoadingProducts,
	NoProducts,
} from '../../features/Products/ProductsState';
import { useFetchProducts } from '../../hooks/useFetch';
import {
	addItemToCart,
	removeItemFromCart,
	updateCartItemQuantity,
} from '../../store/cartSlice';
import { RootState } from '../../store/store';
import { Product } from '../../types/products';

function AllProducts() {
	const { products, status, error } = useFetchProducts('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [displayCount, setDisplayCount] = useState(8);
	const containerRef = useRef<HTMLDivElement>(null);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const dispatch = useDispatch<AppDispatch>();

	const handleQuickView = (product: Product | null) => {
		setSelectedProduct(product);
	};

	const categories = ['all', ...new Set(products.map((p) => p.category))];

	useEffect(() => {
		if (status === 'succeeded' && containerRef.current) {
			gsap.set(containerRef.current.children, {
				opacity: 0,
				scale: 0.95,
			});

			gsap.to(containerRef.current.children, {
				duration: 0.6,
				opacity: 1,
				scale: 1,
				stagger: {
					each: 0.1,
					from: 'random',
				},
				ease: 'power2.out',
			});
		}
	}, [status, selectedCategory, searchTerm, displayCount]);

	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === 'all' || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const displayedProducts = filteredProducts.slice(0, displayCount);

	const handleSeeMore = () => {
		setDisplayCount((prevCount) => prevCount + 8);
	};

	const renderProductDrawer = () => (
		<Drawer
			isOpen={!!selectedProduct}
			onClose={() => setSelectedProduct(null)}
			width="40%"
		>
			{selectedProduct && (
				<div className="space-y-6">
					<img
						src={selectedProduct.images}
						alt={selectedProduct.name}
						className="w-full rounded-lg"
					/>
					<h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
					<p className="text-gray-600">{selectedProduct.description}</p>
					<div className="flex items-center justify-between">
						<span className="text-2xl font-bold">${selectedProduct.price}</span>
						<Button
							onClick={() =>
								dispatch(
									addItemToCart({
										id: selectedProduct._id,
										title: selectedProduct.name,
										price: selectedProduct.price,
										image: selectedProduct.images,
										quantity: 1,
									})
								)
							}
						>
							Add to Cart
						</Button>
					</div>
				</div>
			)}
		</Drawer>
	);

	const renderCartDrawer = () => (
		<Drawer
			isOpen={isCartOpen}
			onClose={() => setIsCartOpen(false)}
			width="50%"
		>
			<div className="space-y-6">
				<h2 className="text-2xl font-bold">Shopping Cart</h2>
				{cartItems.length === 0 ? (
					<p className="text-gray-500">Your cart is empty</p>
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

	const renderHeader = () => (
		<div className="sticky top-0 z-10 mt-6 rounded-md bg-white p-4 shadow-sm">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-2">
					<Tally4 size={24} strokeWidth={2} color="#4B5320" />
					<h1 className="text-2xl font-bold text-[#4B5320]">All Products</h1>
				</div>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search products..."
						className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-gray-500 focus:outline-none"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className="mt-4 flex flex-wrap gap-2">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => {
							setSelectedCategory(category);
							setDisplayCount(8);
						}}
						className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
							selectedCategory === category
								? 'bg-[#4B5320] text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				))}
			</div>
		</div>
	);

	const renderProducts = () => {
		switch (status) {
			case 'loading':
				return <LoadingProducts />;
			case 'failed':
				return <ErrorProducts error={error || 'Unknown error occurred'} />;
			case 'succeeded':
				if (filteredProducts.length === 0) {
					return <NoProducts />;
				}
				return (
					<>
						<div
							ref={containerRef}
							className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						>
							{displayedProducts.map((product) => (
								<div
									key={product._id}
									className="transform transition-transform hover:scale-105"
								>
									<ProductCard
										product={product}
										setSelectedProduct={handleQuickView}
									/>
								</div>
							))}
						</div>
						{renderProductDrawer()}
						{renderCartDrawer()}
						{displayCount < filteredProducts.length && (
							<div className="mt-10 flex justify-center">
								<Button onClick={handleSeeMore}>See More</Button>
							</div>
						)}
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className="relative min-h-screen rounded-md">
			{renderHeader()}
			<div className="container relative mx-auto mt-2 rounded-md bg-white p-4">
				{renderProducts()}
			</div>
		</div>
	);
}

export default AllProducts;
