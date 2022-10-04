import React, { FC } from 'react';
import styles from './OrderDetails.module.css';
import checkIcon from '../../images/graphicsicon.png';
import { TOrder } from '../../utils/type';

interface IOrderDetails {
    order: TOrder | null;
}

const OrderDetails:FC<IOrderDetails> = ({ order }) => {
    return (
        <div className={styles.content}>
            <div className={'text text_type_digits-large text_color_primary mb-8'}>
                {order && order.number}
            </div>
            <div className={'text text_type_main-medium text_color_primary mb-15'}>
                идентификатор заказа
            </div>
            <div className={`${styles.checkIcon} text_color_primary mb-15`}>
                <img src={checkIcon}/>
            </div>
            <div className={'text text_type_main-default text_color_primary mb-2'}>
                Ваш заказ начали готовить
            </div>
            <div className={'text text_type_main-default text_color_inactive'}>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    );
};

export default OrderDetails;