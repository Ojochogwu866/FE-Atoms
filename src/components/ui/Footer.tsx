import { Facebook, Instagram, Youtube } from 'lucide-react';

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full bg-white px-6 py-4 text-white">
			<div className="flex items-center justify-between text-gray-700">
				<p className="text-sm">
					&copy; {currentYear} Atom. All rights reserved.
				</p>
				<div className="flex space-x-4">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
					>
						<Facebook size={20} />
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<Instagram size={20} />
					</a>
					<a
						href="https://youtube.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="YouTube"
					>
						<Youtube size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
