import React, { useState } from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout, HiMenu } from 'react-icons/hi'
import { GiHamburgerMenu } from "react-icons/gi";
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants'


const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {

	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<div className="md:hidden flex justify-between p-4 bg-neutral-900 ">
				<img className="h-8" src="https://carboncell.io/assets/img/logo2.png" alt="" />
				<button
				className="text-white focus:outline-none"
				onClick={toggleSidebar}
				>
				{/* Hamburger menu icon */}
					<GiHamburgerMenu/>
				</button>
      		</div>

			<div className={`${isOpen ? 'block' : 'hidden'} bg-neutral-900`}>
				<div className="px-2 pt-2 pb-3 space-y-1 ">
					{DASHBOARD_SIDEBAR_LINKS.map((link) => (
						<SidebarLink key={link.key} link={link} />
					))}
        		</div>
			</div>
		
			<div className="hidden md:block ">
				<div className="bg-neutral-900 w-60 p-3 flex flex-col h-screen ">
					<div className="flex gap-2 px-1 py-3 justify-between">
						<img src="https://carboncell.io/assets/img/logo2.png" alt="" />
						
						<button className="lg:hidden block ml-auto mr-4 mt-4 focus:outline-none">
							<svg className="h-6 w-6 fill-current text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0h20v20H0z" fill="none"/>
							<path d="M3 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"/>
							</svg>
						</button>

					</div>
					<div className="py-8 flex flex-1 flex-col gap-0.5">
						{DASHBOARD_SIDEBAR_LINKS.map((link) => (
							<SidebarLink key={link.key} link={link} />
						))}
					</div>
					<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
						{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
							<SidebarLink key={link.key} link={link} />
						))}
						<div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
							<span className="text-xl">
								<HiOutlineLogout />
							</span>
							Logout
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}
		>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}
