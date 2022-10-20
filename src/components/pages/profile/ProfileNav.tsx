import styles from './Profile.module.css';
import { Link } from 'react-router-dom';
import React, {SyntheticEvent, FC, useMemo} from 'react';
import { useAuth } from '../../../services/hooks/auth';

interface IProfileNav {
    readonly active: string;
}

const ProfileNav:FC<IProfileNav> = ({ active }) => {
    const auth = useAuth();
    const nav = [{
        to: '/profile',
        text: 'Профиль',
        desc: 'В этом разделе вы можете изменить свои персональные данные'
    }, {
        to: '/profile/orders',
        text: 'История заказов',
        desc: 'В этом разделе вы можете посмотреть свою историю заказов'
    }];

    const desc = useMemo(() => {
        const navItem = nav.find(item => item.to === active);
        return navItem ? navItem.desc : '';
    }, [active]);

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
                {desc}
            </div>
        </div>
    )
}

export default ProfileNav;