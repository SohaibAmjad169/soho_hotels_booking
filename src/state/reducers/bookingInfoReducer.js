import { SET_CURRENT_BOOKING_INFO, ADD_BOOKING_RESULT } from "../actionType/actionType";

const initialState = {
    hotel: null,
    loading: false,
    error: null,
    bookingResults: [],
    currentBookingInfo: null,
};

if (!window.bookingResults) {
    window.bookingResults = JSON.parse(localStorage.getItem("bookingResults")) || [];
}

if (!window.currentBookingInfo) {
    window.currentBookingInfo = JSON.parse(localStorage.getItem("currentBookingInfo"));
}

const bookingInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_BOOKING_INFO: {
            const updatedStateForCurrentBookingInfo = {
                ...state,
                currentBookingInfo: action.payload,
            };

            localStorage.setItem("currentBookingInfo", JSON.stringify(action.payload));

            return updatedStateForCurrentBookingInfo;
        }

        case ADD_BOOKING_RESULT: {
            let storedBookingResults = JSON.parse(localStorage.getItem("bookingResults"));

            if (!Array.isArray(storedBookingResults)) {
                storedBookingResults = [];
            }

            // Remove isInFinalPage from currentBookingInfo
            // const { isInFinalPage, ...bookingDataWithoutIsInFinalPage } = state.currentBookingInfo || {};

            // Add the modified booking data to the results
            // const updatedBookingResults = [...storedBookingResults, bookingDataWithoutIsInFinalPage];

            // localStorage.setItem("bookingResults", JSON.stringify(updatedBookingResults));

            return {
                ...state,
                // bookingResults: updatedBookingResults,
            };
        }

        default:
            return state;
    }
};

export default bookingInfo;

