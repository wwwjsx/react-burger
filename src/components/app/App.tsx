import React from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../header/AppHeader';
import BurgerConstructor from '../constructor/BurgerConstructor';
import BurgerIngredients from '../ingredients/BurgerIngredients';
import LoadMask from '../modal/LoadMask';
import AlertModal from '../modal/AlertModal';
import { INGREDIENTS_URL} from '../../utils/common/Contstants';
import { checkResponse } from '../../utils/Response';
import { IngiredientsContext } from '../../utils/Context';

function App() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [ingredients, setIngredients] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const isErrorMessage = Boolean(errorMessage);

    React.useEffect(() => {
        setIsLoading(true);

        fetch(INGREDIENTS_URL)
            .then(checkResponse)
            .then((json) => {
                setIngredients(json.data);
            })
                .catch((err) => {
                setErrorMessage(err.message || err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className={styles.App}>
            <AppHeader />
            <div className={`container ${styles.container}`}>
                <IngiredientsContext.Provider value={{ ingredients, isLoading }}>
                    <BurgerIngredients/>
                    <div className={'col-split'}></div>
                    <BurgerConstructor/>
                </IngiredientsContext.Provider>
            </div>
            <LoadMask show={isLoading}/>
            <AlertModal onClose={() => setErrorMessage('')} show={isErrorMessage}>
                {errorMessage}
            </AlertModal>
        </div>
    );
}

export default App;
