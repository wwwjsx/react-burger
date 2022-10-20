import styles from './Profile.module.css';
import { Link } from 'react-router-dom';
import React, {SyntheticEvent, FC } from 'react';
import { useAuth } from '../../../services/hooks/auth';

interface IProfileNav {
    readonly active: string;
}

const ProfileNav:FC<IProfileNav> = ({ active }) => {
    const auth = useAuth();
    const nav = [{
        to: '/profile',
        text: 'Профиль'
    }, {
        to: '/profile/orders',
        text: 'История заказов'
    }];

    // handle user logout
    const handleLogout = (e:SyntheticEvent) => {
        e.preventDefault();
        auth.signOut();
    };

    return (
        <div className={styles.nav}>
            <ul className={'mb-20'}>
                {nav.map((item) => {
                    return (
                        <li key={item.to} className={item.to === active ? styles.active : styles.inactive}>
                            <Link to={item.to}>{item.text}</Link>
                        </li>
                    );
                })}
                <li className={styles.inactive}>
                    <Link to={'/profile/logout'} onClick={handleLogout}>Выход</Link>
                </li>
            </ul>

            <div className={'text text_type_main-default text_color_inactive'}>
                В этом разделе вы можете изменить свои персональные данные
            </div>
        </div>
    )
}

export default ProfileNav;