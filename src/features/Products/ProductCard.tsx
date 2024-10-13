import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../../components/ui/button';
import { Product } from '../../store/productsSlice';

interface ProductCardProps {
	product: Product;
	onAddToCart: (productId: number) => void;
	onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onAddToCart,
	onQuickView,
}) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative flex h-[400px] w-64 flex-col bg-white transition-all duration-300 "
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="absolute right-2 top-2 z-10">
				<button
					className={`rounded-full bg-white p-2 transition-colors duration-300 ${
						isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
					}`}
					onClick={() => setIsLiked(!isLiked)}
				>
					<Heart className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} />
				</button>
			</div>
			<div className="relative mb-4 h-[280px] w-full">
				<img
					src={product.images}
					alt={product.name}
					className="h-full w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				{isHovered && (
					<div className="absolute inset-0 flex items-center rounded-2xl justify-center bg-black bg-opacity-50 transition-opacity duration-300">
						<button
							className="rounded-full bg-white p-2 text-gray-800 hover:bg-gray-100"
							onClick={() => onQuickView(product)}
						>
							<Eye className="h-5 w-5" />
						</button>
					</div>
				)}
				<Button
					className="absolute bottom-4 right-4 flex w-[100px] items-center justify-center rounded-full text-base font-normal transition-colors duration-300"
					onClick={() => onAddToCart(product.id)}
				>
					Buy Now
				</Button>
			</div>
			<div className="flex flex-col items-start">
				<h3 className="mb-2 line-clamp-2 text-sm font-semibold">
					{product.name}
				</h3>
				<div className="mb-2 flex items-center">
					<Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
					<span className="text-sm text-gray-700">
						{product?.rating}
					</span>
					<span className="ml-1 text-xs text-gray-400">
						({product?.rating})
					</span>
				</div>
				<p className="text-base font-bold text-gray-700">{product.price}</p>
			</div>
		</div>
	);
};

export default ProductCard;