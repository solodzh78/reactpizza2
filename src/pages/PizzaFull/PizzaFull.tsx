import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { URL } from '../../assets/url';
import { PizzaSceleton } from '../../components/PizzaBlock/PizzaSceleton';
import { PizzaBlock } from '../../components/PizzaBlock';
import { fetchPizza } from '../../redux/item/slice';
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { StatusEnum } from '../../redux/item/types';
import { itemSelector } from '../../redux/item/selectors';

// import styled from './Home.module.scss';

export const PizzaFull: FC = () => {
	const id = useParams().id || '';
    const dispatch = useAppDispatch();

    const { items, status } = useAppSelector(itemSelector);
    
    useEffect(() => {
		if (id) dispatch(fetchPizza(URL + '/'  + id));
		window.scrollTo(0, 0);
    }, [dispatch, id]);
    

    return (
        <>
            <h2 className="content__title">{status === StatusEnum.SUCCESS && items[0].title}</h2>
            <div className="content__items">
                {status === StatusEnum.LOADING
                    ? <PizzaSceleton className="pizza-block" />
                    : status === StatusEnum.SUCCESS
                        ? <PizzaBlock {...items[0]} />
                        : <h2>Ошибка загрузки с сервера</h2>
                }
            </div>
        </>
    );
}
