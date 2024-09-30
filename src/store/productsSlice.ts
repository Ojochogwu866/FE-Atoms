import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Product {
	id: number;
	title: string;
	price: number;
	image: string;
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

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await fetch('https://fakestoreapi.com/products?limit=4');
		return response.json();
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || null;
			});
	},
});

export default productsSlice.reducer;
