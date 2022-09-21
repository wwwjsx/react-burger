import styles from './BurgerIngredients.module.css';
import Ingredient from './Ingredient';
import React from 'react';

const IngredientTab = ({ ingredients, title, reference, type, onClick }) => {
    return (
        <div className={'mt-10'}>
            <h2 className="text text_type_main-medium mb-6" ref={reference}>
                {title}
            </h2>
            <div className={styles.box}>
                {ingredients.filter(item => item.type === type)
                    .map((item) => {
                        return (
                            <Ingredient
                                key={item._id}
                                onClick={() => onClick(item)}
                                item={item}
                            />
                        );
                    })
                }
            </div>
        </div>
    )
};

export default IngredientTab;