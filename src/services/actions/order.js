import {ORDERS_URL} from '../../utils/common/Contstants';
import {checkResponse} from '../../utils/Response';

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED'

// load order action
export const getOrder = (ids) => {
    return (dispatch) => {
        dispatch({
            type: SET_ORDER_REQUEST
        });

        fetch(ORDERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: ids,
            })
        })
        .then(checkResponse)
        .then((json) => {
            dispatch({
                type: SET_ORDER_SUCCESS,
                payload: json.order
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ORDER_FAILED,
                payload: err.message || err
            });
        });
    };
}