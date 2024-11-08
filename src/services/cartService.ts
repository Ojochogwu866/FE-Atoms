import {
	AddToCartPayload,
	ApiResponse,
	Cart,
	UpdateCartQuantityPayload,
} from '../types/products';

const API_URL = import.meta.env.VITE_APP_BASE_URL;

export const cartServices = {
	getCart: async () => {
		const response = await fetch(`${API_URL}/cart`);
		const data: ApiResponse<{ cart: Cart }> = await response.json();
		return data;
	},

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

	removeFromCart: async (productId: string) => {
		const response = await fetch(`${API_URL}/cart/${productId}`, {
			method: 'DELETE',
		});
		const data: ApiResponse<{ cart: Cart }> = await response.json();
		return data;
	},
};
