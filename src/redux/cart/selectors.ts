import { RootState } from "../store";

export const uidSelector = (state: RootState) => state.cart.cartItems.map(item => item.uid);
export const cartSelector = (state: RootState) => state.cart;