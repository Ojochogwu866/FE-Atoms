import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { AuthState, LoginCredentials, User } from '../types/auth';
import { RootState } from './store';

const loadInitialState = (): AuthState => {
	try {
		const savedAuth = localStorage.getItem('auth');
		if (savedAuth) {
			const parsedAuth = JSON.parse(savedAuth);
			return {
				...parsedAuth,
				isLoading: false,
				error: null,
			};
		}
	} catch (error) {
		localStorage.removeItem('auth');
	}

	return {
		user: null,
		token: null,
		isAuthenticated: false,
		isLoading: false,
		error: null,
	};
};

const initialState: AuthState = loadInitialState();

const saveToLocalStorage = (user: User, token: string) => {
	try {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				user,
				token,
				isAuthenticated: true,
			})
		);
	} catch (error) {
		console.error('Error saving to localStorage:', error);
	}
};

export const loginUser = createAsyncThunk(
	'auth/login',
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			const data = await authService.login(credentials);
			if (data.status === 'success' && data.data.user && data.data.token) {
				saveToLocalStorage(data.data.user, data.data.token);
				return data.data;
			} else {
				throw new Error('Invalid response format');
			}
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/register',
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			const data = await authService.register(credentials);
			if (data.status === 'success' && data.data.user && data.data.token) {
				saveToLocalStorage(data.data.user, data.data.token);
				return data.data;
			} else {
				throw new Error('Invalid response format');
			}
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
			state.token = null;
			state.isAuthenticated = false;
			localStorage.removeItem('auth');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
