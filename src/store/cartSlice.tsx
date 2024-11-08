import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartServices } from '../services/cartService';
import {
	AddToCartPayload,
	CartState,
	UpdateCartQuantityPayload,
} from '../types/products';
import { RootState } from './store';

const initialState: CartState = {
	cart: null,
	loading: false,
	error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
	const response = await cartServices.getCart();
	return response.data.cart;
});

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async (payload: AddToCartPayload) => {
		const response = await cartServices.addToCart(payload);
		return response.data.cart;
	}
);

export const updateCartItemQuantity = createAsyncThunk(
	'cart/updateQuantity',
	async (payload: UpdateCartQuantityPayload) => {
		const response = await cartServices.updateCartQuantity(payload);
		return response.data.cart;
	}
);

export const removeItemFromCart = createAsyncThunk(
	'cart/removeItem',
	async (productId: string) => {
		const response = await cartServices.removeFromCart(productId);
		return response.data.cart;
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cart = null;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch cart';
			});

		builder
			.addCase(addToCart.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload;
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to add item to cart';
			});

		builder
			.addCase(updateCartItemQuantity.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload;
			})
			.addCase(updateCartItemQuantity.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to update cart item';
			});

		builder
			.addCase(removeItemFromCart.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeItemFromCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload;
			})
			.addCase(removeItemFromCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to remove item from cart';
			});
	},
});

export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartItems = (state: RootState) =>
	state.cart.cart?.items || [];
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
