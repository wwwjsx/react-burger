import React, {FC, SyntheticEvent} from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import styles from './BurgerConstructor.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { BUN_TYPE, SORT_COMPONENT_DRAG_TYPE } from '../../services/constants/common';
import {TIngredient, TIngredientIndex} from '../../utils/type';

interface IElementWrapper {
  item: TIngredient;
  index: number;
  handleClose: () => void;
  moveCard: (dragIndex:number, hoverIndex:number) => void
}

const ElementWrapper:FC<IElementWrapper> = ({ item, handleClose, index, moveCard }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: SORT_COMPONENT_DRAG_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(node: unknown, monitor: DropTargetMonitor) {
            if (!ref.current || !node) {
                return
            }

            const ingredient = node as TIngredientIndex;
            const dragIndex = ingredient.index;
            const hoverIndex = index;

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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
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
            ingredient.index = hoverIndex
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
    const handleOnDrop = (e:SyntheticEvent) => e.preventDefault();

    return (
        <div
            ref={ref}
            className={styles.element}
            data-handler-id={handlerId}
            data-ref-type='ingredient'
            data-ref-price={item.price}
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

export default ElementWrapper;