import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { URL } from '../../assets/url';
import { PizzaSceleton } from '../../components/PizzaBlock/PizzaSceleton';
import { Categories } from '../../components/Categories';
import { PizzaBlock } from '../../components/PizzaBlock';
import { Sort } from '../../components/Sort';
import { Pagination } from '../../components/Pagination';
import { setItems } from '../../redux/slices/itemsSlice';
import { setIsLoading } from '../../redux/slices/filterSlice';

// import styled from './Home.module.scss';

function Home() {
    console.log('render Home');

    const itemsPerPage = 3;

    // const [isLoading, setIsLoading] = useState(true);
    
    const dispatch = useDispatch();
    
    const { items } = useSelector(state => state.items);
    const { activeCategoryId, activeSortItem, activePage, searchValue, isLoading } = useSelector(state => state.filter);
    
    useEffect(() => {
        const searchParam = (!!activeCategoryId ? `?category=${activeCategoryId}` : '?');
        const sortBy = `&sortBy=${activeSortItem.sortParameter.replace('-', '')}`;
        const order = `&order=${activeSortItem.sortParameter.includes('-') ? 'desc' : 'asc'}`;
        const search = `&search=${searchValue ? searchValue : ''}`;
        axios
            .get(URL + searchParam + sortBy + order + search)
            .then(({data}) => {
                dispatch(setItems(data));
                dispatch(setIsLoading(false));
                window.scrollTo(0, 0);
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
                        .filter((item, index) => 
                            index >= activePage * itemsPerPage && index < (activePage + 1) * itemsPerPage)
                        .map((pizza) => 
                            <PizzaBlock key={pizza.id} {...pizza} />
                        )
                }
            </div>
            <Pagination 
                pages={pages}
            />
        </>
    );
}

export { Home };
