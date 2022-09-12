import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    const visibility = (props.show === true) ? 'visible' : 'hidden';

    return (
        <div
            className={styles.overlay}
            style={{ visibility }}
            onClick={props.onClick}
            data-modal-overlay={true}
        >
            {props.children}
        </div>
    );
};

ModalOverlay.propTypes = {
    show: PropTypes.bool.isRequired,
    onClick: PropTypes.func
};

export default ModalOverlay;