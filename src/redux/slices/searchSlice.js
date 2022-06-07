import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue: (state, {payload}) => {
            state.searchValue = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;