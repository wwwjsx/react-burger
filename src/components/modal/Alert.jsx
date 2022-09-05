import React from 'react';
import Modal from './Modal';

const Alert = (props) => {
    const title = props.title || 'Ошибка';
    const hasChildren = Boolean(props.children);

    return (
      <Modal
          show={hasChildren}
          closeX={30}
          closeY={30}
          height={'auto'}
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