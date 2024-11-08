import { motion } from 'framer-motion';

interface ProductCardProps {
	product: any;
}

export const ProductCard = ({ product }: ProductCardProps) => {
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
