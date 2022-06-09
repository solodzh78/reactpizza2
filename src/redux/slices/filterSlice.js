import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCategoryId: 0,
    activeSortItem: {
        title: 'популярности DESC',
        sortParameter: '-rating'
    },
    searchValue: '',
    activePage: 0,
    isLoading: true,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategoryId: (state, {payload}) => {
            state.activeCategoryId = payload;
            state.activePage = 0;
        },
        setActiveSortItem: (state, {payload}) => {
            state.activeSortItem = payload;
            state.activePage = 0;
        },
        setSearchValue: (state, {payload}) => {
            state.searchValue = payload;
            state.activePage = 0;
        },
        setActivePage: (state, {payload}) => {
            state.activePage = payload
        },
        setIsLoading: (state, {payload}) => {
            state.isLoading = payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { 
    setActiveCategoryId, 
    setActiveSortItem, 
    setSearchValue, 
    setActivePage, 
    setIsLoading } = filterSlice.actions;

export default filterSlice.reducer;