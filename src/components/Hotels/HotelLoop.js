import React from "react";
import { RiUser2Fill } from "react-icons/ri";
import { MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";

const HotelLoop = ({ hotel }) => {    
    return (
        <div className="rounded overflow-hidden shadow-lg">
            <div className="relative">
                <Link
                    to={{
                        pathname: `/hotel/${hotel.id}/${encodeURIComponent(hotel.name)}`,
                        state: { hotel } // Passing the hotel data via state
                    }}
                >
                    <img
                        className="w-full h-64 object-cover"
                        src={hotel.img[0]}
                        alt="Hotel preview"
                    />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                </Link>
                <Link
                    to={{
                        pathname: `/hotel/${hotel.id}/${encodeURIComponent(hotel.name)}`,
                        state: { hotel } // Passing the hotel data via state
                    }}
                >
                    <div className="text-sm absolute top-0 right-0 bg-[#b99470] px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-[#b99470] transition duration-500 ease-in-out">
                        <span className="font-bold">{hotel.price}</span>
                        <small>USD</small>
                    </div>
                </Link>
            </div>
            <div className="px-6 py-4">
                <Link
                    to={{
                        pathname: `/hotel/${hotel.id}/${encodeURIComponent(hotel.name)}`,
                        state: { hotel } // Passing the hotel data via state
                    }}
                    className="font-semibold text-lg inline-block hover:text-[#b99470] transition duration-500 ease-in-out"
                >
                    {hotel.name}
                </Link>
                <p className="text-gray-500 text-sm">{hotel.address}</p>
            </div>
            <hr />
            <div className="px-6 py-4 flex flex-row items-center justify-between">
                <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <RiUser2Fill className="text-xl" />
                    <span className="ml-1">{hotel.roomSeats} Guest</span>
                </span>
                <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <MdExitToApp className="text-xl" />
                    <span className="ml-1">{hotel.roomType}</span>
                </span>
            </div>
        </div>
    );
};

export default HotelLoop;
