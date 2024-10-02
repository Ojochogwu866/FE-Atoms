import React from 'react';
import Header from '../components/ui/Header';
import Modal from '../components/ui/Modal';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/dashboard';

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
		<div className="min-h-screen bg-gray-100">
			<Header
				title="Atom"
				userInfo={null}
				cartItemCount={0}
				notificationCount={0}
				isAuthenticatedUser={false}
				openLoginModal={openLoginModal}
				openRegisterModal={openRegisterModal}
			/>
			<div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto w-full max-w-7xl space-y-8">
					<div>
						<Dashboard />
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
