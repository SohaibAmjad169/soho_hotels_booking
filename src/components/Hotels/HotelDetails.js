import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotelById } from '../../state/action-creators/index';
import { useParams, useNavigate } from 'react-router-dom';

const HotelDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { hotel, loading, error } = useSelector(state => state.getReducer);

    useEffect(() => {
        dispatch(fetchHotelById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (hotel && Object.keys(hotel).length > 0) {
            let currentBookingInfo = JSON.parse(localStorage.getItem("currentBookingInfo"));
                // Set up new currentBookingInfo only after hotel data is fully loaded
                window.currentBookingInfo = {
                    bookingDetails: {
                        check_in_date: currentBookingInfo?.bookingDetails?.check_in_date,
                        check_out_date: currentBookingInfo?.bookingDetails?.check_out_date,
                        roomType: hotel.roomType,
                        guest: hotel.roomSeats,
                        hotel: {
                            id: hotel.id,
                            name: hotel.name,
                            address: hotel.address,
                            offer: hotel.offer,
                            price: hotel.price,
                            discount: hotel.discount,
                            serviceFee: 220,
                        },
                    },
                    userDetails: {
                        name: "",
                        email: "",
                        phone: "",
                    },
                    paymentDetails: {
                        price: `${hotel.price}`,
                        discount: `${hotel.discount}`,
                        priceAfterDiscount: `${hotel.price - hotel.discount}` || "",
                    },
                    isFinalPage: false,
                };
                localStorage.setItem("currentBookingInfo", JSON.stringify(window.currentBookingInfo));
        }
    }, [hotel]);

    useEffect(() => {
        let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));

        if (!bookingResults || bookingResults.length === 0) {
            window.bookingResults = [];
            localStorage.setItem("bookingResults", JSON.stringify(window.bookingResults));
        } else {
            window.bookingResults = bookingResults;
        }
    }, [])

    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (hotel && hotel.img.length > 0) {
            setMainImage(hotel.img[0]);
        }
    }, [hotel]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!hotel) {
        return <div className="text-gray-500">Hotel not found</div>;
    }

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const handleBookNowClick = () => {
        // Redirect to checkout page
        history(`/checkout/${id}`);
    };

    return (
        <div className="mt-[120px] px-[60px] py-6">
            <div className="flex space-x-10">
                {/* Left div for the image */}
                <div className="flex-1">
                    <img
                        src={`../../${mainImage}`}
                        alt="himage"
                        className="w-full h-[400px] mb-4 rounded-lg object-cover"
                    />
                    <p className='text-2xl font-semibold mb-4'>Related Images</p>
                    <div className="flex flex-wrap gap-2">
                        {hotel.img.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={`../../${image}`}
                                alt={`hm ${index + 1}`}
                                className="w-[120px] h-[120px] mr-2 mb-2 cursor-pointer rounded-lg transition-all duration-200 hover:border-2 hover:border-gray-800"
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right div for hotel details */}
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">{hotel.name}</h1>
                    <div className="space-y-2">
                        <p className="text-1xl text-gray-700"><strong className="font-semibold text-gray-900">Address:</strong> {hotel.address}</p>
                        <p className="text-1xl text-gray-700"><strong className="font-semibold text-gray-900">Location:</strong> {hotel.place}</p>
                        <p className="text-1xl text-gray-700"><strong className="font-semibold text-gray-900">Offer:</strong> {hotel.offer}</p>
                        <p className="text-1xl text-gray-700"><strong className="font-semibold text-gray-900">Room Type:</strong> {hotel.roomType}</p>
                        <p className="text-1xl text-gray-700"><strong className="font-semibold text-gray-900">Price:</strong> {hotel.price} USD</p>
                        <p className="text-1xl text-gray-700"><strong className="font-semibold text-gray-900">Room Seats:</strong> {hotel.roomSeats}</p>

                        <div className='py-5'>
                            <button
                                className="bg-[#b99470] text-white px-[50px] py-2 text-lg font-[300] hover:bg-[#b99470]/80 transition"
                                onClick={handleBookNowClick} // Add this handler to navigate to checkout
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
