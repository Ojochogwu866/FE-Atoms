import { Link, Outlet } from 'react-router-dom';

const Auth = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Welcome to Our Infradash
					</h2>
					<nav className="mt-8">
						<ul className="flex justify-center space-x-4">
							<li>
								<Link
									to="/login"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to="/register"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Register
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Auth;
