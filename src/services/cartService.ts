const CART_API_URL = 'http://localhost:3000/api/cart';

interface CartItem {
	id: string | number;
	title: string;
	price: string | number;
	quantity: number;
	image: string;
}

interface UpdateQuantityPayload {
	productId: string | number;
	quantity: number;
}

export interface CartApiResponse {
	status: string;
	data: {
		cart: CartItem[];
	};
}

export const cartService = {
	async getCart(): Promise<CartItem[]> {
		const response = await fetch(CART_API_URL);
		if (!response.ok) throw new Error('Failed to fetch cart');
		const data: CartApiResponse = await response.json();
		return data.data.cart;
	},

	async addToCart(item: CartItem): Promise<CartItem[]> {
		const response = await fetch(`${CART_API_URL}/add`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(item),
		});
		if (!response.ok) throw new Error('Failed to add item to cart');
		const data: CartApiResponse = await response.json();
		return data.data.cart;
	},

	async removeFromCart(productId: string | number): Promise<CartItem[]> {
		const response = await fetch(`${CART_API_URL}/remove/${productId}`, {
			method: 'DELETE',
		});
		if (!response.ok) throw new Error('Failed to remove item from cart');
		const data: CartApiResponse = await response.json();
		return data.data.cart;
	},

	async clearCart(): Promise<void> {
		const response = await fetch(`${CART_API_URL}/clear`, {
			method: 'DELETE',
		});
		if (!response.ok) throw new Error('Failed to clear cart');
	},

	async updateQuantity({
		productId,
		quantity,
	}: UpdateQuantityPayload): Promise<CartItem[]> {
		const response = await fetch(`${CART_API_URL}/update-quantity`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productId, quantity }),
		});

		if (!response.ok) {
			throw new Error('Failed to update item quantity');
		}

		const data: CartApiResponse = await response.json();
		return data.data.cart;
	},
};
