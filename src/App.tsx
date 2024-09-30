import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Auth from './features/auth/Auth';
import { selectIsAuthenticated } from './features/auth/authSlice';

function App() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const location = useLocation();

	const openLoginModal = () => setIsLoginOpen(true);
	const openRegisterModal = () => setIsRegisterOpen(true);
	const closeLoginModal = () => setIsLoginOpen(false);
	const closeRegisterModal = () => setIsRegisterOpen(false);

	if (!isAuthenticated && location.pathname !== '/') {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="min-h-screen bg-gray-100">
			{isAuthenticated ? (
				<>
					<header>{/* Add your header content */}</header>
					<main>
						<Outlet />
					</main>
					<footer>{/* Add your footer content */}</footer>
				</>
			) : (
				<Auth
					isLoginOpen={isLoginOpen}
					isRegisterOpen={isRegisterOpen}
					openLoginModal={openLoginModal}
					openRegisterModal={openRegisterModal}
					closeLoginModal={closeLoginModal}
					closeRegisterModal={closeRegisterModal}
				/>
			)}
		</div>
	);
}

export default App;
