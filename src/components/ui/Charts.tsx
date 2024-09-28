import React from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

interface DataPoint {
	[key: string]: string | number;
}

interface ChartProps {
	data: DataPoint[];
	xDataKey: string;
	yDataKeys: string[];
	colors?: string[];
}

const Chart: React.FC<ChartProps> = ({
	data,
	xDataKey,
	yDataKeys,
	colors = ['#8884d8', '#82ca9d', '#ffc658'],
}) => {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={xDataKey} />
				<YAxis />
				<Tooltip />
				<Legend />
				{yDataKeys.map((key, index) => (
					<Line
						key={key}
						type="monotone"
						dataKey={key}
						stroke={colors[index % colors.length]}
						activeDot={{ r: 8 }}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Chart;
