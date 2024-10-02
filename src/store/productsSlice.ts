import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating?: {
		rate: number;
		count: number;
	};
}

interface ProductsState {
	items: Product[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: ProductsState = {
	items: [],
	status: 'idle',
	error: null,
};

export const fetchProducts = createAsyncThunk<
	Product[],
	void,
	{ rejectValue: string }
>('products/fetchProducts', async (_, thunkAPI) => {
	try {
		const response = await fetch('https://fakestoreapi.com/products?limit=4');
		if (!response.ok) throw new Error('Network response was not ok');
		return await response.json();
	} catch (error) {
		return thunkAPI.rejectWithValue('Failed to fetch products.');
	}
});

export const fetchProductsByCategory = createAsyncThunk<
	Product[],
	string,
	{ rejectValue: string }
>('products/fetchProductsByCategory', async (category, thunkAPI) => {
	try {
		const response = await fetch(
			`https://fakestoreapi.com/products/category/${category}`
		);
		if (!response.ok) throw new Error('Network response was not ok');
		return await response.json();
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
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.status = 'succeeded';
					state.items = action.payload;
				}
			)
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'Failed to fetch products';
			})
			.addCase(fetchProductsByCategory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchProductsByCategory.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.status = 'succeeded';
					state.items = action.payload;
				}
			)
			.addCase(fetchProductsByCategory.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'Failed to fetch products by category';
			});
	},
});

export default productsSlice.reducer;
