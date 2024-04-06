import {
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineHome,
	HiOutlineOfficeBuilding,
} from 'react-icons/hi'
import { GiSandsOfTime } from "react-icons/gi";
import { PiWallet } from "react-icons/pi";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Home',
		path: '/',
		icon: <HiOutlineHome />
	},
	{
		key: 'Api',
		label: 'Api',
		path: '/api',
		icon: <HiOutlineOfficeBuilding />
	},
	{
		key: 'wallet',
		label: 'Ethereum Balance',
		path: '/wallet',
		icon: <PiWallet />
	},
	{
		key: 'assets',
		label: 'Assets',
		path: '/assets',
		icon: <HiOutlineCube />
	},
	{
		key: 'trade',
		label: 'Trade',
		path: '/trade',
		icon:
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
	  		</svg>
	  
	},
	{
		key: 'history',
		label: 'History',
		path: '/history',
		icon: <GiSandsOfTime />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
