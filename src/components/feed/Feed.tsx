import React, {FC, useCallback} from 'react';
import styles from './Feed.module.css';
import OrderItem from '../order/OrderItem';
import LoadMask from '../modal/LoadMask';
import { IS_CREATED, IS_DONE, IS_PENDING, TOrderItem } from '../../utils/type';
import { useFeed } from '../../services/hooks/feed';

const Feed:FC = () => {
    const { feed } = useFeed();
    const showOrders = useCallback((status:string[], maxRow:number = 10, maxCol:number = 3) => {
        const filtered = feed.orders.filter(order => status.includes(order.status));
        let group: TOrderItem[][] = [];

        for (let i = 0, j = 0; i < filtered.length; i++) {
            if (i >= maxRow && i % maxRow === 0) {
                j++;
            }

            group[j] = group[j] || [];
            // @ts-ignore
            group[j].push(filtered[i]);
        }

        return group.map((item:TOrderItem[], index: number) => {
            if (index < maxCol) {
                return (
                    <ul key={index}>
                        {item.map((child:TOrderItem, childIndex: number) => {
                            return <li key={`${index}-${childIndex}`}>{child.number}</li>
                        })}
                    </ul>
                );
            }
            return null;
        });

    }, [feed.orders]);

    if (feed.request) {
        return <LoadMask> Загрузка лента заказов ...</LoadMask>;
    }

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.column}>
                <h1 className={'text text_type_main-large mt-10 mb-5'}>
                    Лента заказов
                </h1>
                <div className={'overflow-auto custom-scroll'}>
                    {feed.orders.map((item: TOrderItem) => {
                       return <OrderItem key={item._id} order={item}/>;
                    })}
                </div>
            </div>
            <div className={styles.split}></div>
            <div className={`${styles.column} mt-25 overflow-auto custom-scroll`}>
                <div className={`${styles.progress} mb-15`}>
                    <div className={'col'}>
                        <div className={'text text_type_main-medium pb-6'}>
                            Готовы:
                        </div>
                        <div className={styles.ready}>
                            {showOrders([IS_DONE])}
                        </div>
                    </div>
                    <div className={'col-split-mini'}></div>
                    <div className={'col'}>
                        <div className={'text text_type_main-medium pb-6'}>
                            В работе:
                        </div>
                        <div className={styles.pending}>
                            {showOrders([IS_PENDING, IS_CREATED])}
                        </div>
                    </div>
                </div>

                <div className={'text text_type_main-medium mb-4'}>
                    Выполнено за все время:
                </div>
                <div className={'text text_type_digits-large mb-15'}>
                    {feed.total}
                </div>

                <div className={'text text_type_main-medium mb-4'}>
                    Выполнено за сегодня:
                </div>

                <div className={'text text_type_digits-large'}>
                    {feed.totalToday}
                </div>
            </div>
        </div>
    );
}

export default Feed;