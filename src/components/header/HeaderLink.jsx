import React from 'react';
import styles from './HeaderLink.module.css';
import { Link } from 'react-router-dom';
import CommonPropTypes from '../../utils/common/PropTypes';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const HeaderLink = (props) => {
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

HeaderLink.propTypes = CommonPropTypes.headerLinkType;

export default HeaderLink;
