import gsap from 'gsap';
import { Search, Tally4 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/ui/button';
import ProductCard from '../../features/Products/ProductCard';
import {
	ErrorProducts,
	LoadingProducts,
	NoProducts,
} from '../../features/Products/ProductsState';
import { useFetchProducts } from '../../hooks/useFetch';

function AllProducts() {
	const { products, status, error } = useFetchProducts('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [displayCount, setDisplayCount] = useState(8);
	const containerRef = useRef<HTMLDivElement>(null);
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
		const matchesSearch = product.title
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

	const renderHeader = () => (
		<div className="sticky top-0 z-10 mt-6 rounded-md bg-white p-4 shadow-sm">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-2">
					<Tally4 size={36} strokeWidth={2} color="#374151" />
					<h1 className="text-3xl font-bold text-gray-700">All Products</h1>
				</div>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search products..."
						className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-gray-500 focus:outline-none"
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
								? 'bg-gray-700 text-white'
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
							className="grid grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						>
							{displayedProducts.map((product) => (
								<div
									key={product.id}
									className="transform transition-transform hover:scale-105"
								>
									<ProductCard product={product} />
								</div>
							))}
						</div>
						{displayCount < filteredProducts.length && (
							<div className="mt-20 flex justify-center">
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
