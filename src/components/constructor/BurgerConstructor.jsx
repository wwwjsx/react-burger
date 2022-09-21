import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    ADD_CONSTRUCTOR_ELEMENT,
    MOVE_CONSTRUCTOR_ELEMENT,
    REMOVE_CONSTRUCTOR_ELEMENT,
    SET_BUN, SET_ORDER_TOTAL_PRICE
} from '../../services/actions/ingredients';
import { BUN_TYPE, MOVE_COMPONENT_DRAG_TYPE } from '../../utils/common/Contstants';
import Modal from '../modal/Modal';
import OrderDetails from './OrderDetails';
import { Button, CurrencyIcon }
    from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import LoadMask from '../modal/LoadMask';
import AlertModal from '../modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../utils/api/order';
import ElementWrapper from './ElementWrapper';
import styles from './BurgerConstructor.module.css';
import ElementBun from "./ElementBun";

const BurgerConstructor = () => {
    const {
        ingredients,
        constructorBun,
        constructorElements,
        orderTotalPrice
    } = useSelector(store => store.ingredients);
    const { order, orderError, orderRequest, orderFail } = useSelector(store => store.order);
    const [isOrderModal, setIsOrderModal] = React.useState(false);
    const [isErrorModal, setIsErrorModal] = React.useState(false);
    const dispatch = useDispatch();
    const [{ isHover, isBunHover }, dropRef] = useDrop(() => ({
        accept: MOVE_COMPONENT_DRAG_TYPE,
        collect: (monitor) => {
            const item = monitor.getItem();
            const isBun = item && item.type === BUN_TYPE;
            return {
                isBunHover: isBun && monitor.isOver(),
                isHover: monitor.isOver()
            }
        },
        drop(item) {
            if (!item) {
                return;
            }

            if (item.type === BUN_TYPE) {
                dispatch({
                    type: SET_BUN,
                    payload: {...item}
                });
            } else {
                item.uuid = uuidv4();
                dispatch({
                    type: ADD_CONSTRUCTOR_ELEMENT,
                    payload: {...item}
                });
            }
        }
    }), [ingredients]);

    // move constructor elements up or down
    const moveCard = React.useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_CONSTRUCTOR_ELEMENT,
            dragIndex,
            hoverIndex
        });

    }, [dispatch]);

    React.useEffect(() => {
        setIsOrderModal(!!order);
        setIsErrorModal(orderFail);
    }, [order, orderFail]);

    // calculate order total price
    React.useEffect(() => {
        let totalPrice = 0;

        if (constructorBun) {
            const bunPrice = constructorBun.price * 2;
            totalPrice += bunPrice; // bun uses twice
        }

        if (constructorElements) {
            let fillingsPrice = 0;

            // calculate fillings total price
            constructorElements.forEach((item) => {
                if (item) {
                    fillingsPrice += item.price;
                }
            });

            totalPrice += fillingsPrice;
        }

        dispatch({
            type: SET_ORDER_TOTAL_PRICE,
            payload: totalPrice,
        });

    }, [dispatch, constructorBun, constructorElements]);

    // load user order data
    const handleOrder = () => {
        const ids = [];

        // collect random bun id
        if (constructorBun) {
            ids.push(constructorBun._id);
        }

        // collect random fillings id
        if (constructorElements) {
            constructorElements.forEach((item) => {
                ids.push(item._id);
            });
        }

        dispatch(getOrder(ids));
    };

    // handle "remove" constructor element
    const handleClose = (item) => {
      dispatch({
          type: REMOVE_CONSTRUCTOR_ELEMENT,
          uuid: item.uuid
      });
    };

    // close order modal popup
    const handleCloseModalOrder = () => {
        setIsOrderModal(false);
    };

    // close alert modal popup
    const handleCloseAlertModal = () => {
        setIsErrorModal(false);
    };

    // scrollable element CSS classes
    const scrollCls = React.useMemo(() => {
        let cls = `${styles.scrollContent} custom-scroll`;

        if (isHover && !isBunHover) {
            cls += ` ${styles.dropHover}`;
        }

        return cls
    }, [isHover, isBunHover]);

    return (
        <div className={`${styles.column} pt-25`}>
            <div className={styles.dropBox} ref={dropRef}>
                <div className={'mb-4'}>
                    {constructorBun &&
                        <ElementBun
                            item={constructorBun}
                            type={'top'}
                            isHover={isBunHover}
                        />
                    }
                </div>
                <div className={scrollCls}>
                    {constructorElements.map((item, index) => {
                        return <ElementWrapper
                            key={item.uuid}
                            item={item}
                            index={index}
                            moveCard={moveCard}
                            handleClose={() => handleClose(item)}
                        />
                    })}
                </div>
                <div className={'mt-4'}>
                    {constructorBun &&
                        <ElementBun
                            item={constructorBun}
                            type={'bottom'}
                            isHover={isBunHover}
                        />
                    }
                </div>
            </div>
            <div className={`${styles.order} pt-10 pr-6 pb-6`}>
                <span className={`${styles.price} text text_type_main-medium`}>
                    {orderTotalPrice} <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>
                {isOrderModal &&
                    <Modal
                        width={720}
                        height={718}
                        onClose={handleCloseModalOrder}
                    >
                        <OrderDetails order={order}/>
                    </Modal>
                }

                {orderRequest &&
                    <LoadMask> Загрузка заказа ... </LoadMask>
                }

                {isErrorModal &&
                    <AlertModal onClose={handleCloseAlertModal}>
                        {orderError}
                    </AlertModal>
                }
            </div>
        </div>
    );
};

export default BurgerConstructor;