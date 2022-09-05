import React from 'react';
import styles from './AppHeader.module.css';
import HeaderLink from './HeaderLink';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    const [activeIcon, setActiveIcon] = React.useState('Burger');

    const handleClick = (e) => {
        e.preventDefault();
        const icon = e.currentTarget.getAttribute('data-icon');
        setActiveIcon(icon)
    };

    return (
        <header className={styles.header}>
            <div className={'container'}>
                <div className={'rows'}>
                    <div className={'col text-left'}>
                        <HeaderLink
                            icon={'Burger'}
                            activeIcon={activeIcon}
                            onClick={handleClick}
                        >
                            Конструктор
                        </HeaderLink>
                        <HeaderLink
                            icon={'List'}
                            activeIcon={activeIcon}
                            onClick={handleClick}
                        >
                            Лента заказов
                        </HeaderLink>
                    </div>
                    <div className={'col text-center'}>
                        <Logo />
                    </div>
                    <div className={'col text-right'}>
                        <HeaderLink
                            icon={'Profile'}
                            activeIcon={activeIcon}
                            onClick={handleClick}>
                            Личный кабинет
                        </HeaderLink>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;