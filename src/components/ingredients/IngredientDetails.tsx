import React, { FC } from 'react';
import styles from './IngredientDetails.module.css';
import {TIngredient} from "../../utils/type";

interface IIngredientDetails {
    ingredient:TIngredient
}

const IngredientDetails:FC<IIngredientDetails> = (props) => {
    const { ingredient } = props;
    return (
        <div className={'pt-10 pl-10 pb-15 pr-10'} data-testid='ingredient-details'>
            <div className={'text text-center text_type_main-large text_color_primary pt-3 mb-4'}>
                Детали ингредиента
            </div>
            <div className={styles.content}>
                <div className={styles.thumb} style={{ backgroundImage: `url(${ingredient.image_large})`}}></div>
                <div
                    data-testid='name'
                    className={'text text-center text_type_main-medium text_color_primary mt-4 mb-8'}>
                    {ingredient.name}
                </div>
                <div
                    data-testid='attributes'
                    className={`${styles.compound} text_type_main-default text_color_inactive`}>
                    <div className={styles.group}>
                        <div className={styles.property}>Калории,ккал</div>
                        <div className={styles.value} data-testid='calories'>
                            {ingredient.calories}
                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.property}>Белки,г</div>
                        <div className={styles.value} data-testid='proteins'>
                            {ingredient.proteins}
                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.property}>Жиры,г</div>
                        <div className={styles.value} data-testid='fat'>
                            {ingredient.fat}
                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.property}>Углеводы,г</div>
                        <div className={styles.value} data-testid='carbohydrates'>
                            {ingredient.carbohydrates}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;