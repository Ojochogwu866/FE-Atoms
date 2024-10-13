import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Footer from './components/ui/Footer';
import Auth from './features/Auth';
import DropNotification from './components/ui/DropNotification';
import { selectIsAuthenticated } from './store/authSlice';
import Header from './components/ui/Header';

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
			<DropNotification />
			{isAuthenticated ? (
				<>
				<Auth
					isLoginOpen={!isLoginOpen}
					isRegisterOpen={!isRegisterOpen}
					openLoginModal={openLoginModal}
					openRegisterModal={openRegisterModal}
					closeLoginModal={closeLoginModal}
					closeRegisterModal={closeRegisterModal}
				/>
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
			<Footer />
		</div>
	);
}

export default App;
