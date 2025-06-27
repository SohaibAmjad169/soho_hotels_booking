import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import HotelLoop from "./HotelLoop";
import Spinner from "../Spinner/Spinner";
import { RESET_SCROLL } from "../../state/actionType/actionType";

const HotelsGrid = () => {
    const { filtered } = useSelector((state) => state.hotels); 
    const scrollToHotels = useSelector((state) => state.searchScroll.scrollToHotels);  
    const [visibleHotels, setVisibleHotels] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(6); 
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const hotelsGridRef = useRef(null);

    useEffect(() => {
        if (scrollToHotels && hotelsGridRef.current) {
            hotelsGridRef.current.scrollIntoView({ behavior: "smooth" });

            setTimeout(() => {
                dispatch({ type: RESET_SCROLL });
            }, 500);
        }
    }, [scrollToHotels, dispatch]);

    useEffect(() => {
        setLoading(true); // Show loader
        const timeoutId = setTimeout(() => {
            setVisibleHotels(filtered.slice(0, itemsToShow)); // Show initial items
            setLoading(false); // Hide loader
        }, 700);

        return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }, [filtered, itemsToShow]);

    // Handle "Load More" button click
    const handleLoadMore = () => {
        setItemsToShow((prev) => prev + 6); // Increase items to show by 6
    };

    return (
        <div ref={hotelsGridRef} className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <h2 className="text-center mb-8 text-3xl font-bold">Available Rooms</h2>

            {loading ? (
                // Show spinner while loading
                <div className="flex w-full items-center justify-center">
                    <Spinner />
                </div>
            ) : visibleHotels.length === 0 ? (
                // Show message if no hotels are found
                <div className="flex w-full items-center justify-center text-gray-600 text-xl mt-10">
                    No hotels found
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                        {visibleHotels.map((hotel) => (
                            <HotelLoop key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                    {visibleHotels.length < filtered.length && (
                        <button
                            onClick={handleLoadMore}
                            className="mt-6 px-4 py-2 bg-[#b99470] text-white rounded border-2 border-transparent hover:bg-white hover:border-[#b99470] hover:text-[#b99470] block mx-auto"
                        >
                            Load More
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default HotelsGrid;
