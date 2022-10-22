import { useAuth } from './auth';
import { useDispatch, useSelector } from '../store';
import {useEffect, useMemo} from 'react';
import { cleanToken } from '../../utils/helper';
import { orderHistoryActions } from '../slices/orderHistory';
import { useParams } from 'react-router-dom';
import { TOrderItem, TTokenString } from '../../utils/type';
import { WS_ORDERS_URL } from '../constants/common';

export function useOrderHistory() {
    const params = useParams<{ id: string }>();
    const auth = useAuth();
    const dispatch = useDispatch();
    const orderHistory = useSelector(store => store.orderHistory);
    const order = useMemo(() => {
        return orderHistory.orders.find((order:TOrderItem) => order._id === params.id);
    }, [orderHistory.orders]);

    useEffect(() => {
        if (!order) {
            auth.refreshCallback((token: TTokenString) => {
                if (token) {
                    const accessToken = cleanToken(token);
                    const ws = orderHistoryActions.wsInit({
                        url: `${WS_ORDERS_URL}?token=${accessToken}`,
                        sliceName: 'order/history'
                    });
                    dispatch(ws);
                }
            });
        }

        return () => {
            if (!order) {
                dispatch(orderHistoryActions.wsClose({ sliceName: 'order/history' }));
            }
        }
    }, [dispatch]);

    return { order, orderHistory };
}

