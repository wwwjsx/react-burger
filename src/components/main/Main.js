import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from '../app/App.module.css';
import BurgerIngredients from '../ingredients/BurgerIngredients';
import BurgerConstructor from '../constructor/BurgerConstructor';
import LoadMask from '../modal/LoadMask';
import AlertModal from '../modal/AlertModal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetIngredientsRequest } from '../../services/slices/ingredients';

const Main = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients);

    // close alert popup
    const handleCloseAlert = () => {
        dispatch(resetIngredientsRequest());
    };

    return (
        <React.Fragment>
            <DndProvider backend={HTML5Backend}>
                <div className={`container ${styles.container}`}>
                    <BurgerIngredients/>
                    <div className={'col-split'}></div>
                    <BurgerConstructor/>
                </div>
            </DndProvider>

            {ingredients.request && <LoadMask />}

            {ingredients.fail &&
                <AlertModal  onClose={handleCloseAlert}>
                    {ingredients.message}
                </AlertModal>
            }
        </React.Fragment>
    );
};

export default Main;