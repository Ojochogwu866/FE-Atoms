import React, { useState } from 'react';

interface Tab {
	id: string;
	label: string;
	content: React.ReactNode;
}

interface TabsProps {
	tabs: Tab[];
	className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, className = '' }) => {
	const [activeTab, setActiveTab] = useState(tabs[0].id);

	return (
		<div className={className}>
			<div className="border-b border-gray-200">
				<nav className="-mb-px flex space-x-8" aria-label="Tabs">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
								activeTab === tab.id
									? 'border-blue-500 text-blue-600'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
							} `}
						>
							{tab.label}
						</button>
					))}
				</nav>
			</div>
			<div className="mt-4">
				{tabs.find((tab) => tab.id === activeTab)?.content}
			</div>
		</div>
	);
};

export default Tabs;
