import React, {FC, SyntheticEvent} from 'react';
import styles from './ModalOverlay.module.css';

interface IModalOverlay {
    children: React.ReactNode;
    onClick?: (e: SyntheticEvent) => void
}

const ModalOverlay:FC<IModalOverlay> = (props) => {
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

export default ModalOverlay;