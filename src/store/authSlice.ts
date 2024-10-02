import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

interface User {
	id: string;
	email: string;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk(
	'auth/login',
	async (
		credentials: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			return data.user;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/register',
	async (
		credentials: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				throw new Error('Registration failed');
			}

			const data = await response.json();
			return data.user;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
