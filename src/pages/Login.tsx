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

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectError);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }));
	};

	return (
		<form className="min-w-[800px]" onSubmit={handleLogin}>
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
			<Button className="mt-4 w-full" type="submit" disabled={isLoading}>
				{isLoading ? 'Logging in...' : 'Login'}
			</Button>
			{error && <p className="mt-2 text-red-500">{error}</p>}
		</form>
	);
};

export default Login;
