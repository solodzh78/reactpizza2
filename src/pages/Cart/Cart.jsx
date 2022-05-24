import styles from './Cart.module.scss';
import emptyCart from '../../assets/img/empty-cart.png'

function Cart() {
    return (
        <div className={styles.root}>
            <div className="cart cart--empty">
                <h2>
                    Корзина пустая <icon>😕</icon>
                </h2>
                <p>
                    Вероятней всего, вы не заказывали ещё пиццу.
                    <br />
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
                </p>
                <img src={emptyCart} alt="Empty cart" />
                <a className="button button--black" href="/">
                    <span>Вернуться назад</span>
                </a>
            </div>
        </div>
    );
}

export { Cart };
