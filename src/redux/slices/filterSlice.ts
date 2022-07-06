import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
	RAITING_DESC = '-rating',
	RAITING_ASC = 'rating',
	PRICE_DESC = '-price',
	PRICE_ASC = 'price',
	TITLE_DESC = '-title',
	TITLE_ASC = 'title',
};

export const sortList = [
    {
        title: 'популярности DESC',
        sortParameter: SortPropertyEnum.RAITING_DESC
    }, 
    {
        title: 'популярности ASC',
        sortParameter: SortPropertyEnum.RAITING_ASC
    }, 
    {
        title: 'цене DESC',
        sortParameter: SortPropertyEnum.PRICE_DESC
    }, 
    {
        title: 'цене ASC',
        sortParameter: SortPropertyEnum.PRICE_ASC
    }, 
    {
        title: 'алфавиту DESC',
        sortParameter: SortPropertyEnum.TITLE_DESC
    },
    {
        title: 'алфавиту ASC',
        sortParameter: SortPropertyEnum.TITLE_ASC
    }];

const initialState = {
    activeCategoryId: 0,
    activeSortItem: sortList[0],
    searchValue: '',
    activePage: 0,
}

type FilterStateType = {
	categoryId: number;
	sort: {
		title: string;
		sortParameter: SortPropertyEnum;
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