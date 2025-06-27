import {  FETCH_HOTEL_BY_ID_SUCCESS, FETCH_HOTEL_BY_ID_FAILURE } from '../actionType/actionType';

const initialState = {
    hotel: null,
    error: null,
    loading: false
};

const getReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOTEL_BY_ID_SUCCESS:
            return {
                ...state,
                hotel: action.payload,
                loading: false,
                error: null
            };
        case FETCH_HOTEL_BY_ID_FAILURE:
            return {
                ...state,
                hotel: null,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default getReducer;
