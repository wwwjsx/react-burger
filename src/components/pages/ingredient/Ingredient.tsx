import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../../services/store';
import IngredientDetails from '../../ingredients/IngredientDetails';

const Ingredient:FC = () => {
    const { ingredients } = useSelector(store => store.ingredients);
    const params = useParams<{ id: string }>();
    const ingredient = ingredients.find(item => item._id === params.id);

    return (
        <div className={'container form-wrapper'}>
            {ingredient && <IngredientDetails ingredient={ingredient}/>}
        </div>
    );
};

export default Ingredient;