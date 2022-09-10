import React from 'react';
import ModalOverlay from './ModalOverlay';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const LoadMask = (props) => {
    return (
        <ModalOverlay show={props.show}>
            <div className={`${styles.mask} text text_type_main-medium text_color_primary`}>
                Загрузка ...
            </div>
        </ModalOverlay>
    );
};

LoadMask.propTypes = {
  show: PropTypes.bool.isRequired
};

export default LoadMask;