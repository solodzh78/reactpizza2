import { useState } from 'react';

const sortList = [
    {
        title: 'популярности DESC',
        sortParameter: '-rating'
    }, 
    {
        title: 'популярности ASC',
        sortParameter: 'rating'
    }, 
    {
        title: 'цене DESC',
        sortParameter: '-price'
    }, 
    {
        title: 'цене ASC',
        sortParameter: 'price'
    }, 
    {
        title: 'алфавиту DESC',
        sortParameter: '-title'
    },
    {
        title: 'алфавиту ASC',
        sortParameter: 'title'
    }];

export const Sort = ({ activeSortItem, setActiveSortItem }) => {
    const [open, setOpen] = useState(false);
    const sortItemClickHandler = (index) => {
        setActiveSortItem(sortList[index]);
        setOpen(false);
    };

    return (
        <div className="sort">
            <div className="sort__label">
                <b>Сортировка&nbsp;по:</b>
                <span onClick={setOpen.bind(null, !open)}>
                    <svg
                        className={open ? 'active' : ''}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    {activeSortItem.title}
                </span>
            </div>

            {open && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map(({title, sortParameter}, index) => {
                            const className = sortParameter === activeSortItem.sortParameter ? 'active' : '';
                            return (
                                <li
                                    className={className}
                                    key={index}
                                    onClick={sortItemClickHandler.bind(null, index)}>
                                    {title}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};
