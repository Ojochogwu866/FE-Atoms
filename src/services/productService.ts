import { Product } from '../types/products';

const PRODUCTS_API_URL = import.meta.env.VITE_APP_BASE_URL

export const productService = {
	async getAllProducts(): Promise<Product[]> {
		const response = await fetch(`${PRODUCTS_API_URL}/products`);
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		return data.data.products;
	},

	async getLimitedProducts(limit: number): Promise<Product[]> {
		const response = await fetch(`${PRODUCTS_API_URL}/products?limit=${limit}`);
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		return data.data.products;
	},

	async getProductsByCategory(category: string): Promise<Product[]> {
		const response = await fetch(`${PRODUCTS_API_URL}/products/category/${category}`);
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		return data.data.products;
	},
};
