import React from 'react';
import styles from './BurgerConstructor.module.css';
import Modal from '../modal/Modal';
import OrderDetails from './OrderDetails';
import {ConstructorElement, Button, CurrencyIcon, DragIcon}
    from '@ya.praktikum/react-developer-burger-ui-components';
import { IngiredientsContext } from '../../utils/Context';
import { ORDERS_URL } from '../../utils/common/Contstants';
import LoadMask from "../modal/LoadMask";
import {checkResponse} from "../../utils/Response";
import AlertModal from "../modal/AlertModal";

const initialTotal = {
    total: 0
};

const totalReducer = (state, action) => {
    switch (action.type) {
        case 'set':
            return { total: action.payload };
        default:
            return state;
    }
};

const BurgerConstructor = () => {
    const BUN_TYPE = 'bun';
    const [isModal, setIsModal] = React.useState(false);
    const { ingredients, isLoading } = React.useContext(IngiredientsContext);
    const [bun, setBun] = React.useState(null);
    const [fillings, setFillings] = React.useState([]);
    const [totalState, totalDispatch] = React.useReducer(totalReducer, initialTotal, undefined);
    const [isOrderLoading, setOrderIsLoading] = React.useState(false);
    const [orderLoadErrorMessage, setOrderLoadErrorMessage] = React.useState(null);
    const [orderDetails, setOrderDetails] = React.useState(null);
    const isErrorMessage = Boolean(orderLoadErrorMessage);

    // returns random ingredient bun - it must be once
    const getRandomBun = () => {
        const items = ingredients.filter((item) => item.type === BUN_TYPE);
        const len = items.length;
        const index = Math.floor(Math.random() * len);
        return items[index];
    };

    // returns random ingredient fillings
    const getRandomFillings = () => {
        const min = 2; // minimum 2 ingredients
        const items = ingredients.filter(item => item.type !== BUN_TYPE); // skip bun type
        const len = items.length;
        const max = Math.floor(Math.random() * (len - min) + min);
        const random = [];

        for (let i = 0; i < max; i++) {
            if (items[i]) {
                random.push(items[i]);
            }
        }

        return random;
    };

    React.useEffect(() => {
        const bun = getRandomBun();
        const fillings = getRandomFillings();

        let totalPrice = 0;

        if (bun) {
            totalPrice += bun.price * 2; // bun uses twice
            setBun(bun);
        }

        if (fillings) {
            // calculate fillings total price
            fillings.forEach((item) => {
                totalPrice += item.price;
            });
            setFillings(fillings);
        }

        totalDispatch({
            type: 'set',
            payload: totalPrice,
        });

    }, [isLoading]);

    // render bun ingredient
    const renderBun = (type) => {
        if (bun) {
            return (
                <div className={styles.element}>
                    <div className={styles.elementIcon}></div>
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
            );
        }

        return null;
    };

    const handleOrder = () => {
        const ingredientsIds = [];

        // collect random bun id
        if (bun) {
            ingredientsIds.push(bun._id);
        }

        // collect random fillings id
        if (fillings) {
            fillings.forEach((item) => {
                ingredientsIds.push(item._id);
            });
        }

        setOrderIsLoading(true);

        fetch(ORDERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: ingredientsIds,
            })
        })
        .then(checkResponse)
        .then((json) => {
            setIsModal(true);
            setOrderDetails(json);
        })
        .catch((err) => {
            setOrderLoadErrorMessage(err.message || err);
        })
        .finally(() => {
            setOrderIsLoading(false);
        });
    };

    return (
        <div className={`${styles.column} pt-25`}>
            <div className={'mb-4'}>
                {renderBun('top')}
            </div>
            <div className={`${styles.scrollContent} custom-scroll`}>
                {fillings.map((item) => {
                    return (
                        <div className={styles.element} key={item._id}>
                            <div className={styles.elementIcon}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={'mt-4'}>
                {renderBun('bottom')}
            </div>
            <div className={`${styles.order} pt-10 pr-6 pb-6`}>
                <span className={`${styles.price} text text_type_main-medium`}>
                    {totalState.total} <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>
                {orderDetails &&
                    <Modal
                        show={isModal}
                        width={720}
                        height={718}
                        onClose={() => setIsModal(false)}
                    >
                        <OrderDetails order={orderDetails.order}/>
                    </Modal>
                }
                <LoadMask show={isOrderLoading}> Загрузка заказа ... </LoadMask>
                <AlertModal onClose={() => setOrderLoadErrorMessage('')} show={isErrorMessage}>
                    {orderLoadErrorMessage}
                </AlertModal>
            </div>
        </div>
    );
};

export default BurgerConstructor;