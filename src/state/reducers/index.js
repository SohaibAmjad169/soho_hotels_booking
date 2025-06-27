// rootReducer.js
import { combineReducers } from 'redux';
import hotelsReducer from './hotelsReducer';
import getReducer from './getReducer';
import bookingInfo from './bookingInfoReducer';
import searchScrollReducer from './searchScroll';

const rootReducer = combineReducers({
    hotels: hotelsReducer,
    getReducer: getReducer, 
    bookingInfo: bookingInfo,
    searchScroll: searchScrollReducer,
});

export default rootReducer;
