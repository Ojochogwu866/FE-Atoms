import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProductCard } from '../../components/ui/ProductCard';
import { Categories } from '../../components/ui/Categories';
import { Slider } from '../../components/ui/Slides';
import { useFetchProducts } from '../../hooks/useFetch';
import { fetchLimitedProducts } from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import { categories } from '../../constants/categories';
import { slides } from '../../constants/slides';
import { ErrorProducts, LoadingProducts, NoProducts } from '../../features/Products/ProductsState';
import { MoveLeft, MoveRight } from 'lucide-react';

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
			dispatch(fetchLimitedProducts(10));
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
                <Slider currentSlide={currentSlide} />
                {/* Products section */}
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
            <Categories onCategoryClick={handleCategoryClick} />
        </div>
	);
}

export default Main;
