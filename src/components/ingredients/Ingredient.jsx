import React from "react";
import styles from "./Ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import CommonPropTypes from '../../utils/common/PropTypes';

const Ingredient = (props) => {
    return (
        <div className={`${styles.ingredient}`} data-id={props._id} onClick={props.onClick}>
            <div
                className={`${styles.thumb} ml-4 mr-4`}
                style={{backgroundImage: `url(${props.image})` }}>
                {props.count > 0 && <Counter count={props.count} size="default" /> }
            </div>
            <div className={'mt-1 mb-1 text-center'}>
                <span className={styles.price}>
                    {props.price} <CurrencyIcon type="primary" />
                </span>
            </div>
            <div className={`${styles.name} text text-center text_type_main-default`}>
                <a
                    href={'#'}
                    className={'text text_color_primary'}
                >
                    {props.name}
                </a>
            </div>
        </div>
    );
};

Ingredient.propTypes = CommonPropTypes.ingredientType;

export default Ingredient;