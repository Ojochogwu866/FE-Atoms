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
	{
		name: 'Hats',
		searchCategory: "Men's Wear",
		image:
			'https://media.istockphoto.com/id/621487426/photo/lumbersexual-bearded-senior-men-hipster.jpg?s=612x612&w=0&k=20&c=IZVWeT2ySuArqYmFTFEpvRqN5dVMkUtgFNGdI8NJ57E=',
	},
	{
		name: 'Shorts',
		searchCategory: "Men's Wear",
		image:
			'https://media.istockphoto.com/id/2149765102/photo/white-short-pants-front-and-back.jpg?s=612x612&w=0&k=20&c=UiQMDTskSi3Cnbr2Ymye9FezW4xT8DhLiAcr2lAzk0o=',
	},
	{
		name: 'Wrist Watches',
		searchCategory: 'jewelery',
		image:
			'https://media.istockphoto.com/id/145784198/video/watchmaker-assembling-watch.jpg?s=640x640&k=20&c=9HvtDuAQNZUdAecf9uV_CRYdpM2UOUlvKCVn-WzYeGw=',
	},
	{
		name: 'Jewelries',
		searchCategory: 'jewelery',
		image:
			'https://media.istockphoto.com/id/1491130656/photo/platinum-and-gold-ring-with-square-diamonds-floating-on-white-background-from-design-with-3d.jpg?s=612x612&w=0&k=20&c=sc4yMgAq2ZaF-Vs7C9FnOAu9hoNwtFEBPYYdECQv-Ts=',
	},
	{
		name: 'Hoodies',
		searchCategory: 'Unisex Wear',
		image:
			'https://media.istockphoto.com/id/1327784914/photo/cheerful-young-man-wearing-lilac-hoodie.jpg?s=612x612&w=0&k=20&c=ig_Z1-DP5IgNakJosnwJMqrFd4iq9QG80kUUb0FbWhg=',
	},
	{
		name: 'Pants',
		searchCategory: 'Womens Wear',
		image:
			'https://media.istockphoto.com/id/1426592893/photo/pants-clothes-isolated-in-white-background-invisible-mannequin.jpg?s=612x612&w=0&k=20&c=BLNc1wXgZCaYu7o0N6Qhxho0ihA7EQf4zCHl3KeZuRg=',
	},
	{
		name: 'Bags',
		searchCategory: "Women's Wear",
		image:
			'https://media.istockphoto.com/id/1777940282/vector/hand-drawn-shopping-bag-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=cqgnS77ZySAdX1TdiPl-YOj3zriGhgvmER4PwNdsmbk=',
	},
];

function Main() {
	const { products, status, error } = useFetchProducts('limited');
	const [currentSlide, setCurrentSlide] = useState(0);
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

	const ProductCard = ({ product }) => {
		if (!product) {
			return null;
		}
		return (
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -20 }}
				transition={{ duration: 0.5 }}
				className="group relative h-[300px] w-full max-w-[300px] overflow-hidden rounded-lg border bg-white shadow-sm"
			>
				<img
					src={product.images}
					alt={product.name}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				<div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					<h3 className="mb-1 truncate text-sm font-semibold text-white">
						{product.name}
					</h3>
					<p className="text-gray-300">{product.price}</p>
				</div>
			</motion.div>
		);
	};

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
						<div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
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
		<div className="flex flex-col px-4 sm:px-6 lg:px-8">
			<div className="flex w-full flex-col lg:flex-row">
				<div className="mb-8 flex w-full flex-col space-y-4 lg:mb-0 lg:w-1/2">
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
							className="max-w-[500px] text-3xl font-extrabold leading-tight text-[#4B5320] sm:text-4xl sm:leading-[70px] md:text-5xl lg:text-6xl"
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
				<div className="flex w-full flex-col items-center lg:w-1/2">
					{renderProducts()}
					<div className="mt-4 flex w-full items-center justify-end gap-4">
						<button
							onClick={handlePrevProducts}
							className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							<MoveLeft size={26} color="#4B5320" strokeWidth={1} />
						</button>
						<button
							onClick={handleNextProducts}
							className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							<MoveRight size={32} color="#4B5320" strokeWidth={1} />
						</button>
					</div>
				</div>
			</div>
			<div className="mt-6 rounded-md bg-white p-4 sm:p-8">
				<div>
					<h1 className="text-2xl font-bold text-[#4B5320]">Collections</h1>
					<p>
						Bowse through our available collections and pick an option of best
						fit
					</p>
				</div>
				<div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
					{categories.map((category) => (
						<button
							key={category.name}
							onClick={() => handleCategoryClick(category.name)}
							className="group relative h-32 w-full overflow-hidden rounded-md transition-transform duration-300 hover:scale-105 sm:h-40"
						>
							<img
								src={category.image}
								alt={category.name}
								className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
							/>
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
								<span className="text-lg font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									{category.name}
								</span>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default Main;
