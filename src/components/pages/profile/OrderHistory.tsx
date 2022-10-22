import React, { FC } from 'react';
import LoadMask from '../../modal/LoadMask';
import OrderItem from '../../order/OrderItem';
import { useOrderHistory } from '../../../services/hooks/orderHistory';
import styles from './Profile.module.css';
import ProfileNav from './ProfileNav';
import {LocationState, TOrderItem} from '../../../utils/type';
import Modal from '../../modal/Modal';
import OrderItemDetails from '../../order/OrderItemDetails';
import { useHistory, useLocation } from 'react-router-dom';

const OrderHistory:FC = () => {
    const history = useHistory();
    const location = useLocation();
    const state = location.state as LocationState || {};
    const { order } = state;
    const { orderHistory } = useOrderHistory();

    const onBack = () => {
        history.goBack();
    };

    if (orderHistory.request) {
        return <LoadMask> Загрузка история заказов ...</LoadMask>;
    }

    return (
        <React.Fragment>
            {order &&
                <Modal width={720} height={650} onClose={onBack}>
                    <OrderItemDetails order={order} isModal={true}/>
                </Modal>
            }
            <div className={`container ${styles.container}`}>
                <ProfileNav active={'/profile/orders'} />
                <div className={`${styles.content} overflow-auto custom-scroll`}>
                    {orderHistory.orders.map((item: TOrderItem) => {
                        return <OrderItem key={item._id} order={item} isStatus={true}/>;
                    })}
                </div>
            </div>
        </React.Fragment>
    )
};

export default OrderHistory;