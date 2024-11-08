// services/cartServices.ts
import {
	AddToCartPayload,
	ApiResponse,
	Cart,
	UpdateCartQuantityPayload,
} from '../types/products';

const API_URL = 'http://localhost:3000/api';

export const cartServices = {
	// Get cart
	getCart: async () => {
		const response = await fetch(`${API_URL}/cart`);
		const data: ApiResponse<{ cart: Cart }> = await response.json();
		return data;
	},

	// Add to cart
	addToCart: async (payload: AddToCartPayload) => {
		const response = await fetch(`${API_URL}/cart/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const data: ApiResponse<{ cart: Cart }> = await response.json();
		return data;
	},

	// Update cart item quantity
	updateCartQuantity: async (payload: UpdateCartQuantityPayload) => {
		const response = await fetch(`${API_URL}/cart/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const data: ApiResponse<{ cart: Cart }> = await response.json();
		return data;
	},

	// Remove item from cart
	removeFromCart: async (productId: string) => {
		const response = await fetch(`${API_URL}/cart/${productId}`, {
			method: 'DELETE',
		});
		const data: ApiResponse<{ cart: Cart }> = await response.json();
		return data;
	},
};
