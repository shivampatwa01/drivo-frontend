import { createSlice } from '@reduxjs/toolkit';
import { bookCar, getAllBookings } from '../thunks/bookingThunk';
import toast from 'react-hot-toast'; 


const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookCar.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload); 
        toast.success('Your car booked successfully');
      })
      .addCase(bookCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Something went wrong, please try later');
      })
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//export const { } = bookingSlice.actions;
export default bookingSlice.reducer;
