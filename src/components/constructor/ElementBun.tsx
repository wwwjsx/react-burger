import styles from './BurgerConstructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { TIngredient } from '../../utils/type';

interface IElementBun {
    item: TIngredient | null;
    type: 'top' | 'bottom' | undefined;
    isHover: boolean;
}

const ElementBun:FC<IElementBun> = ({ item, type, isHover }) => {
    const isTop = type === 'top';
    const text = item ? `${item.name} ${isTop ? '(верх)' : '(низ)'}` : '';

    let cls;

    if (item) {
        cls = styles.element;
    } else {
        cls = styles.emptyElement;

        if (isTop) {
            cls += ` ${styles.top}`;
        } else {
            cls += ` ${styles.bottom}`;
        }
    }

    if (isHover) {
        cls += ` ${item ? styles.hover : styles.hoverEmpty}`;
    }

    return item ? (
        <div className={cls} data-ref-type='ingredient' data-ref-price={item.price}>
            <div className={styles.elementIcon}></div>
            <ConstructorElement
                type={type}
                isLocked
                text={text}
                price={item.price}
                thumbnail={item.image_mobile}
            />
        </div>
    ) : (
        <div className={`${cls}`}>
            Пожалуйста, перетащите сюда булки
        </div>
    );
};

export default ElementBun;