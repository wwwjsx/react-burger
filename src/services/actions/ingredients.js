import {INGREDIENTS_URL} from '../../utils/common/Contstants';
import {checkResponse} from '../../utils/Response';

export const SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST';
export const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS';
export const SET_INGREDIENTS_FAILED = 'SET_INGREDIENTS_FAILED'
export const SET_INGREDIENT = 'SET_INGREDIENT';
export const SET_BUN = 'SET_BUN';
export const ADD_CONSTRUCTOR_ELEMENT = 'ADD_CONSTRUCTOR_ELEMENT';
export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT';
export const REMOVE_CONSTRUCTOR_ELEMENT = 'REMOVE_CONSTRUCTOR_ELEMENT';
export const SET_ORDER_TOTAL_PRICE = 'SET_ORDER_TOTAL_PRICE';

// load ingredients
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