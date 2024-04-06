import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TransactionChart() {

	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
		try {
			const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
			const jsonData = await response.json();
			setData(jsonData.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		};

		fetchData();
	}, []);

	return (
		<div className="h-[22rem]  bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">United States Population in recent years</strong>
			<div className="mt-3 w-full flex-1 text-xs ">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="ID Year" />
						<YAxis domain={[311536594, 'auto']} dataKey="Population" />
						<Tooltip />
						<Legend />
						<Bar dataKey="Population" fill="#0ea5e9" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
