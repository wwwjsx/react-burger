import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div
            className={styles.overlay}
            onClick={props.onClick}
            data-modal-overlay={true}
        >
            {props.children}
        </div>
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func
};

export default ModalOverlay;