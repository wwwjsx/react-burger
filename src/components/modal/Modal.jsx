import React from 'react';
import styles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from './ModalOverlay';
import PropTypes from 'prop-types';

const Modal = (props) => {
    const width = props.width || 500;
    const height = props.height || 500;
    const isOpen = props.show;
    let closeCls = styles.close;

    if (props.closeCls) {
        closeCls += ` ${props.closeCls}`;
    }

    React.useEffect(() => {
       const handleEsc = (e) => {
           if (e.key === 'Escape') {
               props.onClose();
           }
       };

       if (isOpen) {
           document.addEventListener('keydown', handleEsc);

           // component will unmount
           return () => {
               document.removeEventListener('keydown', handleEsc);
           };
       }

    }, [isOpen]);

    // handler for when clicked on modal overlay
    const onClickOverlay = (e) => {
        const overlay = e.target.getAttribute('data-modal-overlay');

        if (overlay) {
            props.onClose();
        }
    };

    return (
        <ModalOverlay show={props.show} onClick={onClickOverlay}>
            <div className={styles.modal} style={{ width, height }}>
                <span className={closeCls}>
                    <CloseIcon type="primary" onClick={props.onClose}/>
                </span>
                {props.children}
            </div>
        </ModalOverlay>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // maybe auto
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // maybe auto
    closeCls: PropTypes.string,
    onClose: PropTypes.func.isRequired
};

export default Modal;