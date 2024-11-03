import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../services/productService';
import { Product } from '../types/products';

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
		return await productService.getAllProducts();
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as Error).message || 'Failed to fetch all products.'
		);
	}
});

export const fetchLimitedProducts = createAsyncThunk<
	Product[],
	number,
	{ rejectValue: string }
>('products/fetchLimitedProducts', async (limit, thunkAPI) => {
	try {
		return await productService.getLimitedProducts(limit);
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as Error).message || 'Failed to fetch limited products.'
		);
	}
});

export const fetchProductsByCategory = createAsyncThunk<
	Product[],
	string,
	{ rejectValue: string }
>('products/fetchProductsByCategory', async (category, thunkAPI) => {
	try {
		return await productService.getProductsByCategory(category);
	} catch (error) {
		return thunkAPI.rejectWithValue(
			(error as Error).message || 'Failed to fetch products by category.'
		);
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
				state.allProducts.error = null; // Reset error on loading
			})
			.addCase(
				fetchAllProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.allProducts.status = 'succeeded';
					state.allProducts.items = action.payload;
					state.allProducts.error = null;
				}
			)
			.addCase(fetchAllProducts.rejected, (state, action) => {
				state.allProducts.status = 'failed';
				state.allProducts.error =
					action.payload ?? 'Failed to fetch all products';
			})
			// Limited Products
			.addCase(fetchLimitedProducts.pending, (state) => {
				state.limitedProducts.status = 'loading';
				state.limitedProducts.error = null; // Reset error on loading
			})
			.addCase(
				fetchLimitedProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.limitedProducts.status = 'succeeded';
					state.limitedProducts.items = action.payload;
					state.limitedProducts.error = null;
				}
			)
			.addCase(fetchLimitedProducts.rejected, (state, action) => {
				state.limitedProducts.status = 'failed';
				state.limitedProducts.error =
					action.payload ?? 'Failed to fetch limited products';
			})
			// Category Products
			.addCase(fetchProductsByCategory.pending, (state) => {
				state.categoryProducts.status = 'loading';
				state.categoryProducts.error = null; // Reset error on loading
			})
			.addCase(
				fetchProductsByCategory.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.categoryProducts.status = 'succeeded';
					state.categoryProducts.items = action.payload;
					state.categoryProducts.error = null;
				}
			)
			.addCase(fetchProductsByCategory.rejected, (state, action) => {
				state.categoryProducts.status = 'failed';
				state.categoryProducts.error =
					action.payload ?? 'Failed to fetch products by category';
			});
	},
});

export default productsSlice.reducer;
