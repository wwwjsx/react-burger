import styles from './BurgerConstructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import CommonPropTypes from '../../utils/common/PropTypes';

const ElementBun = ({ item, type, isHover }) => {
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
    ) : (
        <div className={`${cls}`}>
            Пожалуйста, перетащите сюда булки
        </div>
    );
};

ElementBun.propTypes = {
    type: PropTypes.oneOf(['top', 'bottom']).isRequired,
    isHover: PropTypes.bool,
    item: CommonPropTypes.ingredientShapeType
};

export default ElementBun;