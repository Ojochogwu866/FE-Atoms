import { Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface FileUploadProps {
	onFileSelect: (file: File) => void;
	acceptedFileTypes?: string;
	maxFileSizeInBytes?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
	onFileSelect,
	acceptedFileTypes = 'image/*',
	maxFileSizeInBytes = 5 * 1024 * 1024, // 5MB
}) => {
	const [dragActive, setDragActive] = useState(false);
	const [fileName, setFileName] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFiles(e.dataTransfer.files[0]);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			handleFiles(e.target.files[0]);
		}
	};

	const handleFiles = (file: File) => {
		setError(null);
		if (!file.type.match(acceptedFileTypes)) {
			setError('File type not accepted');
			return;
		}
		if (file.size > maxFileSizeInBytes) {
			setError('File size too large');
			return;
		}
		setFileName(file.name);
		onFileSelect(file);
	};

	const onButtonClick = () => {
		inputRef.current?.click();
	};

	return (
		<div className="flex w-full items-center justify-center">
			<label
				htmlFor="dropzone-file"
				className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 ${
					dragActive ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-100'
				}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				<div className="flex flex-col items-center justify-center pb-6 pt-5">
					<Upload className="mb-3 h-10 w-10 text-gray-400" />
					<p className="mb-2 text-sm text-gray-500">
						<span className="font-semibold">Click to upload</span> or drag and
						drop
					</p>
					<p className="text-xs text-gray-500">
						{acceptedFileTypes.replace('/*', ' files')} (Max size:{' '}
						{maxFileSizeInBytes / (1024 * 1024)}MB)
					</p>
				</div>
				<input
					ref={inputRef}
					id="dropzone-file"
					type="file"
					className="hidden"
					accept={acceptedFileTypes}
					onChange={handleChange}
				/>
			</label>
			{fileName && (
				<div className="mt-2 flex items-center">
					<span className="text-sm text-gray-500">{fileName}</span>
					<button
						onClick={() => {
							setFileName(null);
							if (inputRef.current) inputRef.current.value = '';
						}}
						className="ml-2 text-red-500 hover:text-red-700"
					>
						<X size={16} />
					</button>
				</div>
			)}
			{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
		</div>
	);
};

export default FileUpload;
