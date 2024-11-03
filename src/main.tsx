import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AuthWrapper from './features/AuthWrapper';
import './index.css';
import Category from './pages/Category';
import Dashboard from './pages/dashboard';
import ErrorPage from './pages/ErrorPage';
import { store } from './store/store';

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
		],
	},
	{
		path: '/category/:categoryName',
		element: <Category />,
	},
	{
		path: '/auth',
		element: <AuthWrapper />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
