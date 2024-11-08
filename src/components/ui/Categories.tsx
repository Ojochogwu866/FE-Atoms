import { categories } from '../../constants/categories';

interface CategoriesProps {
	onCategoryClick: (category: string) => void;
}

export const Categories = ({ onCategoryClick }: CategoriesProps) => {
	return (
		<div className="mt-6 rounded-md bg-white p-4 sm:p-8">
			<div>
				<h1 className="text-2xl font-bold text-[#4B5320]">Collections</h1>
				<p>
					Browse through our available collections and pick an option of best
					fit
				</p>
			</div>
			<div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
				{categories.map((category) => (
					<button
						key={category.name}
						onClick={() => onCategoryClick(category.name)}
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
	);
};
