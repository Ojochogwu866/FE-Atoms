import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import { AppDispatch, RootState } from '../../store/store';

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
		title: "Exclusive deals for <span class='italic'>Members</span> only",
		subtitle: 'Join our community today',
	},
];

function Dashboard() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [currentProductIndex, setCurrentProductIndex] = useState(0);
	const dispatch = useDispatch<AppDispatch>();
	const {
		items: products,
		status,
		error,
	} = useSelector((state: RootState) => state.products);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 10000);

		return () => clearInterval(timer);
	}, []);

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
			dispatch(fetchProducts());
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

	return (
		<div className="mx-auto flex flex-col sm:px-6 lg:px-8">
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
							className="max-w-[500px] text-5xl font-extrabold leading-[60px] text-gray-700"
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
					<h2 className="mb-4 w-full flex justify-start items-start text-2xl font-bold text-left">Featured Products</h2>
					{status === 'loading' && <p>Loading products...</p>}
					{status === 'failed' && <p>Error: {error}</p>}
					{status === 'succeeded' && products.length > 0 && (
						<AnimatePresence mode="wait">
							<div className="flex space-x-4">
								<ProductCard product={products[currentProductIndex]} />
								<ProductCard
									product={
										products[(currentProductIndex + 1) % products.length]
									}
								/>
							</div>
						</AnimatePresence>
					)}
					<div className="mt-4 flex justify-end items-end w-full space-x-4">
						<button
							onClick={handlePrevProducts}
							className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							<ArrowLeft size={24} />
						</button>
						<button
							onClick={handleNextProducts}
							className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							<ArrowRight size={24} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
