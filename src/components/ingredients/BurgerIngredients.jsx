import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './Ingredient';
import Modal from '../modal/Modal';
import IngredientDetails from './IngredientDetails';
import CommonPropTypes from '../../utils/common/PropTypes';

const BurgerIngredients = (props) => {
    const [activeTab, setActiveTab] = React.useState('main');
    const [ingredient, setIngredient] = React.useState({});
    const [isModal, setIsModal] = React.useState(false);
    const refMain = React.useRef();
    const refSauce = React.useRef();
    const refBun = React.useRef();
    const ingredients = props.ingredients;

    // tab active event handler
    const handleActiveTab = (tab, ref) => {
        setActiveTab(tab);
        ref.current.scrollIntoView({behavior: 'smooth'});
    };

    // show ingredient item click event handler
    const handleClickIngredient = (item) => {
        setIngredient(item);

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
                        {...item}
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
                        value="main"
                        active={activeTab === 'main'}
                        onClick={() => handleActiveTab('main', refMain)}>
                        Основной
                    </Tab>
                    <Tab
                        value="sauce"
                        active={activeTab === 'sauce'}
                        onClick={() => handleActiveTab('sauce', refSauce)}>
                        Соусы
                    </Tab>
                    <Tab
                        value="bun"
                        active={activeTab === 'bun'}
                        onClick={() => handleActiveTab('bun', refBun)}>
                        Булки
                    </Tab>
                </div>
            </div>

            {/* ingredients scrollable content */}
            <div className={`${styles.content} custom-scroll`}>
                {renderTab('Основной', 'main', refMain)}
                {renderTab('Соусы', 'sauce', refSauce)}
                {renderTab('Булки', 'bun', refBun)}
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

BurgerIngredients.propTypes = {
    ingredients: CommonPropTypes.ingredientsArrayType
}

export default BurgerIngredients;