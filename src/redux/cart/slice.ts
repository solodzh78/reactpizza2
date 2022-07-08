import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { CartItemType } from './types';

const initialState = {
    cartItems: [] as CartItemType[]
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, {payload}: PayloadAction<CartItemType>) => {
            const existingItem = state.cartItems.find(item => 
                item.id === payload.id && item.size === payload.size && item.type === payload.type);
                existingItem 
                ?   existingItem.count++
                :   state.cartItems.push({...payload, uid: nanoid(), count: 1});
        },
        removeFromCart: (state, {payload}: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(item => item.uid !== payload)
        },
        incrItemCount: (state, {payload}: PayloadAction<string>) => {
            const findedItem = state.cartItems.find(item => item.uid === payload);
            if (findedItem) findedItem.count++;
        },
        decrItemCount: (state, {payload}: PayloadAction<string>) => {
            const findedItem = state.cartItems.find(item => item.uid === payload);
            if (findedItem && findedItem.count > 1) findedItem.count--;
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        setCart: (state, {payload}: PayloadAction<CartItemType[]>) => {
            state.cartItems = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    addToCart, 
    removeFromCart,
    incrItemCount,
    decrItemCount,
    clearCart,
    setCart } = cartSlice.actions;

export default cartSlice.reducer;