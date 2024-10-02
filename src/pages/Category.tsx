import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/ui/Header';
import ProductList from '../features/Products/ProductList';
import { fetchProductsByCategory } from '../store/productsSlice';
import { AppDispatch, RootState } from '../store/store';

const Categories: React.FC = () => {
	const { categoryName } = useParams<{ categoryName: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const {
		items: products,
		status,
		error,
	} = useSelector((state: RootState) => state.products);

	useEffect(() => {
		if (categoryName) {
			dispatch(fetchProductsByCategory(categoryName));
		}
	}, [dispatch, categoryName]);

	return (
		<main className="w-full">
			<Header />
			<div className="mx-auto w-full max-w-7xl">
				<div className="container mx-auto px-4 py-8">
					<h1 className="mb-6 text-3xl font-bold capitalize text-gray-700">
						{categoryName}
					</h1>
					{status === 'loading' && <p>Loading products...</p>}
					{status === 'failed' && <p>Error: {error}</p>}
					{status === 'succeeded' && <ProductList products={products} />}
				</div>
			</div>
		</main>
	);
};

export default Categories;
