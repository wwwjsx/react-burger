import { useDispatch, useSelector } from '../store';
import { useEffect, useMemo } from 'react';
import { feedActions } from '../slices/feed';
import { useLocation, useParams } from 'react-router-dom';
import { LocationState, TOrderItem } from '../../utils/type';
import { WS_ORDERS_URL } from '../constants/common';

export const useFeed = () => {
    const location = useLocation();
    const state = location.state as LocationState || {};
    const params = useParams<{ id: string }>();
    let { order } = state;
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    order = useMemo(() => {
        return order || feed.orders.find((order:TOrderItem) => order._id === params.id);
    }, [feed.orders]);

    useEffect(() => {
        if (!order) {
            const ws = feedActions.wsInit({
                url: `${WS_ORDERS_URL}/all`,
                sliceName: 'feed'
            });

            dispatch(ws);
        }

        return () => {
            if (!order) {
                dispatch(feedActions.wsClose({ sliceName: 'feed' }));
            }
        }
    }, [dispatch]);

    return { order, feed };
};