import React from 'react';
import styles from './Ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import CommonPropTypes from '../../utils/common/PropTypes';
import {useDrag} from 'react-dnd';
import {MOVE_COMPONENT_DRAG_TYPE} from '../../utils/common/Contstants';

const Ingredient = (props) => {
    const { item } = props;
    const [{ opacity }, drag] = useDrag(() => ({
        type: MOVE_COMPONENT_DRAG_TYPE,
        item: {...item},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }));

    return (
        <div
            ref={drag}
            className={`${styles.ingredient}`}
            style={{ opacity }}
            data-id={props._id}
            onClick={props.onClick}>
            <div
                className={`${styles.thumb} ml-4 mr-4`}
                style={{backgroundImage: `url(${item.image})` }}>
                {item.count > 0 && <Counter count={item.count} size="default" /> }
            </div>
            <div className={'mt-1 mb-1 text-center'}>
                <span className={styles.price}>
                    {item.price} <CurrencyIcon type="primary" />
                </span>
            </div>
            <div className={`${styles.name} text text-center text_type_main-default`}>
                <a href={'#'} className={'text text_color_primary'}>
                    {item.name}
                </a>
            </div>
        </div>
    );
};

Ingredient.propTypes = {
    item: CommonPropTypes.ingredientShapeType
};

export default Ingredient;