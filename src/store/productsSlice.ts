import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
	_id: string;
	name: string;
	price: string;
	description: string;
	category: string;
	images: string[];
	createdAt: string;
	updatedAt: string;
}

interface ProductsState {
	items: Product[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState = {
	allProducts: { items: [], status: 'idle', error: null } as ProductsState,
	limitedProducts: { items: [], status: 'idle', error: null } as ProductsState,
	categoryProducts: { items: [], status: 'idle', error: null } as ProductsState,
};

export const fetchAllProducts = createAsyncThunk<
	Product[],
	void,
	{ rejectValue: string }
>('products/fetchAllProducts', async (_, thunkAPI) => {
	try {
		const response = await fetch('http://localhost:3000/api/products');
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		if (data.status === 'success' && Array.isArray(data.data.products)) {
			return data.data.products;
		} else {
			throw new Error('Invalid data structure');
		}
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch all products.');
	}
});

export const fetchLimitedProducts = createAsyncThunk<
	Product[],
	number,
	{ rejectValue: string }
>('products/fetchLimitedProducts', async (limit, thunkAPI) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/products?limit=${limit}`
		);
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		if (data.status === 'success' && Array.isArray(data.data.products)) {
			return data.data.products;
		} else {
			throw new Error('Invalid data structure');
		}
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch limited products.');
	}
});

export const fetchProductsByCategory = createAsyncThunk<
	Product[],
	string,
	{ rejectValue: string }
>('products/fetchProductsByCategory', async (category, thunkAPI) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/products/category/${category}`
		);
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		if (data.status === 'success' && Array.isArray(data.data.products)) {
			return data.data.products;
		} else {
			throw new Error('Invalid data structure');
		}
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch products by category.');
	}
});

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// All Products
			.addCase(fetchAllProducts.pending, (state) => {
				state.allProducts.status = 'loading';
			})
			.addCase(
				fetchAllProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.allProducts.status = 'succeeded';
					state.allProducts.items = action.payload;
				}
			)
			.addCase(fetchAllProducts.rejected, (state, action) => {
				state.allProducts.status = 'failed';
				state.allProducts.error =
					action.payload || 'Failed to fetch all products';
			})
			// Limited Products
			.addCase(fetchLimitedProducts.pending, (state) => {
				state.limitedProducts.status = 'loading';
			})
			.addCase(
				fetchLimitedProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.limitedProducts.status = 'succeeded';
					state.limitedProducts.items = action.payload;
				}
			)
			.addCase(fetchLimitedProducts.rejected, (state, action) => {
				state.limitedProducts.status = 'failed';
				state.limitedProducts.error =
					action.payload || 'Failed to fetch limited products';
			})
			// Category Products
			.addCase(fetchProductsByCategory.pending, (state) => {
				state.categoryProducts.status = 'loading';
			})
			.addCase(
				fetchProductsByCategory.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.categoryProducts.status = 'succeeded';
					state.categoryProducts.items = action.payload;
				}
			)
			.addCase(fetchProductsByCategory.rejected, (state, action) => {
				state.categoryProducts.status = 'failed';
				state.categoryProducts.error =
					action.payload || 'Failed to fetch products by category';
			});
	},
});

export default productsSlice.reducer;
