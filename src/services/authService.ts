const API_URL = import.meta.env.VITE_APP_BASE_URL

export interface LoginCredentials {
	email: string;
	password: string;
}

interface User {
	id: string;
	email: string;
	role: string;
}

export interface AuthResponse {
	status: string;
	data: {
		user: User;
		token: string;
	};
}

export const authService = {
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await fetch(`${API_URL}/auth/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error('Login failed');
		}

		return response.json();
	},

	async register(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await fetch(`${API_URL}/auth/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error('Registration failed');
		}

		return response.json();
	},
};
