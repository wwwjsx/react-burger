import React from 'react';
import {useDrag, useDrop} from 'react-dnd';
import styles from './BurgerConstructor.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN_TYPE, SORT_COMPONENT_DRAG_TYPE } from '../../utils/common/Contstants';
import CommonPropTypes from '../../utils/common/PropTypes';
import PropTypes from 'prop-types';

const ElementWrapper = ({ item, handleClose, index, moveCard }) => {
    const ref = React.useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: SORT_COMPONENT_DRAG_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: SORT_COMPONENT_DRAG_TYPE,
        item: () => {
            return { id: item._id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1;

    // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
    if (item.type !== BUN_TYPE) {
        drag(drop(ref));
    }

    // Прерываем базовую функция для onDrop
    // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
    const handleOnDrop = (e) => e.preventDefault();

    return (
        <div
            ref={ref}
            className={styles.element}
            data-handler-id={handlerId}
            style={{ opacity }}
            onDrop={handleOnDrop}
        >
            <div ref={drag} className={styles.elementIcon}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                handleClose={handleClose}
                thumbnail={item.image_mobile}
            />
        </div>
    );
};

ElementWrapper.propTypes = {
    handleClose: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: CommonPropTypes.ingredientShapeType.isRequired
}

export default ElementWrapper;