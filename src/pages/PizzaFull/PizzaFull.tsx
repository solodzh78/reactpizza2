import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { URL } from '../../assets/url';
import { PizzaSceleton } from '../../components/PizzaBlock/PizzaSceleton';
import { PizzaBlock } from '../../components/PizzaBlock';
import { fetchPizza } from '../../redux/slices/itemsSlice';

// import styled from './Home.module.scss';

export const PizzaFull: FC = () => {
    console.log('render PizzaFull');
	const { id } = useParams();
	console.log('id: ', id);
    const dispatch = useDispatch();

    const { items, status } = useSelector((state: any) => state.items);
    
    useEffect(() => {
		// @ts-ignore
		dispatch(fetchPizza(URL + '/'  + id));
		window.scrollTo(0, 0);
    }, [dispatch, id]);
    

    return (
        <>
            <h2 className="content__title">{status === 'success' && items[0].title}</h2>
            <div className="content__items">
                {status === 'loading'
                    ? <PizzaSceleton className="pizza-block" />
                    : status === 'success' 
                        ? <PizzaBlock {...items[0]} />
                        : <h2>Ошибка загрузки с сервера</h2>
                }
            </div>
        </>
    );
}

// export { PizzaFull };
