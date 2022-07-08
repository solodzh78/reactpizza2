import { configureStore } from '@reduxjs/toolkit';

import filter from './filter/slice';
import items from './item/slice';
import cart from './cart/slice';

export const store = configureStore({
    reducer: {
        filter,
        items,
        cart,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
