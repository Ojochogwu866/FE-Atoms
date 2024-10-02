import { Heart, ShoppingCart, Star } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../../components/ui/button';
import { Product } from '../../store/productsSlice';

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<div className="flex h-[450px] w-64 flex-col rounded-lg border bg-white p-4 shadow-sm">
			<div className="flex w-full justify-end">
				<button
					className={`rounded-full p-2 ${
						isLiked ? 'text-red-500' : 'text-gray-400'
					}`}
					onClick={() => setIsLiked(!isLiked)}
				>
					<Heart className="h-6 w-6" fill={isLiked ? 'currentColor' : 'none'} />
				</button>
			</div>
			<img
				src={product.image}
				alt={product.title}
				className="mb-4 h-48 w-full object-contain"
			/>
			<h3 className="mb-2 line-clamp-2 text-sm font-semibold">
				{product.title}
			</h3>
			<div className="mb-2 flex items-center">
				<Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
				<span className="text-sm text-gray-600">{product.rating.rate}</span>
				<span className="ml-1 text-xs text-gray-400">
					({product.rating.count})
				</span>
			</div>
			<p className="mb-4 text-lg font-bold">${product.price.toFixed(2)}</p>
			<div className="mt-auto flex justify-between">
				<Button
					className="flex w-full items-center justify-center text-base font-normal"
					onClick={() => console.log('Add to cart:', product.id)}
				>
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to Cart
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;
