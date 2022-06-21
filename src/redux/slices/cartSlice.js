import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
    cartItems: [],
    totalPrice: 0,
    totalCount: 0,
};

const total = (state) => {
    state.totalPrice = state.cartItems.reduce((akk, item) => {
        return akk + item.price * item.count
    }, 0);
    state.totalCount = state.cartItems.reduce((akk, item) => {
        return akk + item.count
    }, 0);
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, {payload}) => {
            const existingItem = state.cartItems.find(item => 
                item.id === payload.id && item.size === payload.size && item.type === payload.type);
                existingItem 
                ?   existingItem.count++
                :   state.cartItems.push({...payload, uid: nanoid(), count: 1});
            total(state);
        },
        removeFromCart: (state, {payload}) => {
            state.cartItems = state.cartItems.filter(item => item.uid !== payload)
            total(state);
        },
        incrItemCount: (state, {payload}) => {
            const findedItem = state.cartItems.find(item => item.uid === payload);
            if (findedItem) findedItem.count++;
            total(state);
        },
        decrItemCount: (state, {payload}) => {
            const findedItem = state.cartItems.find(item => item.uid === payload);
            if (findedItem && findedItem.count > 1) findedItem.count--;
            total(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            total(state);
        },
    }
})

// Action creators are generated for each case reducer function
export const { 
    addToCart, 
    removeFromCart,
    incrItemCount,
    decrItemCount,
    clearCart } = cartSlice.actions;

export default cartSlice.reducer;