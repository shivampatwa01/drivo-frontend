import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for booking a car
export const bookCar = createAsyncThunk('bookings/bookCar', async (reqObj, { rejectWithValue }) => {
    try {
      await axios.post('https://drivo.onrender.com/api/bookings/bookcar', reqObj);
      return reqObj;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  
  // Async thunk for getting all bookings
  export const getAllBookings = createAsyncThunk('bookings/getAllBookings', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://drivo.onrender.com/api/bookings/getallbookings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });