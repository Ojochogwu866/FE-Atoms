import gsap from 'gsap';
import { MoveLeft, MoveRight, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ProductCard from '../../features/Products/ProductCard';
import {
	ErrorProducts,
	LoadingProducts,
	NoProducts,
} from '../../features/Products/ProductsState';
import { useFetchProducts } from '../../hooks/useFetch';

function FlashSales() {
	const { products, status, error } = useFetchProducts('all');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [displayProducts, setDisplayProducts] = useState([]);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (Array.isArray(products?.data?.products)) {
			setDisplayProducts(products.data.products.slice(0, 10));
		} else if (Array.isArray(products)) {
			setDisplayProducts(products.slice(0, 10));
		} else {
			setDisplayProducts([]);
		}
	}, [products]);

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
									<ProductCard product={product} />
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
			{renderProducts()}
		</div>
	);
}

export default FlashSales;
