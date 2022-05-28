import { useEffect, useState } from 'react';

import { URL } from '../../assets/url';
import { PizzaSceleton } from '../../components/PizzaBlock/PizzaSceleton';
import { Categories } from '../../components/Categories';
import { PizzaBlock } from '../../components/PizzaBlock';
import { Sort } from '../../components/Sort';
import styled from './Home.module.scss';


function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
	const [activeCategory, setActiveCategory] = useState(0);
    const [activeSortItem, setActiveSortItem] = useState(
        {
            title: 'популярности DESC',
            sortParameter: '-rating'
        });

    useEffect(() => {
        const searchParam = (!!activeCategory ? `?category=${activeCategory}` : '?');
        const sortBy = `&sortBy=${activeSortItem.sortParameter.replace('-', '')}&order=${activeSortItem.sortParameter.includes('-') ? 'desc' : 'asc'}`;
        fetch(URL + searchParam + sortBy)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
    }, [activeCategory, activeSortItem]);

    return (
        <>
            <div className="content__top">
                <Categories 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
                <Sort 
                    activeSortItem={activeSortItem}
                    setActiveSortItem={setActiveSortItem}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...Array(6)].map((_, index) => (
                        <PizzaSceleton key={index} className="pizza-block" />
                    ))
                    : items.map((pizza) => 
                        <PizzaBlock 
                            key={pizza.id} 
                            {...pizza} 
                            setActiveCategory={setActiveCategory}
                            setActiveSortItem={setActiveSortItem}
                            />)}
            </div>
        </>
    );
}

export { Home };
