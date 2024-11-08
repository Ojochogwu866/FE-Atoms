import gsap from 'gsap';
import { MoveLeft, MoveRight, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/ui/button';
import Drawer from '../../components/ui/Drawer';
import ProductCard from '../../features/Products/ProductCard';
import {
	ErrorProducts,
	LoadingProducts,
	NoProducts,
} from '../../features/Products/ProductsState';
import { useFetchProducts } from '../../hooks/useFetch';
import { addToCart } from '../../store/cartSlice';
import { AppDispatch } from '../../store/store';
import { Product } from '../../types/products';

function FlashSales() {
	const { products, status, error } = useFetchProducts('all');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const dispatch = useDispatch<AppDispatch>();

	const handleQuickView = (product: Product | null) => {
		setSelectedProduct(product);
	};

	useEffect(() => {
		if (Array.isArray(products)) {
			setDisplayProducts(products.slice(0, 10));
		} else {
			setDisplayProducts([]);
		}
	}, [products]);

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
									addToCart({
										productId: selectedProduct._id,
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

	const handleMoveLeft = () => {
		setCurrentIndex((prevIndex) => {
			const newIndex = Math.max(prevIndex - 1, 0);
			animateSlide(newIndex);
			return newIndex;
		});
	};

	const handleMoveRight = () => {
		setCurrentIndex((prevIndex) => {
			const newIndex = Math.min(
				prevIndex + 1,
				Math.max(0, displayProducts.length - 5)
			);
			animateSlide(newIndex);
			return newIndex;
		});
	};

	const animateSlide = (newIndex: number) => {
		if (containerRef.current) {
			gsap.to(containerRef.current, {
				duration: 0.5,
				x: -(newIndex * (256 + 16)),
				ease: 'power2.out',
			});
		}
	};

	const renderProducts = () => {
		switch (status) {
			case 'loading':
				return <LoadingProducts />;
			case 'failed':
				return <ErrorProducts error={error || 'Unknown error occurred'} />;
			case 'succeeded':
				if (displayProducts.length === 0) {
					return <NoProducts />;
				}
				return (
					<div className="relative overflow-hidden">
						<div ref={containerRef} className="flex gap-4">
							{displayProducts.map((product) => (
								<div key={product._id} className="w-64 flex-shrink-0">
									<ProductCard
										product={product}
										setSelectedProduct={handleQuickView}
									/>
								</div>
							))}
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	const showNavButtons = status === 'succeeded' && displayProducts.length > 5;

	return (
		<div className="mt-6 rounded-md bg-white p-8">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Zap size={24} strokeWidth={2} color="#4B5320" />
					<h1 className="text-2xl font-bold text-[#4B5320]">Flash Sales</h1>
				</div>
				{showNavButtons && (
					<div className="flex gap-4">
						<button
							className="rounded-[2px] bg-gray-200 px-3 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
							onClick={handleMoveLeft}
							disabled={currentIndex === 0}
						>
							<MoveLeft size={20} color="#4B5320" strokeWidth={1} />
						</button>
						<button
							className="rounded-[2px] bg-gray-200 px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
							onClick={handleMoveRight}
							disabled={currentIndex >= displayProducts.length - 5}
						>
							<MoveRight size={36} color="#4B5320" strokeWidth={1} />
						</button>
					</div>
				)}
			</div>
			{renderProductDrawer()}
			{renderProducts()}
		</div>
	);
}

export default FlashSales;
