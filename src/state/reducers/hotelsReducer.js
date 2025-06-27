import hotelListData from "../../database/hotelListData.json";

// Load search attempts from localStorage or initialize as an empty array
window.searchAttempts = JSON.parse(localStorage.getItem("searchAttempts")) || [];

const hotelsReducer = (
    state = { filtered: hotelListData, original: hotelListData, roomType: '', guests: '' },
    action
) => {
    switch (action.type) {
        case "searchHotels":
            const { roomType, guests } = action.payload;

            // Filter hotels based on search criteria
            const filteredHotels = state.original.filter((hotel) => {
                // Filter by room type
                if (roomType && hotel.roomType.toLowerCase() !== roomType.toLowerCase()) {
                    return false;
                }

                // Filter by guests
                if (guests && parseInt(guests) !== hotel.roomSeats) {
                    return false;
                }

                return true;
            });

            return {
                ...state,
                filtered: filteredHotels,
                roomType,
                guests,
            };

        case "resetSearch":
            return {
                ...state,
                filtered: state.original,
                roomType: '',
                guests: '',
            };

        default:
            return state;
    }
};

export default hotelsReducer;
