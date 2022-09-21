import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import IngredientDetails from './IngredientDetails';
import {useDispatch, useSelector} from 'react-redux';
import {SET_INGREDIENT} from '../../services/actions/ingredients';
import IngredientTab from "./IngredientTab";

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

    // close ingredient modal popup
    const handleCloseIngredientModal = () => {
        setIsModal(false);
    };

    // handle constructor ingredients scroll event
    const handleScroll = (e) => {
        const top = e.target.scrollTop + e.target.offsetTop;

        const calc = (ref) => {
            const el = ref.current;
            const elBox = el.nextSibling;
            const height = elBox.scrollHeight;
            const offset = el.offsetTop;

            return top >= offset && top <= offset + height;
        };

        if (calc(refSauce)) {
            setActiveTab('sauce');
        } else if (calc(refMain)) {
            setActiveTab('main');
        } else {
            setActiveTab('bun');
        }
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
            <div className={`${styles.content} custom-scroll`} onScroll={handleScroll}>
                <IngredientTab
                    ingredients={ingredients}
                    title={'Булки'}
                    type={'bun'}
                    reference={refBun}
                    onClick={handleClickIngredient}
                />
                <IngredientTab
                    ingredients={ingredients}
                    title={'Соусы'}
                    type={'sauce'}
                    reference={refSauce}
                    onClick={handleClickIngredient}
                />
                <IngredientTab
                    ingredients={ingredients}
                    title={'Начинки'}
                    type={'main'}
                    reference={refMain}
                    onClick={handleClickIngredient}
                />
            </div>

            {isModal &&
                <Modal
                    width={720}
                    height={540}
                    onClose={handleCloseIngredientModal}
                >
                    {ingredient && ingredient._id &&
                        <IngredientDetails ingredient={ingredient}/>
                    }
                </Modal>
            }
        </div>
    );
};

export default BurgerIngredients;