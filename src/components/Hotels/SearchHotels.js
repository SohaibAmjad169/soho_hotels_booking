import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS
import "react-date-range/dist/theme/default.css"; // Theme CSS

const roomTypes = [
    "Economy",
    "Luxury",
    "Standard",
    "Deluxe",
    "Superior",
    "Premium",
    "Business",
    "Family",
    "Studio",
    "Suite",
    "Junior Suite",
    "Penthouse",
    "Presidential Suite",
    "Executive",
    "Bungalow",
    "Cabana",
    "Loft",
    "Villa",
    "Chalet",
    "Dormitory",
    "Accessible",
    "Garden View",
    "Sea View",
    "Mountain View",
    "City View",
];

// Helper function to format date in "dd-MM-yyyy" format
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const SearchHotels = () => {
    const [bookingDetails, setBookingDetails] = useState({
        roomType: "",
        guests: "",
    });

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-05"),
            key: "selection",
        },
    ]);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const dispatch = useDispatch();
    const { searchHotels, scrollToHotelsGrid } = bindActionCreators(actionCreators, dispatch);

    const guests = ["2", "3", "4", "5"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        searchHotels({
            ...bookingDetails,
            fromDate: formatDate(dateRange[0].startDate),
            toDate: formatDate(dateRange[0].endDate),
        });
        scrollToHotelsGrid();
    };

    useEffect(() => {
        window.currentBookingInfo = {
            bookingDetails: {
                check_in_date: formatDate(dateRange[0].startDate),
                check_out_date: formatDate(dateRange[0].endDate),
                roomType: bookingDetails.roomType || "",
                guest: bookingDetails.guests || "",
                hotel: {
                    id: "",
                    name: "",
                    address: "",
                    offer: "",
                    price: "",
                    discount: "",
                    serviceFee: "",
                },
            },
            userDetails: {
                name: "",
                email: "",
                phone: "",
            },
            paymentDetails: {
                price: "",
                discount: "",
                priceAfterDiscount: "",
            },
            isFinalPage: false,
        };
        localStorage.setItem("currentBookingInfo", JSON.stringify(window.currentBookingInfo));

        let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));

        if (!bookingResults || bookingResults.length === 0) {
            window.bookingResults = [];
            localStorage.setItem("bookingResults", JSON.stringify(window.bookingResults));
        } else {
            window.bookingResults = bookingResults;
        }
    }, [dateRange, bookingDetails]);


    return (
        <div className="w-full flex flex-col sm:flex-col md:flex-row md:space-x-4 bg-white text-black items-center">
            {/* Guests Select */}
            <div className="w-full sm:w-full md:w-1/3 flex flex-col items-start lg:ps-4 lg:p-0 md:p-0 md:ps-4 p-4">
                <label className="text-black font-[400]">Guests</label>
                <select
                    name="guests"
                    value={bookingDetails.guests}
                    onChange={handleInputChange}
                    className="p-3 w-full border border-[#b99470] shadow-lg focus:outline-none focus:ring-2"
                >
                    <option value="">Select guests</option>
                    {guests.map((guest, index) => (
                        <option key={index} value={guest}>
                            {guest} Guest{guest > 1 ? "s" : ""}
                        </option>
                    ))}
                </select>
            </div>

            {/* Room Type Select */}
            <div className="w-full sm:w-full md:w-1/3 flex flex-col items-start lg:p-0 md:p-0 p-4">
                <label className="text-black font-[400]">Room Type</label>
                <select
                    name="roomType"
                    value={bookingDetails.roomType}
                    onChange={handleInputChange}
                    className="p-3 w-full border border-[#b99470] shadow-lg focus:outline-none focus:ring-2"
                >
                    <option value="">Room Type</option>
                    {roomTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date Range Picker */}
            <div className="w-full sm:w-full md:w-1/2 flex flex-col items-start lg:p-0 md:p-0 p-4">
                <label className="text-black font-[400]">Check in - Check out</label>
                <div className="relative w-full">
                    <input
                        type="text"
                        value={`${formatDate(dateRange[0].startDate)} - ${formatDate(dateRange[0].endDate)}`} 
                        readOnly
                        onClick={() => setShowDatePicker((prev) => !prev)}
                        className={`p-3 w-full border border-[#b99470] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#b99470] cursor-pointer bg-white`}
                    />

                    {showDatePicker && (
                        <div
                            className="absolute top-full left-0 bg-white shadow-lg p-4"
                            style={{ zIndex: 9999 }}
                        >
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => {
                                    setDateRange([item.selection]); 
                                    setShowDatePicker(false);
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                rangeColors={["#b99470"]}
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Search Button */}
            <div className="w-full sm:w-full md:w-1/3 h-full">
                <button
                    className="bg-[#b99470] hover:bg-[#b99470] px-7 py-14 w-full text-lg text-white flex-grow"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchHotels;
