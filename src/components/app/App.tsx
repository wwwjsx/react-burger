import React, { FC, useEffect } from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../header/AppHeader';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import ResetPassword from '../pages/reset-password/ResetPassword';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/notfound/NotFound';
import Main from '../main/Main';
import { useDispatch } from '../../services/store';
import Ingredient from '../pages/ingredient/Ingredient';
import { ingredientsThunk } from '../../services/slices/ingredients';
import { useAuth } from '../../services/auth';
import ProtectedRoute from '../route/ProtectedRoute';
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredients/IngredientDetails";
import {LocationState} from '../../utils/type';

const App:FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const auth = useAuth();
    const state = location.state as LocationState || {};
    const { ingredient } = state;

    const onBack = () => {
        history.goBack();
    };

    // if application force refresh by F5 or other methods
    useEffect(() => {
        if (!auth.user) {
            auth.refresh(true); // restore current user data
        }
        // eslint-disable-next-line
    }, [auth.user]);

    useEffect(() => {
        dispatch(ingredientsThunk());
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className={styles.App}>
                <AppHeader />
                <Switch>
                    <Route path={'/'} exact>
                        <Main />
                    </Route>
                    <Route path={'/order/list'} exact>
                        <div className={'container'}>{/* ORDER LIST */}</div>
                    </Route>
                    <Route path={'/login'} exact>
                        <Login />
                    </Route>
                    <Route path={'/register'} exact>
                        <Register />
                    </Route>
                    <Route path={'/forgot-password'} exact>
                        <ForgotPassword />
                    </Route>
                    <Route path={'/reset-password'} exact>
                        <ResetPassword />
                    </Route>
                    <ProtectedRoute path={'/profile'}>
                        <Profile />
                    </ProtectedRoute>
                    <Route path={'/ingredients/:id'} exact>
                        {ingredient ? <Main /> : <Ingredient/>}
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>

            <Route path='/ingredients/:id' exact={true}>
                {ingredient &&
                    <Modal
                        width={720}
                        height={540}
                        onClose={onBack}
                    >
                        {ingredient && ingredient._id &&
                            <IngredientDetails ingredient={ingredient}/>
                        }
                    </Modal>
                }
            </Route>
        </React.Fragment>
    );
}

export default App;
