import React, { FC, ReactNode } from 'react';
import styles from './HeaderLink.module.css';
import { Link } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import{ LocationDescriptor } from 'history';

interface IHeaderLink {
    icon: string;
    isActive: boolean | RegExpMatchArray | null;
    to: LocationDescriptor<string>;
    children: ReactNode;
}

const HeaderLink:FC<IHeaderLink> = (props) => {
    const { isActive } = props;
    const iconClass = isActive ? 'primary' : 'secondary';
    let linkClass = `text ${styles.link} `;
    linkClass += isActive ? 'text_color_primary' : 'text_color_inactive';

    return (
        <Link to={props.to}
           data-icon={props.icon}
           className={linkClass}
        >
            {props.icon === 'Burger' && <BurgerIcon type={iconClass} />}
            {props.icon === 'List' && <ListIcon type={iconClass} />}
            {props.icon === 'Profile' && <ProfileIcon type={iconClass} />}
            <span>{props.children}</span>
        </Link>
    );
};

export default HeaderLink;
