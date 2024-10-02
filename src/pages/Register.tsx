import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppleIcon from '../assets/icons/apple.svg';
import GoogleIcon from '../assets/icons/google.svg';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { registerUser, selectError, selectIsLoading } from '../store/authSlice';
import type { AppDispatch } from '../store/store';

interface RegisterProps {
	onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			console.error("Passwords don't match");
			return;
		}
		dispatch(registerUser({ email, password }))
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
					Sign up to shop quality products at affordable rates on our platform
				</p>
			</div>
			<form className="space-y-4" onSubmit={handleRegister}>
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
				<Input
					label="Confirm Password"
					type="password"
					value={confirmPassword}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setConfirmPassword(e.target.value)
					}
					required
				/>
				<Button className="w-full" type="submit" disabled={isLoading}>
					{isLoading ? 'Registering...' : 'Sign Up'}
				</Button>
			</form>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-white px-2 text-gray-500">Or sign up with</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<Button
					type="button"
					className="flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
					onClick={() => {
						/* Implement Google signup */
					}}
				>
					<GoogleIcon />
					Google
				</Button>
				<Button
					type="button"
					className="flex items-center justify-center bg-black text-white hover:bg-gray-800"
					onClick={() => {
						/* Implement Apple signup */
					}}
				>
					<AppleIcon />
					Apple
				</Button>
			</div>
		</div>
	);
};

export default Register;
