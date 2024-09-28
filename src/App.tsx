import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from './features/auth/authSlice';

function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Your main app layout goes here */}
            <header>
                {/* Add your header content */}
            </header>
            <main>
                {/* This is where your dashboard content will be rendered */}
                <Outlet />
            </main>
            <footer>
                {/* Add your footer content */}
            </footer>
        </div>
    );
}

export default App;