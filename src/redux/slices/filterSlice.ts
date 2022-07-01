import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    activeCategoryId: 0,
    activeSortItem: {
        title: 'популярности DESC',
        sortParameter: '-rating'
    },
    searchValue: '',
    activePage: 0,
}

type FilterStateType = {
	categoryId: number;
	sort: {
		title: string;
		sortParameter: string;
	};
	search: string;
	page: number;
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActiveCategoryId: (state, {payload}: PayloadAction<number>) => {
            state.activeCategoryId = payload;
            state.activePage = 0;
        },
        setActiveSortItem: (state, {payload}) => {
            state.activeSortItem = payload;
            state.activePage = 0;
        },
        setSearchValue: (state, {payload}: PayloadAction<string>) => {
            state.searchValue = payload;
            state.activePage = 0;
        },
        setActivePage: (state, {payload}) => {
            state.activePage = payload
        },
        setFilters: (state, {payload}: PayloadAction<FilterStateType>) => {
            state.activeCategoryId = payload.categoryId;
            state.activeSortItem = payload.sort;
            state.searchValue = payload.search;
            state.activePage = payload.page;
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    setActiveCategoryId, 
    setActiveSortItem, 
    setSearchValue, 
    setActivePage, 
    setFilters } = filterSlice.actions;

export default filterSlice.reducer;