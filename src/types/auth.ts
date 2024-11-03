export interface LoginCredentials {
	email: string;
	password: string;
}
export interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface User {
	id: string;
	email: string;
	role: string;
}
