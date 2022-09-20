import {
    SET_ORDER_REQUEST,
    SET_ORDER_SUCCESS,
    SET_ORDER_FAILED
} from '../actions/order';

const initialState = {
    orderRequest: false,
    orderFail: false,
    orderError: null,
    order: null
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case SET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.payload,
                orderRequest: false,
                orderFail: false,
                orderError: null,
            };
        }
        case SET_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFail: true,
                orderError: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};