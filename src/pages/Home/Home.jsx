import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { URL } from '../../assets/url';
import { PizzaSceleton } from '../../components/PizzaBlock/PizzaSceleton';
import { Categories } from '../../components/Categories';
import { PizzaBlock } from '../../components/PizzaBlock';
import { Sort } from '../../components/Sort';
import { Pagination } from '../../components/Pagination';

import styled from './Home.module.scss';
import { setActivePage } from '../../redux/slices/paginationSlice';
import { setItems } from '../../redux/slices/itemsSlice';

function Home() {

    const itemsPerPage = 3;

    const [isLoading, setIsLoading] = useState(true);
    
    const dispatch = useDispatch();
    
    const { items } = useSelector(state => state.items);
    const { activeCategoryId, activeSortItem } = useSelector(state => state.filter);
    const currentPage = useSelector(state => state.pagination.activePage);
    const searchValue = useSelector(state => state.search.searchValue);
        
    useEffect(() => {
        const searchParam = (!!activeCategoryId ? `?category=${activeCategoryId}` : '?');
        const sortBy = `&sortBy=${activeSortItem.sortParameter.replace('-', '')}`;
        const order = `&order=${activeSortItem.sortParameter.includes('-') ? 'desc' : 'asc'}`;
        const search = `&search=${searchValue ? searchValue : ''}`;
        fetch(URL + searchParam + sortBy + order + search)
        .then((res) => res.json())
        .then((arr) => {
            dispatch(setItems(arr));
            dispatch(setActivePage(0));
            setIsLoading(false);
        });
    }, [activeCategoryId, activeSortItem, searchValue]);
    
    const pages = Math.ceil(items.length / itemsPerPage);
        
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...Array(6)].map((_, index) => (
                        <PizzaSceleton key={index} className="pizza-block" />
                    ))
                    : items
                        // .filter(({title}) => title
                        //                         .toLowerCase()
                        //                         .includes(searchValue.toLowerCase()))
                        .filter((item, index) => 
                            index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage)
                        .map((pizza) => 
                            <PizzaBlock 
                                key={pizza.id} 
                                {...pizza} 
                            />)}
            </div>
            <Pagination 
                pages={pages}
            />
        </>
    );
}

export { Home };
