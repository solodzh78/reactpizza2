import { FC, memo } from "react";

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые'
];

type CategoriesPropsType = {
	activeCategoryId: number;
	onChangeCategory: (index: number) => void;
};

export const Categories1: FC<CategoriesPropsType> = ({ activeCategoryId, onChangeCategory }) => {
	console.log('Render Categories');
    return (
        <div className="categories">
            <ul>
				{categories.map((categoryName, index) => {
					const className = (index === activeCategoryId) ? 'active' : '';
					return (
						<li 
							className={className}
							key={categoryName} 
							onClick={onChangeCategory.bind(null, index)}
						>
							{categoryName}
						</li>
					)
				})}
            </ul>
        </div>
    );
};

export const Categories = memo(Categories1);