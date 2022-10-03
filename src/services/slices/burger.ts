import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import {TBurgerState, TIngredientsUid} from '../../utils/type';

// update burger constructor ingredients total price
const setTotalPrice = (state:TBurgerState) => {
    let totalPrice = 0;

    state.ingredients.forEach((item) => {
        totalPrice += item.price;
    });

    if (state.bun) {
        totalPrice += state.bun.price * 2;
    }

    state.totalPrice = totalPrice;
};

const initialState:TBurgerState = {
    ingredients: [],
    bun: null,
    totalPrice: 0
};

const burgerSlice = createSlice({
    name: 'burger',
    initialState,

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
            const { payload } = action;

            payload.index = ingredients.length + 1;
            ingredients.push(payload);

            state.ingredients = ingredients;

            setTotalPrice(state);
        },

        moveIngredient(state, action) {
            const { dragIndex, hoverIndex } = action.payload;
            const updateElements = (items:TIngredientsUid): TIngredientsUid => {
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

        clearIngredients(state) {
            state.bun = null;
            state.ingredients = [];
        },
    },
});

const { actions, reducer } = burgerSlice;
export const {
    removeIngredient,
    setBun,
    addIngredient,
    moveIngredient,
    clearIngredients
} = actions;
export default reducer;