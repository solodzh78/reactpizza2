import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCategoryId: 0,
    activeSortItem: {
        title: 'популярности DESC',
        sortParameter: '-rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategoryId: (state, {payload}) => {
            state.activeCategoryId = payload
        },
        setActiveSortItem: (state, {payload}) => {
            state.activeSortItem = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setActiveCategoryId, setActiveSortItem } = filterSlice.actions;

export default filterSlice.reducer;