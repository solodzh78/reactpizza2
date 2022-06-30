import { FC } from 'react';

import styles from './Pagination.module.scss';

type PaginationPropsType = {
	pages: number;
	activePage: number;
	setActivePage: (page: number) => void;
};

export const Pagination: FC<PaginationPropsType> = ({ pages, activePage, setActivePage }) => {

    const pagesArray = Array.from(Array(pages).keys());
    return (
        <div className={styles.root}>
            <ul className={styles.list}>

                <li 
                    className={styles['list-item']}
                    onClick={() => {activePage - 1 >= 0 && (setActivePage(activePage - 1))}}
                >
                    {'<'}
                </li>
                {pagesArray.map((item, index) =>
                    <li 
                        className={`${styles['list-item']}  ${index === activePage ? styles.active : ''}`}
                        key={index}
                        onClick={() => (setActivePage(index))}
                    >
                        {item + 1}
                    </li>)}
                <li 
                    className={styles['list-item']}
                    onClick={() => {activePage + 1 <= pages - 1 && (setActivePage(activePage + 1))}}
                >
                    {'>'}
                </li>
            </ul>
        </div>
    )
}
