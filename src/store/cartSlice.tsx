import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
	id: string | number;
	title: string;
	price: string | number;
	quantity: number;
	image: string;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},
		removeFromCart: (state, action: PayloadAction<string | number>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: string | number; quantity: number }>
		) => {
			const item = state.items.find((item) => item.id === action.payload.id);
			if (item) {
				item.quantity = action.payload.quantity;
			}
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
