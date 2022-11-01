import React, { FC, SyntheticEvent, ReactNode, useEffect } from 'react';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';
import ReactDOM from 'react-dom';

interface IModal {
    width?: number | string;
    height?: number | string;
    closeCls?: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal:FC<IModal> = (props) => {
    const width = props.width || 500;
    const height = props.height || 500;
    let closeCls = styles.close;

    if (props.closeCls) {
        closeCls += ` ${props.closeCls}`;
    }

    useEffect(() => {
       const handleEsc = (e:KeyboardEvent) => {
           if (e.key === 'Escape') {
               props.onClose();
           }
       };

        document.addEventListener('keydown', handleEsc);

        // component will unmount
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };

    }, [props]);

    // handler for when clicked on modal overlay
    const onClickOverlay = (e:SyntheticEvent) => {
        const el = e.target as HTMLElement;
        const overlay = el.getAttribute('data-modal-overlay');

        if (overlay) {
            props.onClose();
        }
    };

    return ReactDOM.createPortal(
        <ModalOverlay onClick={onClickOverlay}>
            <div className={styles.modal} style={{ width, height }}>
                <span className={closeCls} data-testid='close'>
                    <CloseIcon type="primary" onClick={props.onClose}/>
                </span>
                {props.children}
            </div>
        </ModalOverlay>,
        document.getElementById('react-modals') as HTMLElement
    );
};

export default Modal;