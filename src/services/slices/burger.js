import { createSlice } from '@reduxjs/toolkit';
import {
    BUN_TYPE,
    MIN_RANDOM_CONSTRUCTOR_ELEMENTS
} from '../../utils/common/Contstants';
import update from 'immutability-helper';

// returns burger random ingredients
const getRandomIngredients = (ingredients) => {
    const min = MIN_RANDOM_CONSTRUCTOR_ELEMENTS;
    const items = [...ingredients].filter(item => item.type !== BUN_TYPE); // skip bun type
    const len = items.length;
    const max = Math.floor(Math.random() * (len - min) + min);
    const random = [];

    for (let i = 0; i < max; i++) {
        if (items[i]) {
            const ingredient = {...items[i]};
            // generate unique id for constructor fillings
            ingredient.uuid = ingredient._id;
            random.push(ingredient);
        }
    }

    return random;
};

// returns burger bun
const getBun = (ingredients) => {
    const items = [...ingredients].filter((item) => item.type === BUN_TYPE);
    const len = items.length;
    const index = Math.floor(Math.random() * len);
    const item = items[index];

    if (item) {
        const ingredient = {...item};

        // generate unique id for constructor buns
        ingredient.uuid = ingredient._id;

        return ingredient;
    }

    return null;
};

// update burger constructor ingredients total price
const setTotalPrice = (state) => {
    let totalPrice = 0;

    state.ingredients.forEach((item) => {
        totalPrice += item.price;
    });

    if (state.bun) {
        totalPrice += state.bun.price * 2;
    }

    state.totalPrice = totalPrice;
};

const burgerSlice = createSlice({
    name: 'burger',
    initialState: {
        ingredients: [],
        bun: null,
        totalPrice: 0
    },

    reducers: {
        removeIngredient(state, action) {
            const ingredients = [...state.ingredients];

            state.ingredients = ingredients.filter(item => item.uuid !== action.payload.uuid);

            setTotalPrice(state);
        },

        setBun(state, action) {
            state.bun = action.payload;
            setTotalPrice(state);
        },

        addIngredient(state, action) {
            const ingredients = [...state.ingredients];

            ingredients.push(action.payload);

            state.ingredients = ingredients;

            setTotalPrice(state);
        },

        moveIngredient(state, action) {
            const { dragIndex, hoverIndex } = action.payload;
            const updateElements = (items) => {
                return update(items, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, items[dragIndex]],
                    ],
                });
            }

            state.ingredients = updateElements(state.ingredients);

            setTotalPrice(state);
        },

        setIngredients(state, action) {
            const { payload } = action;
            const ingredients = getRandomIngredients(payload);
            const bun = getBun(payload);

            state.ingredients = ingredients;
            state.bun = bun;

            setTotalPrice(state);
        },

        clearIngredients(state) {
            state.bun = null;
            state.ingredients = [];
        },
    },
});

const { actions, reducer } = burgerSlice;
export const {
    setIngredients,
    removeIngredient,
    setBun,
    addIngredient,
    moveIngredient,
    clearIngredients
} = actions;
export default reducer;