import React from 'react';
import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/header/AppHeader';
import BurgerConstructor from './components/constructor/BurgerConstructor';
import BurgerIngredients from './components/ingredients/BurgerIngredients';
import LoadMask from './components/modal/LoadMask';
import AlertModal from './components/modal/AlertModal';
import { INGREDIENTS_URL} from './utils/common/Contstants';
import { checkResponse } from './utils/Response';

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
                .catch((e) => {
                setErrorMessage(e.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="App">
            <AppHeader />
            <div className={'container'}>
                <BurgerIngredients ingredients={ingredients}/>
                <div className={'col-split'}></div>
                <BurgerConstructor ingredients={ingredients}/>
            </div>
            <LoadMask show={isLoading}/>
            <AlertModal onClose={() => setErrorMessage('')} show={isErrorMessage}>
                <b>{errorMessage}</b>
            </AlertModal>
        </div>
    );
}

export default App;
