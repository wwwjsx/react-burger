import React, { useEffect } from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../header/AppHeader';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import ResetPassword from '../pages/reset-password/ResetPassword';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/notfound/NotFound';
import Main from '../main/Main';
import {useDispatch, useSelector} from 'react-redux';
import Ingredient from '../pages/ingredient/Ingredient';
import { ingredientsThunk } from '../../services/slices/ingredients';
import { useAuth } from '../../services/auth';
import ProtectedRoute from '../route/ProtectedRoute';

function App() {
    const dispatch = useDispatch();
    const auth = useAuth();
    const { ingredient } = useSelector(store => store.ingredients);

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
    );
}

export default App;
