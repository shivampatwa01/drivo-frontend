import { createSlice} from '@reduxjs/toolkit';
import { addcar, deletecar, editcar, getAllcars } from '../thunks/carThunk'; 
import toast from 'react-hot-toast';

// Initial state
const initialState = {
    cars: [],
    loading: false,
};

// Create Slice
const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        // Add any synchronous actions here
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllcars.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllcars.fulfilled, (state, action) => {
                state.cars = action.payload;
                state.loading = false;
            })
            .addCase(getAllcars.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addcar.pending, (state) => {
                state.loading = true;
            })
            .addCase(addcar.fulfilled, (state, action) => {
                state.cars.push(action.payload);
                state.loading = false;
            })
            .addCase(addcar.rejected, (state) => {
                state.loading = false;
            })
            .addCase(editcar.pending, (state) => {
                state.loading = true;
            })
            .addCase(editcar.fulfilled, (state, action) => {
                if (action.payload && action.payload._id) {
                    const index = state.cars.findIndex(car => car._id === action.payload._id);
                    if (index !== -1) {
                        state.cars[index] = action.payload;
                    }
                } else {
                    console.error('Edit car payload is missing or has invalid structure:', action.payload);
                }
                state.loading = false;
            })
            .addCase(editcar.rejected, (state, action) => {
                state.loading = false;
                toast.error(`Failed to update car`);
            })
            .addCase(deletecar.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletecar.fulfilled, (state, action) => {
                if (action.payload) {
                    state.cars = state.cars.filter(car => car._id !== action.payload);
                } else {
                    console.error('Delete car payload is missing:', action.payload);
                }
                state.loading = false;
            })
            .addCase(deletecar.rejected, (state, action) => {
                state.loading = false;
                toast.error(`Failed to delete car`);
            });
    },
});

// Export actions and reducer
//export const { } = carSlice.actions;

export default carSlice.reducer;
