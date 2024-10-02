import { AnimatePresence, motion } from 'framer-motion';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	ErrorProducts,
	LoadingProducts,
	NoProducts,
} from '../../features/Products/ProductsState';
import { useFetchProducts } from '../../hooks/useFetch';
import { fetchLimitedProducts } from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';

const slides = [
	{
		title:
			"Access our top sales today <span class='italic'>Delivery</span> is free",
		subtitle: 'Redefine your wardrobe',
	},
	{
		title: "Discover new styles <span class='italic'>Weekly</span> updates",
		subtitle: 'Stay ahead of fashion trends',
	},
	{
		title:
			"Exclusive deals available for <span class='italic'>Members</span> only",
		subtitle: 'Join our community today',
	},
];

const categories = [
	{ name: 'Hats', searchCategory: "men's clothing" },
	{ name: 'Shorts', searchCategory: "men's clothing" },
	{ name: 'Wrist Watches', searchCategory: 'jewelery' },
	{ name: 'Jewelries', searchCategory: 'jewelery' },
	{ name: 'Hoodies', searchCategory: "women's clothing" },
	{ name: 'Pants', searchCategory: "women's clothing" },
	{ name: 'Bags', searchCategory: "women's clothing" },
];

function Main() {
	const { products, status, error } = useFetchProducts('limited');
	const [currentSlide, setCurrentSlide] = useState(0);
	const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
		{}
	);
	const [currentProductIndex, setCurrentProductIndex] = useState(0);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 10000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (products.length > 0) {
			const images: Record<string, string> = {};
			categories.forEach((category) => {
				const product = products.find(
					(p) => p.category === category.searchCategory
				);
				if (product) {
					images[category.name] = product.image;
				}
			});
			setCategoryImages(images);
		}
	}, [products]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (products.length > 0) {
				setCurrentProductIndex((prev) => (prev + 1) % products.length);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [currentSlide, products]);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchLimitedProducts());
		}
	}, [status, dispatch]);

	const handlePrevProducts = () => {
		setCurrentProductIndex(
			(prev) => (prev - 2 + products.length) % products.length
		);
	};

	const handleNextProducts = () => {
		setCurrentProductIndex((prev) => (prev + 2) % products.length);
	};

	const handleCategoryClick = (category: string) => {
		const searchCategory = categories.find(
			(cat) => cat.name === category
		)?.searchCategory;
		navigate(`/category/${searchCategory}`);
	};

	const ProductCard = ({ product }) => (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.5 }}
			className="flex h-[300px] w-[300px] flex-col items-center justify-center rounded-lg border bg-white p-4 text-left shadow-sm"
		>
			<img
				src={product.image}
				alt={product.title}
				className="mb-2 h-32 w-full object-contain"
			/>
			<h3 className="w-full truncate text-sm font-semibold">{product.title}</h3>
			<p className="text-gray-600">${product.price}</p>
		</motion.div>
	);

	const renderProducts = () => {
		switch (status) {
			case 'loading':
				return <LoadingProducts />;
			case 'failed':
				return <ErrorProducts error={error || 'Unknown error occurred'} />;
			case 'succeeded':
				if (products.length === 0) {
					return <NoProducts />;
				}
				return (
					<AnimatePresence mode="wait">
						<div className="flex space-x-4">
							<ProductCard product={products[currentProductIndex]} />
							<ProductCard
								product={products[(currentProductIndex + 1) % products.length]}
							/>
						</div>
					</AnimatePresence>
				);
			default:
				return null;
		}
	};

	return (
		<div className="flex flex-col sm:px-6 lg:px-8">
			<div className="flex w-full">
				<div className="flex w-1/2 flex-col space-y-4">
					<p className="text-base font-normal text-gray-500">
						#Hot Sales Today
					</p>
					<AnimatePresence mode="wait">
						<motion.h1
							key={currentSlide}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.5 }}
							className="max-w-[500px] text-6xl font-extrabold leading-[70px] text-gray-700"
							dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }}
						/>
					</AnimatePresence>
					<AnimatePresence mode="wait">
						<motion.p
							key={currentSlide}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="mt-4 text-lg font-normal text-gray-500"
						>
							{slides[currentSlide].subtitle}
						</motion.p>
					</AnimatePresence>
					<div className="mt-4 flex space-x-2">
						{slides.map((_, index) => (
							<div
								key={index}
								className={`h-2 w-2 rounded-full ${
									index === currentSlide ? 'bg-gray-700' : 'bg-gray-300'
								}`}
							/>
						))}
					</div>
				</div>
				<div className="flex w-1/2 flex-col items-center">
					{renderProducts()}
					<div className="mt-4 flex w-full items-center justify-end gap-4">
						<button
							onClick={handlePrevProducts}
							className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							<MoveLeft size={26} color="#374151" strokeWidth={1} />
						</button>
						<button
							onClick={handleNextProducts}
							className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							<MoveRight size={32} color="#374151" strokeWidth={1} />
						</button>
					</div>
				</div>
			</div>
			<div className="mt-6 rounded-md bg-white p-8 py-8">
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
					{categories.map((category) => (
						<button
							key={category.name}
							onClick={() => handleCategoryClick(category.name)}
							className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-4 transition-colors duration-200 hover:bg-gray-200"
						>
							{categoryImages[category.name] ? (
								<img
									src={categoryImages[category.name]}
									alt={category.name}
									className="mb-2 h-16 w-16 object-contain"
								/>
							) : (
								<div className="mb-2 h-16 w-16 bg-gray-200" />
							)}
							<span className="text-sm font-medium">{category.name}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default Main;
