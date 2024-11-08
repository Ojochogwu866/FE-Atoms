// types/cart.ts
export interface Product {
	_id: string;
	name: string;
	description: string;
	price: string;
	category: string;
	rating: string;
	images: string;
	createdAt: string;
	updatedAt: string;
}

export interface CartItem {
	product: Product;
	quantity: number;
	_id: string;
}

export interface Cart {
	user: null | string;
	sessionId: string;
	items: CartItem[];
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface CartState {
	cart: Cart | null;
	loading: boolean;
	error: string | null;
}

export interface AddToCartPayload {
	productId: string;
	quantity: number;
}

export interface UpdateCartQuantityPayload {
	productId: string;
	quantity: number;
}

export interface ApiResponse<T> {
	status: string;
	data: T;
}
