import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './Ingredient';
import Modal from '../modal/Modal';
import IngredientDetails from './IngredientDetails';
import CommonPropTypes from '../common/PropTypes';

const BurgerIngredients = (props) => {
    const [activeTab, setActiveTab] = React.useState('main');
    const [ingredient, setIngredient] = React.useState({});
    const [isModal, setIsModal] = React.useState(false);
    const ingredients = props.ingredients;

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
        window.location.hash = `#${tab}`;
    };

    // show ingredient item click event handler
    const handleClickIngredient = (e) => {
        const el = e.currentTarget;
        const id = el.getAttribute('data-id');
        const findItem = ingredients.find(item => item._id === id);

        e.preventDefault(); // prevent anchor hash

        if (findItem) {
            setIngredient(findItem);

            // show ingredient modal popup
            setIsModal(true);
        }
    };

    // render each blocks ingredient items
    const renderItems = (type) => {
        return ingredients.filter(item => item.type === type)
            .map((item) => {
                return (
                    <Ingredient
                        key={item._id}
                        onClick={handleClickIngredient}
                        {...item}
                    />
                );
            });
    };

    // render ingredient tab
    const renderTab = (title, type) => {
        return (
            <div className={'mt-10'}>
                <h2 className="text text_type_main-medium mb-6">
                    {title}
                    <a name={type}></a>
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
                    <Tab value="main" active={activeTab === 'main'} onClick={handleActiveTab}>
                        Основной
                    </Tab>
                    <Tab value="sauce" active={activeTab === 'sauce'} onClick={handleActiveTab}>
                        Соусы
                    </Tab>
                    <Tab value="bun" active={activeTab === 'bun'} onClick={handleActiveTab}>
                        Булки
                    </Tab>
                </div>
            </div>

            {/* ingredients scrollable content */}
            <div className={`${styles.content} custom-scroll`}>
                {renderTab('Основной', 'main')}
                {renderTab('Соусы', 'sauce')}
                {renderTab('Булки', 'bun')}
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
    ingredients: CommonPropTypes.ingredientsType
}

export default BurgerIngredients;