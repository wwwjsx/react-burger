import styles from './BurgerConstructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

const ElementBun = ({ item, type, isHover }) => {
    const text = `${item.name} ${type === 'top' ? '(верх)' : '(низ)'}`;

    let cls = styles.element;

    if (isHover) {
        cls += ` ${styles.bunHover}`;
    }

    return (
        <div className={cls}>
            <div className={styles.elementIcon}></div>
            <ConstructorElement
                type={type}
                isLocked
                text={text}
                price={item.price}
                thumbnail={item.image_mobile}
            />
        </div>
    );
};

export default ElementBun;