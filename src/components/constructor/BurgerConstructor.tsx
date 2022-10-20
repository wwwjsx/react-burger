import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BUN_TYPE, MOVE_COMPONENT_DRAG_TYPE } from '../../services/constants/common';
import Modal from '../modal/Modal';
import OrderDetails from './OrderDetails';
import { CurrencyIcon }
    from '@ya.praktikum/react-developer-burger-ui-components';
import {DropTargetMonitor, useDrop} from 'react-dnd';
import LoadMask from '../modal/LoadMask';
import Alert from '../modal/Alert';
import { useDispatch, useSelector } from '../../services/store';
import ElementWrapper from './ElementWrapper';
import styles from './BurgerConstructor.module.css';
import ElementBun from './ElementBun';
import {
    removeIngredient,
    setBun,
    addIngredient,
    moveIngredient,
    clearIngredients
} from '../../services/slices/burger';
import { orderThunk, resetOrderRequest } from '../../services/slices/order';
import { useAuth } from '../../services/hooks/auth';
import { useHistory } from 'react-router-dom';
import { resetIngredientsCount, updateIngredientCount } from '../../services/slices/ingredients';
import {
    ADD_INGREDIENT_COUNT,
    REMOVE_INGREDIENT_COUNT,
    SET_INGREDIENT_COUNT_BUN
} from '../../services/constants/ingredients';
import {TIngredient, TIngredientUid} from '../../utils/type';
import { Button } from '../Button';

const BurgerConstructor:FC = () => {
    const dispatch = useDispatch();
    const {
        ingredients
    } = useSelector(store => store.ingredients);
    const history = useHistory();
    const auth = useAuth();
    const order = useSelector(store => store.order);
    const burger = useSelector(store => store.burger);
    const [isOrderModal, setIsOrderModal] = useState(false);
    const [{ isHover, isBunHover }, dropRef] = useDrop(() => ({
        accept: MOVE_COMPONENT_DRAG_TYPE,
        collect: (monitor: DropTargetMonitor) => {
            const item:TIngredient = monitor.getItem();
            const isBun = item && item.type === BUN_TYPE;
            return {
                isBunHover: isBun && monitor.isOver(),
                isHover: monitor.isOver()
            }
        },
        drop(item: TIngredientUid) {
            if (!item) {
                return;
            }

            if (item.type === BUN_TYPE) {
                dispatch(setBun({...item}));
                dispatch(updateIngredientCount({
                    id: item._id,
                    type: SET_INGREDIENT_COUNT_BUN,
                }));
            } else {
                item.uuid = uuidv4();
                dispatch(addIngredient({...item}));
                dispatch(updateIngredientCount({
                    id: item._id,
                    type: ADD_INGREDIENT_COUNT,
                }));
            }
        }
    }), [ingredients]);

    // move constructor elements up or down
    const moveCard = React.useCallback((dragIndex:number, hoverIndex:number) => {
        dispatch(moveIngredient({
            dragIndex,
            hoverIndex
        }))

    }, [dispatch]);

    // load user order data
    const handleOrder = async () => {
        const ids = [];

        // collect random bun id
        if (burger.bun) {
            ids.push(burger.bun._id);
            ids.push(burger.bun._id);
        }

        // collect random fillings id
        if (burger.ingredients) {
            burger.ingredients.forEach((item) => {
                ids.push(item._id);
            });
        }

        if (auth.isLogged) {
            const result = await auth.refresh();

            dispatch(orderThunk({
                body: {
                    ingredients: ids
                },
                token: result.accessToken
            })).then((res) => {
                if (res && res.payload && res.payload.success) {
                    setIsOrderModal(true);
                    dispatch(clearIngredients());
                    dispatch(resetIngredientsCount());
                }
            });
        } else {
            history.push({
               pathname: '/login'
            });
        }
    };

    // handle "remove" constructor element
    const handleClose = (item:TIngredient) => {
        dispatch(removeIngredient(item));
        dispatch(updateIngredientCount({
            id: item._id,
            type: REMOVE_INGREDIENT_COUNT,
        }));
    };

    // close order modal popup
    const handleCloseModalOrder = () => {
        setIsOrderModal(false);
    };

    // close alert modal popup
    const handleCloseAlert = () => {
        dispatch(resetOrderRequest());
    };

    // scrollable element CSS classes
    const contentCls = React.useMemo(() => {
        let cls = `${styles.content} custom-scroll`;

        if (isHover && !isBunHover) {
            cls += ` ${burger.ingredients.length > 0
                ? styles.dropHover
                : styles.dropEmptyHover}`;
        }

        return cls
    }, [isHover, isBunHover]);

    return (
        <div className={`${styles.column} pt-25`}>
            <div className={styles.dropBox} ref={dropRef}>
                <div className={'mb-4'}>
                    <ElementBun
                        item={burger.bun}
                        type={'top'}
                        isHover={isBunHover}
                    />
                </div>
                <div className={contentCls}>
                    { burger.ingredients.length > 0 &&
                        burger.ingredients.map((item, index) => {
                            return <ElementWrapper
                                key={item.uuid}
                                item={item}
                                index={index}
                                moveCard={moveCard}
                                handleClose={() => handleClose(item)}
                            />
                    })}

                    { burger.ingredients.length < 1 &&
                        <div className={`empty ${styles.emptyElement} ${styles.middle}`}>
                            Пожалуйста, перетащите сюда ингредиенты
                        </div>
                    }
                </div>
                <div className={'mt-4'}>
                    <ElementBun
                        item={burger.bun}
                        type={'bottom'}
                        isHover={isBunHover}
                    />
                </div>
            </div>
            <div className={`${styles.order} pt-10 pr-6 pb-6`}>
                { burger.bun && burger.ingredients.length > 0 &&
                    <React.Fragment>
                        <span className={`${styles.price} text text_type_main-medium`}>
                            {burger.totalPrice} <CurrencyIcon type="primary" />
                        </span>
                        <Button type="primary" size="large" onClick={handleOrder}>
                            Оформить заказ
                        </Button>
                    </React.Fragment>
                }

                <React.Fragment>
                    {isOrderModal &&
                        <Modal
                            width={720}
                            height={718}
                            onClose={handleCloseModalOrder}
                        >
                            <OrderDetails order={order.order}/>
                        </Modal>
                    }

                    {(order.request || auth.request) &&
                        <LoadMask> Загрузка заказа ... </LoadMask>
                    }

                    {order.failed &&
                        <Alert onClose={handleCloseAlert}>
                            {order.message}
                        </Alert>
                    }
                </React.Fragment>
            </div>
        </div>
    );
};

export default BurgerConstructor;