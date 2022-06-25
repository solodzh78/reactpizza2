import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {

    const [localSearchValue, setLocalSearchValue] = useState('');
    const dispatch = useDispatch();
    const refInput = useRef<HTMLInputElement>(null);
    const debonceChangeInputValue = useCallback(debounce((str: string) => dispatch(setSearchValue(str)), 1000), []);

    const onChangeHandler = (event: any) =>  {  
        setLocalSearchValue(event.target.value);
        debonceChangeInputValue(localSearchValue)
        };
    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                enableBackground="new 0 0 32 32"
                id="Editable-line"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
                <line fill="none" id="XMLID_44_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366" />
            </svg>
            <input 
                className={styles.input} 
                ref={refInput}
                placeholder='Поиск пиццы ...' 
                value={localSearchValue}
                onChange={onChangeHandler} />
            {localSearchValue && 
            <svg 
                className={styles.clear} 
                height="48" 
                width="48" 
                viewBox="0 0 48 48" 
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    dispatch(setSearchValue(''));
                    setLocalSearchValue('');
                    refInput.current?.focus();
                }}
            >
                <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>}
        </div>
    )
}

export { Search };