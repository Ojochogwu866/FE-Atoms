import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import {
	loginUser,
	selectError,
	selectIsLoading,
} from '../features/auth/authSlice';
import type { AppDispatch } from '../store/store';

interface LoginProps {
	onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }))
			.then(() => onClose())
			.catch(() => {});
	};

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h2 className="text-2xl font-bold text-gray-900">
					Welcome to Infradash
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Login to shop quality products at affordable rates on our platform
				</p>
			</div>
			<form className="space-y-4" onSubmit={handleLogin}>
				<Input
					label="Email"
					type="email"
					value={email}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					required
				/>
				<Input
					label="Password"
					type="password"
					value={password}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					required
				/>
				<Button className="w-full" type="submit" disabled={isLoading}>
					{isLoading ? 'Logging in...' : 'Login'}
				</Button>
			</form>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-white px-2 text-gray-500">Or continue with</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<Button
					type="button"
					className="flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
					onClick={() => {
						/* Implement Google login */
					}}
				>
					<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
						<path
							fill="#EA4335"
							d="M12 5c1.6 0 3 .5 4.1 1.5l3.1-3.1C17.1 1.8 14.7 1 12 1S6.9 1.8 4.8 3.4l3.1 3.1C9 5.5 10.4 5 12 5z"
						/>
						<path
							fill="#4285F4"
							d="M23 12c0-.8-.1-1.6-.2-2.3H12v4.6h6.2c-.3 1.4-1 2.6-2.1 3.4l3.3 2.6c1.9-1.8 3-4.3 3-7.3z"
						/>
						<path
							fill="#FBBC05"
							d="M5 12c0-1 .2-1.9.5-2.8L2.4 6.1C1.5 7.9 1 9.9 1 12s.5 4.1 1.4 5.9l3.1-3.1C5.2 13.9 5 13 5 12z"
						/>
						<path
							fill="#34A853"
							d="M12 19c-1.6 0-3-.5-4.1-1.5l-3.1 3.1C6.9 22.2 9.3 23 12 23c2.7 0 5.1-.8 7-2.3l-3.3-2.6c-1 .7-2.3 1.1-3.7 1.1z"
						/>
					</svg>
					Google
				</Button>
				<Button
					type="button"
					className="flex items-center justify-center bg-black text-white hover:bg-gray-800"
					onClick={() => {
						/* Implement Apple login */
					}}
				>
					<svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
					</svg>
					Apple
				</Button>
			</div>
		</div>
	);
};

export default Login;
