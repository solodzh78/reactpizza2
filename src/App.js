import { useEffect, useState } from 'react';

import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';

import './scss/app.scss';
import { URL } from './assets/url';

function App() {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetch(URL)
            .then(res=>res.json())
            .then(arr=>setItems(arr))
    }, []);

    console.log('items: ', items);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map((pizza) => 
                            <PizzaBlock 
                                key={pizza.id}
                                {...pizza}
                            />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
