import React, { FC, useCallback } from 'react';
import styles from './AppHeader.module.css';
import HeaderLink from './HeaderLink';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

const AppHeader:FC = () => {
    const { pathname } = useLocation();
    const path = pathname || '/';

    const isActive = useCallback((part:string) => {
        const regEx = new RegExp(`^\/${part}`, 'i');
        return path === part || path.match(regEx);
    }, [path]);

    return (
        <header className={styles.header}>
            <div className={'container'}>
                <div className={'rows'}>
                    <div className={'col text-left'}>
                        <HeaderLink
                            icon={'Burger'}
                            isActive={isActive('/')}
                            to={'/'}>
                            Конструктор
                        </HeaderLink>
                        <HeaderLink
                            icon={'List'}
                            isActive={isActive('order')}
                            to={'/order/list'}>
                            Лента заказов
                        </HeaderLink>
                    </div>
                    <div className={'col text-center'}>
                        <Link to={'/'}><Logo/></Link>
                    </div>
                    <div className={'col text-right'}>
                        <HeaderLink
                            icon={'Profile'}
                            isActive={isActive('profile')}
                            to={'/profile'}>
                            Личный кабинет
                        </HeaderLink>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;