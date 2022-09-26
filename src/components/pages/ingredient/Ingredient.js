import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../ingredients/IngredientDetails';

const Ingredient = () => {
    const { ingredients } = useSelector(store => store.ingredients);
    const params = useParams();
    const ingredient = ingredients.find(item => item._id === params.id);

    return (
        <div className={'container form-wrapper'}>
            {ingredient && <IngredientDetails ingredient={ingredient}/>}
        </div>
    );
};

export default Ingredient;