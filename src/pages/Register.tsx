import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import {
	registerUser,
	selectError,
	selectIsLoading,
} from '../features/auth/authSlice';
import type { AppDispatch } from '../store/store';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			// You might want to set an error state here and display it
			console.error("Passwords don't match");
			return;
		}
		dispatch(registerUser({ email, password }));
	};

	return (
		<form className="min-w-[800px]" onSubmit={handleRegister}>
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
			<Button className="mt-4 w-full" type="submit" disabled={isLoading}>
				{isLoading ? 'Registering...' : 'Register'}
			</Button>
			{error && <p className="mt-2 text-red-500">{error}</p>}
		</form>
	);
};

export default Register;
