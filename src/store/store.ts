import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		cart: cartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
