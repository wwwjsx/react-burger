import React from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../header/AppHeader';
import BurgerConstructor from '../constructor/BurgerConstructor';
import BurgerIngredients from '../ingredients/BurgerIngredients';
import LoadMask from '../modal/LoadMask';
import AlertModal from '../modal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
    const [isErrorModal, setIsErrorModal] = React.useState(false);
    const {
        ingredientsFail,
        ingredientsError,
        ingredientsRequest
    } = useSelector(state => state.ingredients);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setIsErrorModal(ingredientsFail);
    }, [ingredientsError]);

    React.useEffect(() => {
        dispatch(getIngredients());
    }, []);

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
            <LoadMask show={ingredientsRequest}/>
            <AlertModal onClose={(e) => setIsErrorModal(false)} show={isErrorModal}>
                {ingredientsError}
            </AlertModal>
        </div>
    );
}

export default App;
