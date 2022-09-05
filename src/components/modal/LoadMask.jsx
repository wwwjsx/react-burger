import React from 'react';
import styles from './Modal.module.css';

const LoadMask = (props) => {
    const visibility = props.show === true ? 'visible' : 'hidden';

    return (
      <div className={styles.overlay} style={{ visibility }}>
          <div className={`${styles.mask} text text_type_main-medium text_color_primary`}>
              Загрузка ...
          </div>
      </div>
    );
};

export default LoadMask;