import { FETCH_HOTEL_BY_ID_REQUEST, FETCH_HOTEL_BY_ID_SUCCESS, FETCH_HOTEL_BY_ID_FAILURE, SET_CURRENT_BOOKING_INFO, ADD_BOOKING_RESULT,SCROLL_TO_HOTELS, RESET_SCROLL } from '../actionType/actionType';

export const searchHotels = (searchQuery = {}) => {
  return (dispatch) => {
    dispatch({
      type: 'searchHotels',
      payload: searchQuery
    })
  }
}

export const fetchHotelById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_HOTEL_BY_ID_REQUEST });

  try {
    const response = await fetch('/hotelListData.json');
    const data = await response.json();

    if (Array.isArray(data)) {      
      const hotel = data.find(hotel => hotel.id == id);

      if (hotel) {
        dispatch({
          type: FETCH_HOTEL_BY_ID_SUCCESS,
          payload: hotel,
        });
      } else {
        throw new Error('Hotel not found');
      }
    } else {
      throw new Error('Invalid data format, expected an array of hotels.');
    }
  } catch (error) {
    console.error("Error fetching hotel:", error);
    dispatch({
      type: FETCH_HOTEL_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};



export const setCurrentBookingInfo = (info) => ({
    type: SET_CURRENT_BOOKING_INFO,
    payload: info,
});

export const addBookingResult = (result) => {
  return {
      type: ADD_BOOKING_RESULT,
      payload: result,
  };
};


export const scrollToHotelsGrid = () => {
  return (dispatch) => {
      dispatch({
          type: SCROLL_TO_HOTELS,
      });
  };
};

export const resetScroll = () => {
  return (dispatch) => {
      dispatch({
          type: RESET_SCROLL,
      });
  };
};
