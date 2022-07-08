import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ItemType, StatusEnum } from './types';


export const fetchItems = createAsyncThunk<ItemType[], string>(
    "items/fetchItems",
    async (url: string, { rejectWithValue }) => {
        try {
            const res = await axios.get<ItemType[]>(url);
            const data = res.data;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const fetchPizza = createAsyncThunk<ItemType, string>(
    "items/fetchPizza",
    async (url, { rejectWithValue }) => {
        try {
            const res = await axios.get<ItemType>(url);
            const data = res.data;
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



const initialState = {
    items: [] as ItemType[],
    status: StatusEnum.LOADING,
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = StatusEnum.LOADING;
				// state.items = [];
            })
            .addCase(fetchItems.fulfilled, (state, { payload }) => {
                state.status = StatusEnum.SUCCESS;
                state.items = payload;
            })
            .addCase(fetchItems.rejected, (state) => {
                state.status = StatusEnum.ERROR;
                state.items = [];
            })
            .addCase(fetchPizza.pending, (state) => {
                state.status = StatusEnum.LOADING;
				state.items = [];
            })
            .addCase(fetchPizza.fulfilled, (state, { payload }) => {
                state.status = StatusEnum.SUCCESS;
                state.items = [payload];
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.status = StatusEnum.ERROR;
                state.items = [];
            });
    },
})

// Action creators are generated for each case reducer function

export default itemsSlice.reducer;