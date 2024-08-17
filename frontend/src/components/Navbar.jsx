import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // You can use any icon library or SVG for the menu icon

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Full Navigation for Large Screens */}
            <nav className="bg-blue-500 lg:p-3 hidden lg:block p-1 w-full text-white">
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">Home</Link></li>
                    <li><Link to="/new-Customer" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">New Customer</Link></li>
                    <li><Link to="/all-receipts" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">All Customer</Link></li>
                    <li><Link to="/search-by-mobile" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">Search</Link></li>
                    <li><Link to="/pending" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">Pending</Link></li>
                </ul>
            </nav>

            {/* Dropdown for Small Screens */}
            <nav className="bg-blue-500 lg:hidden p-3 text-white w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">Menu</h1>
                    <button onClick={toggleDropdown} className="text-white focus:outline-none">
                        <FaBars size={24} />
                    </button>
                </div>
                {isOpen && (
                    <ul className="flex flex-col space-y-2 mt-2">
                        <li><Link onClick={toggleDropdown} to="/" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">Home</Link></li>
                        <li><Link onClick={toggleDropdown} to="/new-Customer" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">New Customer</Link></li>
                        <li><Link onClick={toggleDropdown} to="/all-receipts" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">All Customer</Link></li>
                        <li><Link onClick={toggleDropdown} to="/search-by-mobile" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">Search</Link></li>
                        <li><Link onClick={toggleDropdown} to="/pending" className="hover:underline hover:bg-slate-100 duration-200 px-2 py-1 rounded-md hover:text-black">Pending</Link></li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default Navigation;
