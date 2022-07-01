import { ChangeEventHandler, useMemo, useRef } from 'react';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import debounce from 'lodash.debounce';
import { useIsMounted } from '../../hooks/useIsMounted';

function Search() {

	const {searchValue} = useAppSelector(state => state.filter);
	const isMounted = useIsMounted;
	const refInput = useRef<HTMLInputElement>(null);

	if (!isMounted && refInput.current) refInput.current.value = searchValue;

    const dispatch = useAppDispatch();
    const debonceChangeInputValue = useMemo(
		() => debounce((str: string) => dispatch(setSearchValue(str)), 1000), 
		[dispatch]);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) =>  {  
		const {value} = event.target;
        debonceChangeInputValue(value);
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
                // value={localSearchValue}
                onChange={onChangeHandler} />
            {searchValue && 
            <svg 
                className={styles.clear} 
                height="48" 
                width="48" 
                viewBox="0 0 48 48" 
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    dispatch(setSearchValue(''));
                    // setLocalSearchValue('');
                    refInput.current?.focus();
                    if (refInput.current)refInput.current.value = '';
                }}
            >
                <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>}
        </div>
    )
}

export { Search };