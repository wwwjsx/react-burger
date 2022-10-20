import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from '../app/App.module.css';
import BurgerIngredients from '../ingredients/BurgerIngredients';
import BurgerConstructor from '../constructor/BurgerConstructor';
import React from 'react';

const Main:FC = () => {
    return (
        <React.Fragment>
            <DndProvider backend={HTML5Backend}>
                <div className={`container ${styles.container}`}>
                    <BurgerIngredients/>
                    <div className={'col-split'}></div>
                    <BurgerConstructor/>
                </div>
            </DndProvider>
        </React.Fragment>
    );
};

export default Main;