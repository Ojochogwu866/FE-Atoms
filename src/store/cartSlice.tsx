import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartService } from '../services/cartService';
import { CartItem } from '../types/products';
interface CartState {
	items: CartItem[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

interface UpdateQuantityPayload {
	productId: string | number;
	quantity: number;
}

const initialState: CartState = {
	items: [],
	status: 'idle',
	error: null,
};

export const fetchCart = createAsyncThunk(
	'cart/fetchCart',
	async (_, thunkAPI) => {
		try {
			return await cartService.getCart();
		} catch (error) {
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	}
);

export const addItemToCart = createAsyncThunk(
	'cart/addItem',
	async (item: CartItem, thunkAPI) => {
		try {
			return await cartService.addToCart(item);
		} catch (error) {
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	}
);

export const updateCartItemQuantity = createAsyncThunk(
	'cart/updateQuantity',
	async ({ productId, quantity }: UpdateQuantityPayload, thunkAPI) => {
		try {
			return await cartService.updateQuantity({ productId, quantity });
		} catch (error) {
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	}
);

export const removeItemFromCart = createAsyncThunk(
	'cart/removeItem',
	async (productId: string | number, thunkAPI) => {
		try {
			return await cartService.removeFromCart(productId);
		} catch (error) {
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	}
);

export const clearEntireCart = createAsyncThunk(
	'cart/clearCart',
	async (_, thunkAPI) => {
		try {
			await cartService.clearCart();
			return [];
		} catch (error) {
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			.addCase(addItemToCart.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(removeItemFromCart.fulfilled, (state, action) => {
				state.items = action.payload;
			})
			.addCase(clearEntireCart.fulfilled, (state) => {
				state.items = [];
			})
			.addCase(updateCartItemQuantity.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
				state.error = null;
			})
			.addCase(updateCartItemQuantity.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export default cartSlice.reducer;
