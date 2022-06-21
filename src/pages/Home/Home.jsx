import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { URL } from '../../assets/url';
import { PizzaSceleton } from '../../components/PizzaBlock/PizzaSceleton';
import { Categories } from '../../components/Categories';
import { PizzaBlock } from '../../components/PizzaBlock';
import { Sort, sortList } from '../../components/Sort';
import { Pagination } from '../../components/Pagination';
import { fetchItems } from '../../redux/slices/itemsSlice';
import { setFilters } from '../../redux/slices/filterSlice';

// import styled from './Home.module.scss';

function Home() {
    console.log('render Home');

    const itemsPerPage = 3;
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const { items, status } = useSelector(state => state.items);
    const { 
        activeCategoryId, 
        activeSortItem, 
        activePage, 
        searchValue } = useSelector(state => state.filter);

    const isSearch = useRef(false);
    const isFirstRender = useRef(true);

    const sortToObj = str => {
        return sortList.find(elem => elem.sortParameter === str) || sortList[0]
    };

    useEffect(() => {
        if (isFirstRender.current && searchParams.toString()) {
            const filters = {
                sort: sortToObj(searchParams.get('sort')),
                categoryId: Number(searchParams.get('categoryId')),
                search: searchParams.get('search'),
                page: Number(searchParams.get('page')),
            };
            dispatch(setFilters(filters));
            isSearch.current = true;
        }
    }, [])
    
    
    useEffect(() => {
        if (!isSearch.current) {
            const searchParam = (!!activeCategoryId ? `?category=${activeCategoryId}` : '?');
            const sortBy = `&sortBy=${activeSortItem.sortParameter.replace('-', '')}`;
            const order = `&order=${activeSortItem.sortParameter.includes('-') ? 'desc' : 'asc'}`;
            const search = `&search=${searchValue ? searchValue : ''}`;
            dispatch(fetchItems(URL + searchParam + sortBy + order + search));
            window.scrollTo(0, 0);
        }
    }, [activeCategoryId, activeSortItem, searchValue]);
    
    useEffect(() => {
        if (!isFirstRender.current) {
            setSearchParams({
                sort: activeSortItem.sortParameter,
                categoryId: activeCategoryId,
                search: searchValue,
                page: activePage,
            });
        }
        isSearch.current = false;
        isFirstRender.current = false;
    }, [activeCategoryId, activeSortItem.sortParameter, searchValue, activePage]);

    const pages = Math.ceil(items.length / itemsPerPage);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'loading'
                    ? [...Array(6)].map((_, index) => (
                        <PizzaSceleton key={index} className="pizza-block" />
                    ))
                    : status === 'success' 
                        ? items
                            .filter((item, index) => 
                                index >= activePage * itemsPerPage && index < (activePage + 1) * itemsPerPage)
                            .map((pizza) => 
                                <PizzaBlock key={pizza.id} {...pizza} />
                            )
                        : <h2>Ошибка загрузки с сервера</h2>
                }
            </div>
            <Pagination 
                pages={pages}
            />
        </>
    );
}

export { Home };
