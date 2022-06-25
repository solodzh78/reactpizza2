import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async (url, { rejectWithValue }) => {
        try {
            const res = await axios.get(url);
            const data = res.data;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const fetchPizza = createAsyncThunk(
    "items/fetchPizza",
    async (url, { rejectWithValue }) => {
        try {
            const res = await axios.get(url);
            const data = res.data;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    items: [],
    status: 'loading',
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    // reducers: {
    //     setItems: (state, {payload}) => {
    //         state.items = payload
    //     },
    // },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = "loading";
				state.items = [];
            })
            .addCase(fetchItems.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.items = payload;
            })
            .addCase(fetchItems.rejected, (state) => {
                state.status = "failed";
                state.items = [];
            })
            .addCase(fetchPizza.pending, (state) => {
                state.status = "loading";
				state.items = [];
            })
            .addCase(fetchPizza.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.items = [payload];
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = "failed";
                state.items = [];
            });
    },
})

// Action creators are generated for each case reducer function
export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;