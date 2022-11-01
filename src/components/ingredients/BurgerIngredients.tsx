import React, { FC, MutableRefObject, SyntheticEvent } from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientTab from './IngredientTab';
import {useHistory} from "react-router-dom";
import { useSelector } from '../../services/store';
import {TIngredient} from "../../utils/type";
import { Tab } from '../Tab';

const BurgerIngredients:FC = () => {
    const history = useHistory();
    const { ingredients } = useSelector(store => store.ingredients);
    const [activeTab, setActiveTab] = React.useState('bun');
    const refMain = React.useRef() as React.MutableRefObject<HTMLHeadingElement>;
    const refSauce = React.useRef() as React.MutableRefObject<HTMLHeadingElement>;
    const refBun = React.useRef() as React.MutableRefObject<HTMLHeadingElement>;

    // show ingredient item click event handler
    const handleClickIngredient = (item:TIngredient) => {
        // dispatch(setIngredient(item));

        history.push({
            pathname: `/ingredients/${item._id}`,
            state: {
                ingredient: item
            }
        });
    };

    // handle constructor ingredients scroll event
    const handleScroll = (e: SyntheticEvent) => {
        const el = e.target as HTMLElement;
        const top = el.scrollTop + el.offsetTop;

        const calc = (ref:MutableRefObject<any>) => {
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

    const handleClickTab = (value:string) => {
        let ref = null;

        setActiveTab(value);

        switch (value) {
            case 'sauce':
                ref = refSauce;
                break;
            case 'main':
                ref = refMain;
                break;
            default:
                ref = refBun;
                break;
        }

        if (ref) {
            ref.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.column} data-testid='ingredients'>
            <div className={styles.header}>
                <h1 className={'text text_type_main-large mb-5'}>
                    Соберите бургер
                </h1>

                {/* ingredients tabs */}
                <div className="display-flex">
                    <Tab
                        value="bun"
                        active={activeTab === 'bun'}
                        onClick={handleClickTab}>
                        Булки
                    </Tab>
                    <Tab
                        value="sauce"
                        active={activeTab === 'sauce'}
                        onClick={handleClickTab}>
                        Соусы
                    </Tab>
                    <Tab
                        value="main"
                        active={activeTab === 'main'}
                        onClick={handleClickTab}>
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
        </div>
    );
};

export default BurgerIngredients;