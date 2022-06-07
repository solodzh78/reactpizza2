import { useDispatch, useSelector } from "react-redux";

import { setActiveCategoryId} from '../redux/slices/filterSlice';

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые'
]
export const Categories = () => {
	const dispatch = useDispatch();
	const activeCategory = useSelector(state => state.filter.activeCategoryId);
    return (
        <div className="categories">
            <ul>
				{categories.map((value, index) => {
					const className = (index === activeCategory) ? 'active' : '';
					return (
						<li 
							className={className}
							key={value} 
							onClick={() => dispatch(setActiveCategoryId(index))}
						>
							{value}
						</li>
					)
				})}
            </ul>
        </div>
    );
};

