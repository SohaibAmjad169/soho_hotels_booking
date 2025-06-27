import React from 'react';
import menuItems from "../../database/menuItem.json";
import iconList from "../../database/iconList.json";

const Footer = () => {
    return (
        <>
            <hr />
            <footer className="bg-gray-800 text-white py-10">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
                    {/* Footer Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
                        {/* Logo */}
                        <div className="text-2xl font-[400] tracking-wider transition-all duration-100 ease-in-out mt-4">
                            Soho Hotel
                        </div>

                        {/* Footer Links */}
                        <div className="space-y-4 md:space-y-0 md:flex md:space-x-8">
                            <ul className="space-y-2 text-center md:text-left">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.url}
                                            className="hover:underline font-light" // Decreased font weight
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-8 justify-center md:justify-start px-6 py-4">
                            {iconList.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    rel="noopener noreferrer"
                                    className="text-white hover:opacity-80  font-[200]"
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.alt}
                                        className="w-6 h-6 "
                                    />
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
