import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import Button from './reusable/button';

const AppHeader = () => {
	const [showMenu, setShowMenu] = useState(false);
	
	function toggleMenu() {
		if (!showMenu) {
			setShowMenu(true);
		} else {
			setShowMenu(false);
		}
	}

	return (
        
		<motion.nav
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			id="nav"
			className="primary-color "
		>
			
			<div className="flex justify-between items-center px-4 sm:px-0">
					<div>
						<Link to="/"
						className='w-auto'
						aria-label='Product'>
						</Link>
					</div>

					{/* Small screen hamburger menu */}
					<div className="sm:hidden">
						<button
							onClick={toggleMenu}
							type="button"
							className="focus:outline-none"
							aria-label="Hamburger Menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="h-7 w-7 fill-current secondary-color t"
							>
								{showMenu ? (
									<CloseIcon className="text-3xl" />
								) : (
									<MenuIcon className="text-3xl" />
								)}
							</svg>
						</button>
					</div>
				</div>

			{/* Header links small screen */}
            <div className='sm:hidden'>
			<div
				className={
					showMenu
						? 'block m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex  sm:p-0 justify-center items-center shadow-lg sm:shadow-none'
						: 'hidden'
				}
				>
					<Link
					to="/partners" 
					className="block text-left text-lg secondary-color  hover:text-white   sm:mx-4 mb-2 sm:py-2"
					aria-label="Our Partners offer"
				>
					Our Partners offer
				</Link>
				<Link
					to="/become-a-partner"
					className="block text-left text-lg   sm:mx-4 mb-2 sm:py-2 secondary-color  hover:text-white border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light "
					aria-label="Become a Partner"
				>
					Become a Partner
				</Link>
                <Link
					to="/pricing" 
					className="block text-left text-lg  secondary-color hover:text-white  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light "
					aria-label="Contact"
				>
					View Memberships
				</Link>
				<Link
					to="/about" 
					className="block text-left text-lg  secondary-color  hover:text-white  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light "
					aria-label="About"
				>
					About Us
				</Link>
				<div className="border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light ">
					<Link to="/auth">
						<span className="font-medium sm:hidden block text-left secondary-color text-md bg-green-700 hover:bg-white hover:text-white  hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 shadow-sm rounded-sm px-4 py-2 mt-2 w-24" aria-label="Book a Call">
							<Button title="Sign Up / Login" />
						</span>
					</Link>
				</div>
			</div>
            </div>
			{/* Header links large screen */}
			<div className="font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex  sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
			<Link to="/">
            <img src="https://i.ibb.co/54X6HCp/to-edit.jpg" alt="to-edit" border="0" className="mr-4 logo" />
			</Link>
			<Link
					to="/partners"
					className="block text-left text-lg font-semibold secondary-color text-primary-dark  hover:text-white   sm:mx-4 mb-2 sm:py-2"
					aria-label="partners"
				>
					Our Partners Offer
				</Link>
				<Link
					to="/become-a-partner"
					className="block text-left text-lg font-semibold secondary-color text-primary-dark   hover:text-white   sm:mx-4 mb-2 sm:py-2"
					aria-label="Become a partner"
				>
					Become a Partner
				</Link>
				<Link
					to="/pricing" 
					className="block text-left text-lg  secondary-color font-semibold  hover:text-white  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light "
					aria-label="Pricing"
				>
					View Memberships
				</Link>
				<Link
					to="/about"
					className="block text-left text-lg secondary-color font-semibold text-primary-dark   hover:text-white   sm:mx-4 mb-2 sm:py-2"
					aria-label="About"
				>
					About Us
				</Link>
				
				
			
				{/* Header right section buttons */}

				<div className="hidden sm:flex justify-end items-center md:flex-row ml-auto">
						<Link to="/auth"> 
							<span
								className="block w-full rounded bg-white text-sm mr-20 font-medium text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring active:bg-white sm:w-auto px-5 py-2.5 duration-300 "
								aria-label="Sing in"
							>
								<Button title="Sing In / Log in "/>
							</span>
						</Link>

				</div>
				</div>
		</motion.nav>
        
	);
};

export default AppHeader;


