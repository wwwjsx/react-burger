import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
    const visibility = (props.show === true) ? 'visible' : 'hidden';
    const width = props.width || 500;
    const height = props.height || 500;
    const closeX = props.closeX || 40;
    const closeY = props.closeY || 60;

    return ReactDOM.createPortal (
        <div className={styles.overlay} style={{ visibility }}>
            <div className={styles.modal} style={{ width, height }}>
                <span className={styles.close} style={{ top: closeY, right: closeX }}>
                    <CloseIcon type="primary" onClick={props.onClose}/>
                </span>
                {props.children}
            </div>
        </div>,
        document.getElementById('react-modals')
    );
};

export default Modal;