import React, { useState } from 'react';
import Auth from './Auth';

const AuthWrapper: React.FC = () => {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);

	const openLoginModal = () => setIsLoginOpen(true);
	const closeLoginModal = () => setIsLoginOpen(false);
	const openRegisterModal = () => setIsRegisterOpen(true);
	const closeRegisterModal = () => setIsRegisterOpen(false);

	return (
		<Auth
			isLoginOpen={isLoginOpen}
			isRegisterOpen={isRegisterOpen}
			openLoginModal={openLoginModal}
			closeLoginModal={closeLoginModal}
			openRegisterModal={openRegisterModal}
			closeRegisterModal={closeRegisterModal}
		/>
	);
};

export default AuthWrapper;
