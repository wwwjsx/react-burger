import React, { FC, ReactNode } from 'react';
import Modal from './Modal';
import styles from './Modal.module.css';

interface IAlert {
    title?: string;
    children?: ReactNode
    onClose: () => void
}

const Alert:FC<IAlert> = (props) => {
    const title = props.title || 'Ошибка';
    return (
        <Modal
            height={'auto'}
            closeCls={styles.alertClose}
            onClose={props.onClose}
        >
            <div className={'p-8'}>
                <div className={'text text_type_main-medium text_color_primary mb-4'}>
                    {title}
                </div>
                <div className={'text text_type_main-default text_color_primary'}>
                    {props.children}
                </div>
            </div>
        </Modal>
    );
}

export default Alert;