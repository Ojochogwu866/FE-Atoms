import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppleIcon from '../assets/icons/apple.svg';
import GoogleIcon from '../assets/icons/google.svg';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { loginUser, selectError, selectIsLoading } from '../store/authSlice';
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
				<h2 className="text-2xl font-bold text-gray-900">Welcome to Atom</h2>
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
					<GoogleIcon />
					Google
				</Button>
				<Button
					type="button"
					className="flex items-center justify-center bg-black text-white hover:bg-gray-800"
					onClick={() => {
						/* Implement Apple login */
					}}
				>
					<AppleIcon />
					Apple
				</Button>
			</div>
		</div>
	);
};

export default Login;
