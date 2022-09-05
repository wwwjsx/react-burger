import React from 'react';
import './App.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/header/AppHeader';
import BurgerConstructor from './components/constructor/BurgerConstructor';
import BurgerIngredients from './components/ingredients/BurgerIngredients';
import LoadMask from './components/modal/LoadMask';
import Alert from './components/modal/Alert';
import { INGREDIENTS_URL} from './components/common/Contstants';

function App() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [ingredients, setIngredients] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => {
        const loadError = 'Ошибка загрузка данных';

        setIsLoading(true);

        fetch(INGREDIENTS_URL)
            .then(async response => {
                const json = await response.json();

                if (response.ok) {
                    setIngredients(json.data);
                } else {
                    setErrorMessage(loadError);
                }

                setIsLoading(false);
            }).catch((e) => {
                setErrorMessage(loadError);
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
            <Alert onClose={() => setErrorMessage('')}>{errorMessage}</Alert>
        </div>
    );
}

export default App;
