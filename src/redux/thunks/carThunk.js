import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';


// Async Thunks
export const getAllcars = createAsyncThunk('cars/getAllcars', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://drivo.onrender.com/api/cars/getallcars');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addcar = createAsyncThunk('cars/addcar', async (reqObj, { rejectWithValue }) => {
    try {
        await axios.post('https://drivo.onrender.com/api/cars/addcar', reqObj);
        toast.success('New Car Added');
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const editcar = createAsyncThunk('cars/editcar', async (reqObj, { rejectWithValue }) => {
    try {
        await axios.post('https://drivo.onrender.com/api/cars/editcar', reqObj);
        toast.success('Car Details Updated');
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deletecar = createAsyncThunk('cars/deletecar', async (carId, { rejectWithValue }) => {
    try {
        //console.log(carId)
        await axios.post('https://drivo.onrender.com/api/cars/deletecar', {carid: carId});
        toast.success('Car deleted successfully');
         return carId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
