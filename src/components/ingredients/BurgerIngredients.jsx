import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './Ingredient';
import Modal from '../modal/Modal';
import IngredientDetails from './IngredientDetails';
import {useDispatch, useSelector} from 'react-redux';
import {SET_INGREDIENT} from '../../services/actions/ingredients';

const BurgerIngredients = () => {
    const { ingredients } = useSelector(store => store.ingredients);
    const [activeTab, setActiveTab] = React.useState('bun');
    const ingredient = useSelector(store => store.ingredients.ingredient);
    const [isModal, setIsModal] = React.useState(false);
    const refMain = React.useRef();
    const refSauce = React.useRef();
    const refBun = React.useRef();
    const dispatch = useDispatch();

    // tab active event handler
    const handleActiveTab = (tab, ref) => {
        setActiveTab(tab);
        ref.current.scrollIntoView({behavior: 'smooth'});
    };

    // show ingredient item click event handler
    const handleClickIngredient = (item) => {
        dispatch({
            type: SET_INGREDIENT,
            payload: item
        });
        // show ingredient modal popup
        setIsModal(true);
    };

    // render each blocks ingredient items
    const renderItems = (type) => {
        return ingredients.filter(item => item.type === type)
            .map((item) => {
                return (
                    <Ingredient
                        key={item._id}
                        onClick={() => handleClickIngredient(item)}
                        item={item}
                    />
                );
            });
    };

    // render ingredient tab
    const renderTab = (title, type, ref) => {
        return (
            <div className={'mt-10'}>
                <h2 className="text text_type_main-medium mb-6" ref={ref}>
                    {title}
                </h2>
                <div className={styles.box}>
                    {renderItems(type)}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.column}>
            <div className={styles.header}>
                <h1 className={'text text_type_main-large mb-5'}>
                    Соберите бургер
                </h1>

                {/* ingredients tabs */}
                <div className="display-flex">
                    <Tab
                        value="bun"
                        active={activeTab === 'bun'}
                        onClick={() => handleActiveTab('bun', refBun)}>
                        Булки
                    </Tab>
                    <Tab
                        value="sauce"
                        active={activeTab === 'sauce'}
                        onClick={() => handleActiveTab('sauce', refSauce)}>
                        Соусы
                    </Tab>
                    <Tab
                        value="main"
                        active={activeTab === 'main'}
                        onClick={() => handleActiveTab('main', refMain)}>
                        Начинки
                    </Tab>
                </div>
            </div>

            {/* ingredients scrollable content */}
            <div className={`${styles.content} custom-scroll`}>
                {renderTab('Булки', 'bun', refBun)}
                {renderTab('Соусы', 'sauce', refSauce)}
                {renderTab('Начинки', 'main', refMain)}
            </div>

            <Modal
                show={isModal}
                width={720}
                height={540}
                onClose={() => setIsModal(false)}
            >
                {ingredient && ingredient._id &&
                    <IngredientDetails ingredient={ingredient}/>
                }
            </Modal>
        </div>
    );
};

export default BurgerIngredients;