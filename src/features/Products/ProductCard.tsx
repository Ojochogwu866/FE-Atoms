import { Eye, Heart, Star } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import Button from '../../components/ui/button';
import { addItemToCart } from '../../store/cartSlice';
import { Product } from '../../types/products';

interface ProductCardProps {
	product: Product;
	setSelectedProduct: (product: Product | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	setSelectedProduct,
}) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	const handleAddToCart = () => {
		dispatch(
			addItemToCart({
				id: product._id,
				title: product.name,
				price: product.price,
				image: product.images,
				quantity: 1,
			})
		);
	};

	return (
		<div
			className="relative rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<button
				className={`absolute right-4 top-4 z-10 rounded-full p-2 ${
					isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50'
				}`}
				onClick={() => setIsLiked(!isLiked)}
			>
				<Heart className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} />
			</button>

			<div className="relative aspect-square overflow-hidden rounded-lg">
				<img
					src={product.images}
					alt={product.name}
					className="h-full w-full object-cover"
				/>
				{isHovered && (
					<div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-30">
						<button
							onClick={() => setSelectedProduct(product)}
							className="flex items-center text-sm text-white"
						>
							<Eye className="mr-2 h-4 w-4" />
							View item
						</button>
					</div>
				)}
			</div>

			<div className="mt-4">
				<h3 className="text-lg font-semibold">{product.name}</h3>
				<div className="mt-1 flex items-center">
					<Star className="h-4 w-4 text-yellow-400" />
					<span className="ml-1 text-sm text-gray-600">{product?.rating}</span>
				</div>
				<div className="mt-2 flex items-center justify-between">
					<span className="text-lg font-bold">${product.price}</span>
					<Button onClick={handleAddToCart}>Add to cart</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
