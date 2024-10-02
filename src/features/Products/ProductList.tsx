import React from 'react';
import Button from '../../components/ui/button';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}

interface ProductListProps {
	products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => (
				<div
					key={product.id}
					className="flex flex-col justify-between rounded-lg border p-4"
				>
					<img
						src={product.image}
						alt={product.title}
						className="mb-4 h-48 w-full object-contain"
					/>
					<h2 className="mb-2 text-lg font-semibold">{product.title}</h2>
					<p className="-mt-4 mb-2 text-gray-600">${product.price}</p>
					<Button>Add to Cart</Button>
				</div>
			))}
		</div>
	);
};

export default ProductList;
