import { CartItemType } from "../../redux/cart/types";

export const calcCartTotal = (items: CartItemType[]) => {
    const totalPrice = items.reduce((akk, item) => {
        return akk + item.price * item.count
    }, 0);
    const totalCount = items.reduce((akk, item) => {
        return akk + item.count
    }, 0);
    return {totalPrice, totalCount};
}