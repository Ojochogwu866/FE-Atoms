import React from 'react';
import Modal from '../components/ui/Modal';
import Login from '../pages/Login';
import Register from '../pages/Register';

interface AuthProps {
	isLoginOpen: boolean;
	isRegisterOpen: boolean;
	openLoginModal: () => void;
	openRegisterModal: () => void;
	closeLoginModal: () => void;
	closeRegisterModal: () => void;
}

const Auth: React.FC<AuthProps> = ({
	isLoginOpen,
	isRegisterOpen,
	openLoginModal,
	openRegisterModal,
	closeLoginModal,
	closeRegisterModal,
}) => {
	return (
		<div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto w-full max-w-7xl space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900">
						Welcome to Atom
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Please sign in or create an account to continue
					</p>
					<div className="mt-6 space-x-4">
						<button
							onClick={openLoginModal}
							className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Sign In
						</button>
						<button
							onClick={openRegisterModal}
							className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>

			<Modal title="Sign in" isOpen={isLoginOpen} onClose={closeLoginModal}>
				<Login onClose={closeLoginModal} />
			</Modal>

			<Modal
				title="Sign up"
				isOpen={isRegisterOpen}
				onClose={closeRegisterModal}
			>
				<Register onClose={closeRegisterModal} />
			</Modal>
		</div>
	);
};

export default Auth;
