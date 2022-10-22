import React, { FC, useEffect } from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../header/AppHeader';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import ResetPassword from '../pages/reset-password/ResetPassword';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';
import NotFound from '../pages/notfound/NotFound';
import Main from '../main/Main';
import {useDispatch, useSelector} from '../../services/store';
import Ingredient from '../pages/ingredient/Ingredient';
import {ingredientsThunk, resetIngredientsRequest} from '../../services/slices/ingredients';
import { useAuth } from '../../services/hooks/auth';
import ProtectedRoute from '../route/ProtectedRoute';
import Modal from '../modal/Modal';
import IngredientDetails from "../ingredients/IngredientDetails";
import {LocationState} from '../../utils/type';
import Feed from '../feed/Feed';
import FeedOrder from '../feed/FeedOrder';
import OrderItemDetails from '../order/OrderItemDetails';
import moment from 'moment';
import 'moment/locale/ru';
import LoadMask from '../modal/LoadMask';
import Alert from '../modal/Alert';
import OrderHistoryItem from '../pages/profile/OrderHistoryItem';
import ProfileForm from '../pages/profile/ProfileForm';
import OrderHistory from '../pages/profile/OrderHistory';

moment.locale('ru');

const App:FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const auth = useAuth();
    const state = location.state as LocationState || {};
    const { ingredient, order } = state;
    const ingredients = useSelector(state => state.ingredients);

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

    // close alert popup
    const handleCloseAlert = () => {
        dispatch(resetIngredientsRequest());
    };

    return (
        <React.Fragment>
            <div className={styles.App}>
                <AppHeader />
                <Switch>
                    <Route path={'/'} exact>
                        <Main />
                    </Route>
                    <Route path={'/feed'} exact>
                        <Feed />
                    </Route>
                    <Route path={'/feed/:id'} exact>
                        {order ? <Feed/> : <FeedOrder/>}
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
                    <ProtectedRoute path={'/profile/orders/:id'} exact>
                        {order ? <OrderHistory/> : <OrderHistoryItem/>}
                    </ProtectedRoute>
                    <ProtectedRoute path={'/profile/orders'} exact>
                        <OrderHistory />
                    </ProtectedRoute>
                    <ProtectedRoute path={'/profile'} exact>
                        <ProfileForm />
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

            <Route path={'/feed/:id'} exact={true}>
                {order &&
                    <Modal
                        width={720}
                        height={650}
                        onClose={onBack}
                    >
                        <OrderItemDetails order={order} isModal={true}/>
                    </Modal>
                }
            </Route>

            {ingredients.request && <LoadMask />}
            {ingredients.failed &&
                <Alert  onClose={handleCloseAlert}>
                    {ingredients.message}
                </Alert>
            }
        </React.Fragment>
    );
}

export default App;
