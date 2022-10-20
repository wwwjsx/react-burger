import React, { FC } from 'react';
import styles from './Feed.module.css';
import OrderItem from '../order/OrderItem';
import LoadMask from '../modal/LoadMask';
import { IS_CREATED, IS_DONE, IS_PENDING, TOrderItem } from '../../utils/type';
import { useFeed } from '../../services/hooks/feed';

const Feed:FC = () => {
    const { feed } = useFeed();

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
                        <ul className={styles.ready}>
                            {feed.orders.map((item: any, index: number) => {
                                if (index < 5 && item.status === IS_DONE) {
                                    return <li key={item._id}>{item.number}</li>;
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                    <div className={'col-split-mini'}></div>
                    <div className={'col'}>
                        <div className={'text text_type_main-medium pb-6'}>
                            В работе:
                        </div>
                        <ul>
                            {feed.orders.map((item: TOrderItem, index: number) => {
                                if (index < 5 && (item.status === IS_PENDING || item.status === IS_CREATED)) {
                                    return <li key={item._id}>{item.number}</li>;
                                }
                                return null;
                            })}
                        </ul>
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