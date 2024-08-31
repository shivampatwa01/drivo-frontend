import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slice/carSlice.js';
import bookingReducer from './slice/bookingSlice.js';

const store = configureStore({
    reducer: {
        bookings: bookingReducer,
        cars: carReducer,
    },
});

export default store;