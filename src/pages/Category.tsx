import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/ui/Header';
import ProductCard from '../features/Products/ProductCard';
import {
	ErrorProducts,
	LoadingProducts,
	NoProducts,
} from '../features/Products/ProductsState';
import { useFetchProducts } from '../hooks/useFetch';
import { fetchProductsByCategory } from '../store/productsSlice';
import { AppDispatch } from '../store/store';

function Categories() {
	const { categoryName } = useParams<{ categoryName: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { products, status, error } = useFetchProducts('category');

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
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		if (categoryName) {
			dispatch(fetchProductsByCategory(categoryName));
		}
	}, [dispatch, categoryName]);

	return (
		<main className="w-full">
			<Header title="Atom" />
			<div className="mx-auto w-full max-w-7xl">
				<div className="container mx-auto px-4 py-8">
					<h1 className="mb-6 text-3xl font-bold capitalize text-gray-700">
						{categoryName}
					</h1>
					{renderProducts()}
				</div>
			</div>
		</main>
	);
}

export default Categories;
