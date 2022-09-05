import React from 'react';
import styles from './BurgerConstructor.module.css';
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png';
import Modal from '../modal/Modal';
import OrderDetails from './OrderDetails';
import {ConstructorElement, Button, CurrencyIcon, DragIcon}
    from '@ya.praktikum/react-developer-burger-ui-components';
import CommonPropTypes from '../common/PropTypes';

const BurgerConstructor = (props) => {
    const [isModal, setIsModal] = React.useState(false);
    const { ingredients } = props;

    return (
        <div className={`${styles.column} pt-25`}>
            <div className={'mb-4'}>
                <div className={styles.element}>
                    <div className={styles.elementIcon}></div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
            </div>
            <div className={`${styles.scrollContent} custom-scroll`}>
                {ingredients.map((item) => {
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
                <div className={styles.element}>
                    <div className={styles.elementIcon}></div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
            </div>
            <div className={`${styles.order} pt-10 pr-6 pb-6`}>
                <span className={`${styles.price} text text_type_main-medium`}>
                    600 <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={() => setIsModal(true)}>
                    Оформить заказ
                </Button>
                <Modal
                    show={isModal}
                    width={720}
                    height={718}
                    onClose={() => setIsModal(false)}
                >
                    <OrderDetails/>
                </Modal>
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: CommonPropTypes.ingredientsType
}

export default BurgerConstructor;