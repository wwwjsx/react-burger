import React, { useCallback } from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import styles from './Profile.module.css';
import OrderHistory from './OrderHistory';
import ProfileForm from './ProfileForm';
import { useAuth } from '../../../services/auth';

const Profile = () => {
    const { pathname } = useLocation();
    const auth = useAuth();
    const path = pathname || 'profile';

    // returns active css class
    const getCls = useCallback((part) => {
        // for exact match
        if (path === `/${part}`) {
            return styles.active;
        }

        // for profile orders/:id
        if (
            part === 'profile/orders'
            && path.match(/^\/profile\/orders\/[0-9]+$/)
        ) {
            return styles.active;
        }

        return styles.inactive;
    }, [path]);

    // handle user logout
    const handleLogout = (e) => {
        e.preventDefault();
        auth.signOut();
    };

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.nav}>
                <ul className={'mb-20'}>
                    <li className={getCls('profile')}>
                        <Link to={'/profile'}>Профиль</Link>
                    </li>
                    <li className={getCls('profile/orders')}>
                        <Link to={'/profile/orders'}>История заказов</Link>
                    </li>
                    <li className={styles.inactive}>
                        <Link to={'/profile/logout'} onClick={handleLogout}>Выход</Link>
                    </li>
                </ul>

                <div className={'text text_type_main-default text_color_inactive'}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>
            <div className={styles.content}>
                <Switch>
                    <Route exact={true} path={'/profile/orders'}>
                        <OrderHistory />
                    </Route>
                    <Route exact={true} path={'/profile/orders/:id'}>
                        USER ORDER HISTORY ID:
                    </Route>
                    <Route exact path={'/profile'}>
                        <ProfileForm />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Profile;