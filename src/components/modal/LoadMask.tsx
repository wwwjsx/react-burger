import React, { FC, ReactNode } from 'react';
import ModalOverlay from './ModalOverlay';
import styles from './Modal.module.css';

interface ILoadMask {
    children?: ReactNode
}

const LoadMask: FC<ILoadMask> = (props) => {
    const message = props.children || 'Загрузка ...';
    return (
        <ModalOverlay>
            <div className={`${styles.mask} text text_type_main-medium text_color_primary`}>
               {message}
            </div>
        </ModalOverlay>
    );
};

export default LoadMask;