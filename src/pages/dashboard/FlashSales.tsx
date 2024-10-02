import { MoveLeft, MoveRight, Zap } from 'lucide-react';

function FlashSales() {
	return (
		<div className="mt-6 rounded-md bg-white p-8 py-8">
			<div className="flex gap-4">
				<Zap size={36} strokeWidth={3} color="#374151" absoluteStrokeWidth />
				<h1 className="text-3xl font-bold text-gray-700">Flash Sales</h1>
			</div>
			<div className="flex w-full justify-end gap-4">
				<button className="rounded-[2px] border border-transparent bg-gray-100 px-4 text-gray-700 hover:bg-gray-200 focus:ring-gray-400">
					<MoveLeft
						size={20}
						color="#374151"
						strokeWidth={1}
						absoluteStrokeWidth
					/>
				</button>
				<button className="rounded-[2px] border border-transparent bg-gray-100 px-4 text-gray-700 hover:bg-gray-200 focus:ring-gray-400">
					<MoveRight
						size={32}
						color="#374151"
						strokeWidth={1}
						absoluteStrokeWidth
					/>
				</button>
			</div>
		</div>
	);
}

export default FlashSales;
