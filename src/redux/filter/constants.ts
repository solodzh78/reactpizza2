import { SortPropertyEnum } from "./types";

export const SORT_LIST = [
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