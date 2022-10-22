import React from 'react';
import LoadMask from '../modal/LoadMask';
import OrderItemDetails from '../order/OrderItemDetails';
import {useFeed} from '../../services/hooks/feed';

const FeedOrder = () => {
    const { order, feed } = useFeed();

    if (feed.request) {
        return <LoadMask />;
    }

    return (
        <div className={'container box-wrapper'}>
            <div className={'box-inner custom-scroll'}>
                {order ?
                    <OrderItemDetails order={order} /> :
                    <div className={'text text_type_main-medium text-center'}>
                        Заказ не найден
                    </div>
                }
            </div>
        </div>
    );
}

export default FeedOrder;