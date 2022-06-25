import { FC } from 'react';

import styles from './NotFound.module.scss';
import notFindImage from '../../assets/img/ss.webp';

const NotFound: FC = () => {
    return (
        <>
            <div className={styles.root}>
                <img src={notFindImage} alt="" className={styles.image} />
                <div className={styles.title}>Ошибка 404. Страница не найдена</div>
                <div className={styles.description}>
                    К сожалению, такой страницы нет в нашем магазине
                </div>
            </div>
        </>
    );
}

export { NotFound };
