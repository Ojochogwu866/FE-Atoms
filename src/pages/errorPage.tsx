import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	let errorMessage: string;

	if (isRouteErrorResponse(error)) {
		errorMessage =
			(error as { error?: { message: string }; statusText: string }).error
				?.message || error.statusText;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		console.error('Unable to identify error type:', error);
		errorMessage = 'Unknown error occurred';
	}

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{errorMessage}</i>
			</p>
		</div>
	);
}
