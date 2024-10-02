import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Auth from './features/Auth.tsx';
import './index.css';
import Category from './pages/Category.tsx';
import Dashboard from './pages/dashboard';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { store } from './store/store.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			// Add other authenticated routes here
		],
	},
	{
		path: '/category/:categoryName',
		element: <Category />,
	},
	{
		path: '/',
		element: <Auth />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
