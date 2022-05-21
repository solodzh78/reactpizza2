import { useState } from "react";

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые'
]
export const Categories = () => {
	const [activeCategory, setActiveCategory] = useState(0);
    return (
        <div className="categories">
            <ul>
				{categories.map((value, index) => {
					const className = (index === activeCategory) ? 'active' : '';
					return (
						<li 
							className={className}
							key={value} 
							onClick={setActiveCategory.bind(null, index)}
						>
							{value}
						</li>
					)
				})}
            </ul>
        </div>
    );
};

