import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import styles from './OrderItemDetails.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import moment from 'moment';
import { getStatus } from '../../utils/helper';
import {TIngredient, TOrderItem} from '../../utils/type';

interface IFeedDetails {
    order: TOrderItem,
    isModal?: boolean
}

const OrderItemDetails:FC<IFeedDetails> = ({ order, isModal }) => {
    const burger = useSelector(store => store.ingredients);
    const ingredients = useMemo(() => {
        const items: TIngredient[] = [];
        let total = 0;

        order.ingredients.forEach((id) => {
            const find = burger.ingredients.find(ingredient => ingredient._id === id);

            if (find) {
                const clone = {...find};
                const same = items.find((item:TIngredient) => item._id === id);
                let count = 1;

                if (same) {
                    count = same.count || 1;
                    count ++;
                    same.count = count;
                } else {
                    clone.count = count;
                    items.push(clone);
                }
            }
        });

        items.forEach((item:TIngredient) => {
           total += item.price * (item.count || 1);
        });

        return {
            total,
            items
        };
    }, [order, burger]);

    return (
        <div className={'pt-5 pr-10 pb-5 pl-10 text_color_primary'} style={{
            marginRight: 'auto',
            marginLeft: 'auto'
        }}>
            <div className={'text text_type_main-default text-center mb-6'}>
                #{order.number}
            </div>
            <div className={`${isModal ? styles.name : ''} text text_type_main-medium mb-3`}>
                {order.name}
            </div>
            <div className={'text text_type_main-default text-info mb-10'}>
                {getStatus(order.status)}
            </div>
            <div className={'text text_type_main-medium mb-6'}>
                Состав:
            </div>
            <div className={`${isModal ? styles.items : ''} overflow-auto custom-scroll mb-4`}>
                {ingredients.items.map((item:TIngredient) => {
                    return (
                        <div key={item._id} className={styles.item}>
                            <div style={{
                                backgroundImage: `url(${item.image_mobile})`
                            }} className={styles.thumb}>

                            </div>
                            <div className={`${styles.itemTitle} text text_type_main-default`}>
                                {item.name}
                            </div>
                            <div className={`align-center text text_type_digits-default`}>
                                <div className={'price-icon'}>
                                    <span className={'mr-2'}>
                                        {item.count} x {item.price}
                                    </span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.info}>
                <div className={'col text text_type_main-default text_color_inactive'}>
                    {moment(order.createdAt).calendar()}
                </div>
                <div className={`col text-right`}>
                    <div className={'price-icon'}>
                        <span className={'text text_type_digits-default mr-2'}>{ingredients.total}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItemDetails;