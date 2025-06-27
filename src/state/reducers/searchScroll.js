import { SCROLL_TO_HOTELS, RESET_SCROLL, SET_CURRENT_BOOKING_INFO, ADD_BOOKING_RESULT } from "../actionType/actionType";

const initialState = {
    hotels: [],
    filtered: [],
    scrollToHotels: false, // Ensure this is defined
};

const searchScrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case SCROLL_TO_HOTELS:
            return {
                ...state,
                scrollToHotels: true, 
            };
        case RESET_SCROLL:
            return {
                ...state,
                scrollToHotels: false,
            };
        default:
            return state;
    }
};

export default searchScrollReducer;
