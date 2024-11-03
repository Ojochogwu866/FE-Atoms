export interface Product {
	_id: string;
	name: string;
	price: string;
	description: string;
	category: string;
	rating: string;
	images: string;
	createdAt: string;
	updatedAt: string;
}

export interface CartItem {
	id: string | number;
	title: string;
	price: string | number;
	quantity: number;
	image: string;
}
