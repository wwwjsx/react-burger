import React from 'react';
import styles from './HeaderLink.module.css';
import CommonPropTypes from '../../utils/common/PropTypes';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const HeaderLink = (props) => {
    const isActive = props.icon === props.activeIcon;
    const iconClass = isActive ? 'primary' : 'secondary';
    let linkClass = `text ${styles.link} `;
    linkClass += isActive ? 'text_color_primary' : 'text_color_inactive';

    return (
        <a href="#"
           data-icon={props.icon}
           className={linkClass}
           onClick={props.onClick}
        >
            {props.icon === 'Burger' && <BurgerIcon type={iconClass} />}
            {props.icon === 'List' && <ListIcon type={iconClass} />}
            {props.icon === 'Profile' && <ProfileIcon type={iconClass} />}
            <span>{props.children}</span>
        </a>
    );
};

HeaderLink.propTypes = CommonPropTypes.headerLinkType;

export default HeaderLink;
