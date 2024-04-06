import React from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import EthereumBalance from '../components/EthereumBalance.jsx'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-col md:flex-row gap-4 w-full ">
				<TransactionChart />
			</div>
		</div>
	)
}
