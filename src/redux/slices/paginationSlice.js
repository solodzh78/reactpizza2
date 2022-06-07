import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activePage: 0,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setActivePage: (state, {payload}) => {
            state.activePage = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setActivePage } = paginationSlice.actions;

export default paginationSlice.reducer;