import { BUN_TYPE } from '../../utils/common/Contstants';
import update from 'immutability-helper';
import {
    SET_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_FAILED,
    SET_INGREDIENT,
    SET_ORDER_TOTAL_PRICE,
    SET_BUN,
    ADD_CONSTRUCTOR_ELEMENT,
    MOVE_CONSTRUCTOR_ELEMENT,
    REMOVE_CONSTRUCTOR_ELEMENT
} from '../actions/ingredients';

const initialState = {
    ingredientsRequest: false,
    ingredientsFail: false,
    ingredientsError: null,

    // loaded ingredients
    ingredients: [],

    // selected ingredient
    ingredient: null,

    // constructor bun ingredient
    constructorBun: null,

    // constructor random elements
    constructorElements: [],

    orderTotalPrice: 0,
};

// returns random bun ingredients
const getBun = (ingredients) => {
    const items = [...ingredients].filter((item) => item.type === BUN_TYPE);
    const len = items.length;
    const index = Math.floor(Math.random() * len);
    const item = items[index];

    if (item) {
        // generate unique id for constructor buns
        item.uuid = item._id;
    }

    return item;
};

// returns random ingredients fillings
const getConstructorElements = (ingredients) => {
    const min = 2; // minimum 2 ingredients
    const items = [...ingredients].filter(item => item.type !== BUN_TYPE); // skip bun type
    const len = items.length;
    const max = Math.floor(Math.random() * (len - min) + min);
    const random = [];

    for (let i = 0; i < max; i++) {
        const item = items[i];
        if (item) {
            // generate unique id for constructor fillings
            item.uuid = item._id;
            random.push(item);
        }
    }

    return random;
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case SET_INGREDIENTS_SUCCESS: {
            const ingredients = action.payload;
            const bun = getBun(ingredients);
            const elements = getConstructorElements(ingredients);

            return {
                ...state,
                constructorBun: bun,
                constructorElements: elements,
                ingredients: ingredients,
                ingredientsRequest: false,
                ingredientsFail: false
            };
        }
        case SET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsError: action.payload,
                ingredientsRequest: false,
                ingredientsFail: true
            };
        }
        case SET_INGREDIENT: {
            return {
                ...state,
                ingredient: action.payload
            }
        }
        case ADD_CONSTRUCTOR_ELEMENT: {
            const elements = [...state.constructorElements];

            elements.push(action.payload);

            return {
                ...state,
                constructorElements: [...elements]
            };
        }
        case MOVE_CONSTRUCTOR_ELEMENT: {
            const updateElements = (elements) => {
                return update(elements, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, elements[action.dragIndex]],
                    ],
                });
            }
            return {
                ...state,
                constructorElements: updateElements(state.constructorElements)
            };
        }
        case REMOVE_CONSTRUCTOR_ELEMENT: {
            const elements = [...state.constructorElements];

            return {
                ...state,
                constructorElements: elements.filter(item => item.uuid !== action.uuid)
            };
        }
        case SET_BUN: {
            return {
                ...state,
                constructorBun: action.payload
            }
        }
        case SET_ORDER_TOTAL_PRICE: {
            return {
                ...state,
                orderTotalPrice: action.payload
            };
        }
        default: {
            return state;
        }
    }
};