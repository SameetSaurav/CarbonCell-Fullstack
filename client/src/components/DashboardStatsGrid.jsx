import React, { useEffect, useState } from 'react'
import { BsCurrencyEuro, BsCurrencyPound, BsCurrencyDollar, BsCurrencyBitcoin } from "react-icons/bs";

export default function DashboardStatsGrid() {

	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
		try {
			const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
			const jsonData = await response.json();
			setData(jsonData.bpi);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		};

		fetchData();
	}, []);

	return (
		<>
			<div className="flex gap-1 justify-center md:justify-start ">
				<div className="flex items-center"><BsCurrencyBitcoin/> </div>
				<span>Bitcoin Price world wide</span>

			</div>
			<div className="flex flex-col md:flex-row gap-4">
				<BoxWrapper>
					<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
						<BsCurrencyEuro className="text-2xl text-white" />
					</div>
					<div className="pl-4">
						<span className="text-sm text-gray-500 font-light">{data?.EUR?.description}</span>
						<div className="flex items-center">
							<strong className="text-xl text-gray-700 font-semibold">{data?.EUR?.rate}</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
						<BsCurrencyPound className="text-2xl text-white" />
					</div>
					<div className="pl-4">
						<span className="text-sm text-gray-500 font-light">{data?.GBP?.description}</span>
						<div className="flex items-center">
							<strong className="text-xl text-gray-700 font-semibold">{data?.GBP?.rate}</strong>
						</div>
					</div>
				</BoxWrapper>
				<BoxWrapper>
					<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
						<BsCurrencyDollar className="text-2xl text-white" />
					</div>
					<div className="pl-4">
						<span className="text-sm text-gray-500 font-light">{data?.USD?.description}</span>
						<div className="flex items-center">
							<strong className="text-xl text-gray-700 font-semibold">{data?.USD?.rate}</strong>
						</div>
					</div>
				</BoxWrapper>
			</div>
		</>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
