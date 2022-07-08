import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { addToCart } from "../../redux/cart/slice";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
const pizzaType = ['тонкое', 'традиционное'];

type PizzaBlockProps = { 
    id: string;
	title: string, 
	price: number, 
	imageUrl: string, 
	types: number[], 
	sizes: number[] }

export const PizzaBlock: FC<PizzaBlockProps> = (props) => {
    const { id, title, price, imageUrl, types, sizes } = props;
    const dispatch = useAppDispatch();
	const [activeType, setActiveType] = useState(0);
	const [activeSize, setActiveSize] = useState(0);
    const count = useAppSelector((state) => {
        const countWithId = state.cart.cartItems.reduce((akk, item) => {
            if (item.id === id) return akk + item.count
            return akk
        }, 0);
        return countWithId;
    });
    const onClickHandler = () => {
        const itemToCart = {
            id, 
            title,
            imageUrl,
            price,
            type: pizzaType[activeType],
            size: sizes[activeSize],
			uid: '',
			count: 0
        };
        dispatch(addToCart(itemToCart));
    }
    return (
        <div className="pizza-block">
			<Link to={`/pizza/${id}`}>
				<img
					className="pizza-block__image"
					src={imageUrl}
					alt="Pizza"
					width={260}
					height={260}
				/>
				<h4 className="pizza-block__title">{title}</h4>
			</Link>
            <div className="pizza-block__selector">
                <ul>
					{types.map((value, index) => {
						const className = (index === activeType) ? 'active' : '';
						return (
							<li 
								className={className}
								key={value} 
								onClick={setActiveType.bind(null, index)}
							>
								{pizzaType[value]}
							</li>
						)
					})}
                </ul>
                <ul>
					{sizes.map((value, index) => {
						const className = (index === activeSize) ? 'active' : '';
						return (
							<li 
								className={className}
								key={value} 
								onClick={setActiveSize.bind(null, index)}
							>
								{'от ' + value + ' см'} 
							</li>
						)
					})}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <div className="button button--outline button--add" onClick={onClickHandler}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {count > 0 && <i>{count}</i>}
                </div>
            </div>
        </div>
    );
};

