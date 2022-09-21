import {INGREDIENTS_URL} from '../common/Contstants';
import {checkResponse} from '../Response';
import {
    SET_INGREDIENTS_FAILED,
    SET_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_SUCCESS
} from '../../services/actions/ingredients';

export const getIngredients = () => {
    return (dispatch) => {
        dispatch({
            type: SET_INGREDIENTS_REQUEST
        });

        fetch(INGREDIENTS_URL)
            .then(checkResponse)
            .then((json) => {
                dispatch({
                    type: SET_INGREDIENTS_SUCCESS,
                    payload: json.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: SET_INGREDIENTS_FAILED,
                    payload: err.message || err
                });
            });
    };
}