import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice';
import pagination from './slices/paginationSlice';
import search from './slices/searchSlice';
import items from './slices/itemsSlice';

export const store = configureStore({
    reducer: {
        filter,
        pagination,
        search,
        items,
    },
})