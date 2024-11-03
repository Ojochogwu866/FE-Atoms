import { useEffect, useState } from 'react';
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
import { Product } from '../types/products';
import Drawer from '../components/ui/Drawer';
import Button from '../components/ui/button';
import { addItemToCart } from '../store/cartSlice';

function Categories() {
	const { categoryName } = useParams<{ categoryName: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { products, status, error } = useFetchProducts('category');
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const handleQuickView = (product: Product | null) => {
		setSelectedProduct(product);
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
							<ProductCard
								product={product}
								setSelectedProduct={handleQuickView}
							/>
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
			<Header notificationCount={0} title="Atom" />
			<div className="mx-auto w-full max-w-7xl">
				<div className="container mx-auto px-4 py-8">
					<h1 className="mb-6 text-3xl font-bold capitalize text-gray-700">
						{categoryName}
					</h1>
					{renderProducts()}
					{renderProductDrawer()}
				</div>
			</div>
		</main>
	);
}

export default Categories;
