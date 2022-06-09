import { useDispatch, useSelector } from 'react-redux';

import { setActivePage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

export const Pagination = ({ pages }) => {

    const activePage = useSelector(state => state.filter.activePage);
    const dispatch = useDispatch();
    
    const pagesArray = [...Array(pages).keys()];
    return (
        <div className={styles.root}>
            <ul className={styles.list}>

                <li 
                    className={styles['list-item']}
                    onClick={() => {activePage - 1 >= 0 && dispatch(setActivePage(activePage - 1))}}
                >
                    {'<'}
                </li>
                {pagesArray.map((item, index) =>
                    <li 
                        className={`${styles['list-item']}  ${index === activePage ? styles.active : ''}`}
                        key={index}
                        onClick={() => dispatch(setActivePage(index))}
                    >
                        {item + 1}
                    </li>)}
                <li 
                    className={styles['list-item']}
                    onClick={() => {activePage + 1 <= pages - 1 && dispatch(setActivePage(activePage + 1))}}
                >
                    {'>'}
                </li>
            </ul>
        </div>
    )
}
