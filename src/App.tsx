// App.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import DropNotification from './components/ui/DropNotification';
import Footer from './components/ui/Footer';
import Header from './components/ui/Header';
import { selectIsAuthenticated } from './store/authSlice';

function App() {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const location = useLocation();

	// Only redirect for specific protected routes (e.g., checkout, profile)
	const protectedRoutes = ['/checkout', '/profile', '/orders'];
	if (!isAuthenticated && protectedRoutes.includes(location.pathname)) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<DropNotification />
			<Header title="Atom" notificationCount={0} />

			{/* Main content */}
			<div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto w-full max-w-7xl space-y-8">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
