import { FC, useMemo } from 'react';
import styles from './OrderItem.module.css';
import moment from 'moment';
import { useSelector } from '../../services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { TIngredient, TOrderItem } from '../../utils/type';
import { getStatus } from '../../utils/helper';

interface IOrderItem {
  readonly order: TOrderItem;
  isStatus?: boolean;
}

const OrderItem:FC<IOrderItem> = ({ order, isStatus }) => {
    const MAX_ITEMS = 6;
    const burger = useSelector(state => state.ingredients);
    const orders = useMemo(() => {
        let price = 0;
        const images:TIngredient[] = [];

        order.ingredients.forEach((id) => {
            const find = burger.ingredients.find((ingredient) => ingredient._id === id);

            if (find) {
                const clone = {...find};
                const image = images.find((item:TIngredient) => item._id === id);

                price += clone.price;

                if (image && typeof image.count !== 'undefined') {
                    image.count += 1;
                } else {
                    clone.count = 1;
                    images.push(clone);
                }
            }
        });

        let maxZIndex = MAX_ITEMS;
        let count = 0;
        let items = images.map((item:TIngredient, index:number) => {
            maxZIndex --;
            count ++;
            return (
                <div key={index} className={styles.thumb} style={{
                    backgroundImage: `url(${item.image_mobile})`,
                    zIndex: maxZIndex
                }}>
                    <span className={'text text_type_main-default'}>
                        {count >= MAX_ITEMS ? (
                            images.length - MAX_ITEMS > 0 ? `+${images.length - MAX_ITEMS}` : ''
                        ) : ('')}
                    </span>
                </div>
            );
        });

        items = items.slice(0, MAX_ITEMS);

        return {
            items,
            price
        }
    }, [order.ingredients]);

    return (
        <div className={styles.block}>
            <div className={`${styles.meta} mb-6 text text_type_main-default`}>
                <div className={`${styles.number} `}>
                    #{order.number}
                </div>
                <div className={`${styles.date} text_color_inactive`}>
                    {moment(order.createdAt).calendar()}
                </div>
            </div>
            <div className={`text text_type_main-medium ${isStatus ? 'mb-4' : 'mb-6'}`}>
                <Link to={{
                    pathname: isStatus ? `/profile/orders/${order._id}` : `/feed/${order._id}`,
                    state: {
                        order: order
                    }
                }} className={'text_color_primary'}>{order.name}</Link>
            </div>
            {isStatus &&
                <div className={'mb-6 text text_type_main-default'}>{getStatus(order.status)}</div>
            }
            <div className={styles.info}>
                <div className={styles.orders}>
                    {orders.items}
                </div>
                <div className={`align-center ml-6`}>
                    <div className={'price-icon'}>
                        <span className={'text text_type_digits-default mr-2'}>
                            {orders.price}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
