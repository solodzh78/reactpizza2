import { FC, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWhyDidYouUpdate } from 'ahooks';


import { URL } from '../../assets/url';
import { PizzaSceleton } from '../../components/PizzaBlock/PizzaSceleton';
import { Categories } from '../../components/Categories';
import { PizzaBlock } from '../../components/PizzaBlock';
import { Sort } from '../../components/Sort';
import { Pagination } from '../../components/Pagination';
import { StatusEnum } from '../../redux/item/types';
import { setActiveCategoryId, setActivePage, setFilters } from '../../redux/filter/slice';
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { SORT_LIST } from '../../redux/filter/constants';
import { fetchItems } from '../../redux/item/slice';
import { filtersSelector } from '../../redux/filter/selectors';
import { itemSelector } from '../../redux/item/selectors';

// import styled from './Home.module.scss';

const Home: FC = () => {
    console.log('render Home');

    const itemsPerPage = 3;
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const { items, status } = useAppSelector(itemSelector);
    const { 
        activeCategoryId, 
        activeSortItem, 
        activePage, 
        searchValue } = useAppSelector(filtersSelector);

    const isSearch = useRef(false);
    const isFirstRender = useRef(true);

    const sortToObj = useCallback((str: string) => {
        return SORT_LIST.find(elem => elem.sortParameter === str) || SORT_LIST[0]
    }, []);

    useLayoutEffect(() => {
        if (isFirstRender.current && searchParams.toString()) {
            const filters = {
                sort: sortToObj(String(searchParams.get('sort'))),
                categoryId: Number(searchParams.get('categoryId')),
                search: String(searchParams.get('search')),
                page: Number(searchParams.get('page')),
            };
            dispatch(setFilters(filters));
            isSearch.current = true;
        }
    }, [dispatch, searchParams, sortToObj])
    
    
    useEffect(() => {
        if (!isSearch.current) {
            const searchParam = (!!activeCategoryId ? `?category=${activeCategoryId}` : '?');
            const sortBy = `&sortBy=${activeSortItem.sortParameter.replace('-', '')}`;
            const order = `&order=${activeSortItem.sortParameter.includes('-') ? 'desc' : 'asc'}`;
            const search = `&search=${searchValue ? searchValue : ''}`;
            dispatch(fetchItems(URL + searchParam + sortBy + order + search));
            window.scrollTo(0, 0);
        }
    }, [activeCategoryId, activeSortItem, dispatch, searchValue]);
    
    useEffect(() => {
        if (!isFirstRender.current) {
            setSearchParams({
				sort: activeSortItem.sortParameter,
                categoryId: String(activeCategoryId),
                search: searchValue,
                page: String(activePage)
			});
        }
        isSearch.current = false;
        isFirstRender.current = false;
    }, [activeCategoryId, activeSortItem.sortParameter, searchValue, activePage, setSearchParams]);

    const pages = Math.ceil(items.length / itemsPerPage);

	const onChangeCategory = useCallback((index: number) => {
		dispatch(setActiveCategoryId(index));
	}, [dispatch]);

	useWhyDidYouUpdate("Home", {
		searchParams, 
		items, 
		status, 
		activeCategoryId, 
        activeSortItem, 
        activePage, 
        searchValue, 
		pages,
		sortToObj,
		setSearchParams,
		dispatch });


    return (
        <>
            <div className="content__top">
                <Categories activeCategoryId={activeCategoryId} onChangeCategory={onChangeCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === StatusEnum.LOADING
                    ? [...Array(6)].map((_, index) => (
                        <PizzaSceleton key={index} className="pizza-block" />
                    ))
                    : status === StatusEnum.SUCCESS
                        ? items
                            .filter((item, index) => 
                                index >= activePage * itemsPerPage && index < (activePage + 1) * itemsPerPage)
                            .map((pizza) => 
								<PizzaBlock key={pizza.id} {...pizza} />)
                        : <h2>Ошибка загрузки с сервера</h2>
                }
            </div>
            <Pagination 
                pages={pages}
				activePage={activePage}
				setActivePage={(page: number) => dispatch(setActivePage(page))}
            />
        </>
    );
}

export { Home };
