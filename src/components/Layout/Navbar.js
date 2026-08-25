import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import menuItems from "../../database/menuItem.json";
import Header from "./Header";

const Navbar = () => {
    const [isTransparent, setIsTransparent] = useState(true);
    const location = useLocation(); // Get current route location

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname === "/") {
                setIsTransparent(window.scrollY <= 100);
            }
        };

        // Set initial transparency state based on route
        setIsTransparent(location.pathname === "/");

        // Add scroll event listener only on the default route
        if (location.pathname === "/") {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            // Cleanup event listener on route change
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-100 ease-in-out ${
                isTransparent
                    ? "bg-transparent text-white shadow-none"
                    : "bg-white text-gray-800 shadow-lg"
            }`}
        >
            <Header />
            <hr />
            <div className="flex items-center justify-between py-4 px-4 sm:px-[10px] md:px-[10px] lg:px-[60px]">
                {/* Logo */}
                <div className="text-2xl font-[400] tracking-wider transition-all duration-100 ease-in-out">
                    Soho Hotel
                </div>

                {/* Desktop Navbar Menu Items */}
                <div className="hidden md:flex items-center justify-center space-x-6 text-lg font-[200] ml-auto">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.url}
                            className="hover:text-[#cbb198] transition border-b-2 border-transparent hover:border-[#cbb198]"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Navbar Menu Items */}
                <div className="md:hidden">
                    <Menu as="div" className="relative">
                        <Menu.Button className="text-white p-2 rounded-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </Menu.Button>
                        <Menu.Items className="fixed top-[4rem] left-0 w-screen bg-white text-gray-800 shadow-lg z-50">
                            {menuItems.map((item, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <Link
                                            to={item.url}
                                            className={`block px-4 py-2 border-b border-gray-200 text-lg font-normal ${
                                                active ? "bg-gray-100" : ""
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`block w-full bg-[#cbb198] text-white px-6 py-2 text-lg font-[300] hover:bg-[#cbb198]/80 transition ${
                                            active ? "bg-[#cbb198]/80" : ""
                                        }`}
                                    >
                                        Book Now
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
