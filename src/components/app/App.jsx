import React from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../header/AppHeader';
import BurgerConstructor from '../constructor/BurgerConstructor';
import BurgerIngredients from '../ingredients/BurgerIngredients';
import LoadMask from '../modal/LoadMask';
import AlertModal from '../modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_INGREDIENT_REQUEST } from '../../services/actions/ingredients';
import { getIngredients } from '../../utils/api/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
    const dispatch = useDispatch();
    const {
        ingredientsFail,
        ingredientsError,
        ingredientsRequest
    } = useSelector(state => state.ingredients);

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    // close alert popup
    const handleCloseAlert = () => {
        dispatch({ type: RESET_INGREDIENT_REQUEST });
    };

    return (
        <div className={styles.App}>
            <AppHeader />
            <div className={`container ${styles.container}`}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <div className={'col-split'}></div>
                    <BurgerConstructor/>
                </DndProvider>
            </div>

            {ingredientsRequest && <LoadMask />}

            {ingredientsFail &&
                <AlertModal  onClose={handleCloseAlert}>
                    {ingredientsError}
                </AlertModal>
            }
        </div>
    );
}

export default App;
