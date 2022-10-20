import { FC } from 'react';
import OrderItemDetails from '../../order/OrderItemDetails';
import { useOrderHistory } from '../../../services/hooks/orderHistory';
import LoadMask from '../../modal/LoadMask';

const OrderHistoryItem:FC = () => {
    const { orderHistory, order } = useOrderHistory();

    if (orderHistory.request) {
        return <LoadMask> Загрузка данных заказа ... </LoadMask>;
    }

    return (
        <div className={'container box-wrapper'}>
            <div className={'box-inner custom-scroll'}>
                {order && <OrderItemDetails order={order} />}
            </div>
        </div>
    );
}

export default OrderHistoryItem;