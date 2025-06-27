import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelById, setCurrentBookingInfo, addBookingResult } from "../state/action-creators/index";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel, TextField, Button, Typography, Paper, Modal, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Checkout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { hotel, loading, error } = useSelector((state) => state.getReducer);
    const [step, setStep] = useState(() => {
        return parseInt(localStorage.getItem("currentStep")) || 0;
    });

    const [personalInfo, setPersonalInfo] = useState(() => {
        return JSON.parse(localStorage.getItem("personalInfo")) || { name: "", email: "", phone: "" };
    });

    const [dates, setDates] = useState(() => {
        const storedData = JSON.parse(localStorage.getItem("currentBookingInfo"));
        console.log(storedData)
        return {
            checkInDate: storedData?.bookingDetails?.check_in_date || "01-01-2024",
            checkOutDate: storedData?.bookingDetails?.check_out_date || "05-01-2024",
        };
    });

    const [selectedImage, setSelectedImage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchHotelById(id));
    }, [dispatch, id]);

    useEffect(() => {
        let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));

        if (!bookingResults || bookingResults.length === 0) {
            window.bookingResults = [];
            localStorage.setItem("bookingResults", JSON.stringify(window.bookingResults));
        } else {
            window.bookingResults = bookingResults;
        }
    }, [])

    useEffect(() => {
        if (hotel && Object.keys(hotel).length > 0) {
            let currentBookingInfo = JSON.parse(localStorage.getItem("currentBookingInfo"));
            const checkInDate = currentBookingInfo?.bookingDetails?.check_in_date || "01-01-2024";
            const checkOutDate = currentBookingInfo?.bookingDetails?.check_out_date || "05-01-2024";

            // Update state to force re-render with correct values
            setDates({ checkInDate, checkOutDate });

            if (!currentBookingInfo || currentBookingInfo === undefined || currentBookingInfo.length === 0) {
                window.currentBookingInfo = {
                    bookingDetails: {
                        check_in_date: "01-01-2024",
                        check_out_date: "05-01-2024",
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
                };
            } else {
                window.currentBookingInfo = currentBookingInfo;
            }
            localStorage.setItem("currentBookingInfo", JSON.stringify(window.currentBookingInfo));
        }
    }, [hotel,step]);

    useEffect(() => {
        if (hotel?.img && hotel?.img.length > 0) {
            setSelectedImage(hotel?.img[0]);
        }
    }, [hotel]);

    useEffect(() => {
        if (step >= 1) {
            const bookingId = `ee34476d-a194-42f7-${hotel?.id}-d574b1915545`;
            const discount = hotel?.discount;
            window.currentBookingInfo = {
                bookingDetails: {
                    booking_id: bookingId,
                    check_in_date: dates.checkInDate,
                    check_out_date: dates.checkOutDate,
                    roomType: hotel?.roomType,
                    guest: hotel?.roomSeats,
                    hotel: {
                        id: hotel?.id,
                        name: hotel?.name,
                        address: hotel?.address,
                        offer: hotel?.offer,
                        price: hotel?.price || "",
                        discount: hotel?.discount,
                        serviceFee: 220,
                    },
                },
                userDetails: {
                    name: personalInfo.name,
                    email: personalInfo.email,
                    phone: personalInfo.phone,
                },
                paymentDetails: {
                    price: hotel?.price,
                    discount: hotel?.discount,
                    priceAfterDiscount: hotel?.price - hotel?.discount || "",
                },
                isInFinalPage: step === 3,
            };
            dispatch(setCurrentBookingInfo(window.currentBookingInfo));
        }
    }, [step, personalInfo, dates, hotel]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleNext = () => {
        if (step === 1) {
            if (!(personalInfo.name && personalInfo.email && personalInfo.phone)) {
                toast.error("Please fill all fields.");
                return;
            }
            if (!emailRegex.test(personalInfo.email)) {
                toast.error("Please enter a valid email ");
                return;
            }
            localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
        }

        if (step === 2) {
            if (!(dates.checkInDate && dates.checkOutDate)) {
                toast.error("Please fill check-in and check-out dates.");
                return;
            }

            // Ensure dates are stored properly before moving to the next step
            window.currentBookingInfo.bookingDetails.check_in_date = dates.checkInDate;
            window.currentBookingInfo.bookingDetails.check_out_date = dates.checkOutDate;
            localStorage.setItem("currentBookingInfo", JSON.stringify(window.currentBookingInfo));
        }

        const newStep = step + 1;
        setStep(newStep);
        localStorage.setItem("currentStep", newStep);
    };


    const handlePrev = () => {
        const newStep = step - 1;
        setStep(newStep);
        localStorage.setItem("currentStep", newStep);
    };

    const handleSubmit = () => {
        const discount = hotel?.price ? hotel.price * 0.35 : 0;
        const bookingId = `ee34476d-a194-42f7-${hotel?.id}-d574b1915545`;

        let storedBookingResults = JSON.parse(localStorage.getItem("bookingResults")) || [];

        const info = {
            bookingDetails: {
                booking_id: bookingId,
                check_in_date: dates.checkInDate,
                check_out_date: dates.checkOutDate,
                roomType: hotel?.roomType,
                guest: hotel?.roomSeats,
                hotel: {
                    id: hotel?.id,
                    name: hotel?.name,
                    address: hotel?.address,
                    offer: hotel?.offer,
                    price: hotel?.price || "",
                    discount: hotel?.discount,
                    serviceFee: 220,
                },
            },
            userDetails: {
                name: personalInfo.name,
                email: personalInfo.email,
                phone: personalInfo.phone,
            },
            paymentDetails: {
                price: `${hotel.price}`,
                discount: `${hotel.discount}`,
                priceAfterDiscount: `${hotel.price - hotel.discount}` || "",
            },
        };

        storedBookingResults.push(info);
        localStorage.setItem("bookingResults", JSON.stringify(storedBookingResults));
        window.bookingResults = storedBookingResults;

        dispatch(addBookingResult(info));
        setShowPopup(true);
    };

    const resetBooking = () => {
        setPersonalInfo({ name: "", email: "", phone: "" });
        setDates({ checkInDate: "01-01-2024", checkOutDate: "05-01-2024" });
        setSelectedImage(hotel?.img[0] || "");
        setStep(1);
        setShowPopup(false);
        window.currentBookingInfo = {}
        localStorage.removeItem("currentBookingInfo");
        localStorage.removeItem("personalInfo");
        localStorage.removeItem("currentStep")
        dispatch(setCurrentBookingInfo(null));
    };
    const navigate = useNavigate()
    const handleMoveToHome = () => {
        resetBooking();
        navigate("/");
        window.location.reload();
    };

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        const updatedPersonalInfo = { ...personalInfo, [name]: value };

        setPersonalInfo(updatedPersonalInfo);
        localStorage.setItem("personalInfo", JSON.stringify(updatedPersonalInfo));
    };


    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDates((prevDates) => ({
            ...prevDates,
            [name]: value,
        }));

        // Update global variable
        window.currentBookingInfo.bookingDetails = {
            ...window.currentBookingInfo.bookingDetails,
            [name]: formatDateString(value),
        };
        localStorage.setItem("currentBookingInfo", JSON.stringify(window.currentBookingInfo));
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!hotel) {
        return <div className="text-gray-500">Hotel not found</div>;
    }

    return (
        <>
            <Toaster />
            <div className="flex lg:flex-row md:flex-col flex-col mt-[120px] px-[60px] py-6">
                {/* Left Half for Images */}
                <div className="flex-1 space-y-4">
                    <img src={`../../${selectedImage}`} alt="Hotel" className="w-full h-[400px] mb-4 rounded-lg object-cover" />
                    <Typography variant="h6" className="text-xl font-semibold mb-4">
                        Related Images
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                        {hotel.img.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={`../../${image}`}
                                alt={`hm ${index + 1}`}
                                className="w-[120px] h-[120px] mr-2 mb-2 cursor-pointer rounded-lg transition-all duration-200 hover:border-2 hover:border-gray-800"
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Half for Booking Form */}
                <div className="flex-1 lg:px-10 md:px-6 sm:px-4 py-8 space-y-4 relative">
                    <Typography variant="h4" className="font-bold mb-4">
                        Booking for {hotel.name}
                    </Typography>

                    {/* Stepper */}
                    <div className="py-2">
                        <Stepper
                            activeStep={step}
                            alternativeLabel
                            sx={{
                                marginLeft: "-58px",
                            }}
                        >
                            <Step completed={step > 0} sx={{ "& .MuiStepIcon-root": { fill: step >= 0 ? "#b99470" : "" } }}>
                                <StepLabel>Room</StepLabel>
                            </Step>
                            <Step completed={step > 1} sx={{ "& .MuiStepIcon-root": { fill: step >= 1 ? "#b99470" : "" } }}>
                                <StepLabel>Personal</StepLabel>
                            </Step>
                            <Step completed={step > 2} sx={{ "& .MuiStepIcon-root": { fill: step >= 2 ? "#b99470" : "" } }}>
                                <StepLabel>Dates</StepLabel>
                            </Step>
                            <Step completed={step > 3} sx={{ "& .MuiStepIcon-root": { fill: step >= 3 ? "#b99470" : "" } }}>
                                <StepLabel>Complete</StepLabel>
                            </Step>
                        </Stepper>
                    </div>

                    {/* Step Content */}
                    {step === 0 && (
                        <Paper className="p-4 shadow-lg rounded-lg">
                            <Typography variant="h6">Hotel Details</Typography>
                            <div className="space-y-2 mt-4">
                                <Typography>
                                    <strong>Address:</strong> {hotel.address}
                                </Typography>
                                <Typography>
                                    <strong>Location:</strong> {hotel.place}
                                </Typography>
                                <Typography>
                                    <strong>Offer:</strong> {hotel.offer}
                                </Typography>
                                <Typography>
                                    <strong>Room Details:</strong> {hotel.roomDetails.join(", ")}
                                </Typography>
                                <Typography>
                                    <strong>Price:</strong> {hotel.price} USD
                                </Typography>
                                <Typography>
                                    <strong>Room Seats:</strong> {hotel.roomSeats}
                                </Typography>
                            </div>
                        </Paper>
                    )}

                    {step === 1 && (
                        <Paper className="p-4 shadow-lg rounded-lg">
                            <Typography variant="h6">Personal Information</Typography>
                            <div className="space-y-2 mt-4">
                                <TextField
                                    label="Your Name"
                                    name="name"
                                    value={personalInfo.name}
                                    onChange={handlePersonalInfoChange}
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    autoComplete="off"
                                />
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    value={personalInfo.email}
                                    onChange={handlePersonalInfoChange}
                                    variant="outlined"
                                    fullWidth
                                    className="mb-2"
                                    autoComplete="off"
                                />
                                <TextField
                                    label="Phone Number"
                                    name="phone"
                                    value={personalInfo.phone}
                                    onChange={handlePersonalInfoChange}
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                />
                            </div>
                        </Paper>
                    )}

                    {step === 2 && (
                        <Paper className="p-4 shadow-lg rounded-lg">
                            <Typography variant="h6" className="text-lg font-semibold text-gray-700">
                                Booking Dates
                            </Typography>
                            <div className="space-y-4 mt-4">
                                {/* Check-In Date */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Check-In Date:</label>
                                        <DatePicker
                                            format="DD-MM-YYYY"
                                            value={dayjs(dates.checkInDate, "DD-MM-YYYY")}
                                            onChange={(newValue) => {
                                                const formattedDate = dayjs(newValue).format("DD-MM-YYYY");
                                                setDates((prevDates) => ({ ...prevDates, checkInDate: formattedDate }));
                                                localStorage.setItem("bookingDates", JSON.stringify({ ...dates, checkInDate: formattedDate }));
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </div>
                                </LocalizationProvider>

                                {/* Check-Out Date */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Check-Out Date:</label>
                                        <DatePicker
                                            format="DD-MM-YYYY"
                                            value={dayjs(dates.checkOutDate, "DD-MM-YYYY")}
                                            onChange={(newValue) => {
                                                const formattedDate = dayjs(newValue).format("DD-MM-YYYY");
                                                setDates((prevDates) => ({ ...prevDates, checkOutDate: formattedDate }));
                                                localStorage.setItem("bookingDates", JSON.stringify({ ...dates, checkOutDate: formattedDate }));
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </div>
                                </LocalizationProvider>

                            </div>
                        </Paper>
                    )}

                    {step === 3 && (
                        <Paper className="p-4 shadow-lg rounded-lg">
                            <Typography variant="h6">Review Your Data</Typography>
                            <div className="space-y-2 mt-4">
                                <Typography>
                                    <strong>Name:</strong> {personalInfo.name}
                                </Typography>
                                <Typography>
                                    <strong>Email:</strong> {personalInfo.email}
                                </Typography>
                                <Typography>
                                    <strong>Phone:</strong> {personalInfo.phone}
                                </Typography>
                                <Typography>
                                    <strong>Check-In Date:</strong> {dates.checkInDate}
                                </Typography>
                                <Typography>
                                    <strong>Check-Out Date:</strong> {dates.checkOutDate}
                                </Typography>
                            </div>
                            <Typography className="mt-4">
                                Please review your details before submitting the booking.
                            </Typography>
                        </Paper>
                    )}

                    {/* Buttons */}
                    <div className="flex space-x-4 mt-4">
                        {step > 0 && (
                            <Button variant="contained" onClick={handlePrev} sx={{ backgroundColor: "#b99470" }}>
                                Back
                            </Button>
                        )}
                        {step < 3 && (
                            <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: "#b99470" }}>
                                Next
                            </Button>
                        )}
                        {step === 3 && (
                            <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#b99470" }}>
                                Submit
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal for Success */}
            <Modal
                open={showPopup}
                onClose={resetBooking}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        padding: "30px",
                        borderRadius: "15px",
                        textAlign: "center",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        width: "400px",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "10px", color: "#b99470" }}>
                        Thank You!
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                        Your booking has been completed successfully!
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "30px", color: "#757575" }}>
                        We look forward to hosting you.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#b99470",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "5px",
                        }}
                        onClick={handleMoveToHome}
                    >
                        Move to Home
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Checkout;