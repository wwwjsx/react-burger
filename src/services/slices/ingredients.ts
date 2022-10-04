import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsApi } from '../../utils/api/api';
import { BUN_TYPE } from '../../utils/common/Contstants';
import {
    SET_INGREDIENT_COUNT_BUN,
    ADD_INGREDIENT_COUNT,
    REMOVE_INGREDIENT_COUNT
} from '../actions/ingredients';
import { TIngredientsState } from '../../utils/type';

export const ingredientsThunk = createAsyncThunk(
    'ingredients/load',
    async (params, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await ingredientsApi();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message || err);
        }
    }
);

const initialState:TIngredientsState = {
    ingredients: [],
    ingredient: null,
    request: false,
    message: null,
    failed: false,
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setIngredient(state, action) {
            state.ingredient = action.payload;
        },

        resetIngredientsCount(state) {
            const ingredients = [...state.ingredients];

            ingredients.forEach((item) => {
                item.count = 0;
            });

            state.ingredients = ingredients;
        },

        updateIngredientCount(state, action) {
            const { type, id } = action.payload;
            const ingredients = [...state.ingredients];
            const find = ingredients.find(item => item._id === id);

            if (find) {
                switch(type) {
                    case SET_INGREDIENT_COUNT_BUN: {
                       ingredients
                           .filter(item => item.type === BUN_TYPE)
                           .forEach(item => {
                               item.count = 0;
                           });

                        find.count = 1;
                    }
                    break;
                    case ADD_INGREDIENT_COUNT: {
                        let count = find.count || 0;
                        count ++;
                        find.count = count;
                    }
                    break;
                    case REMOVE_INGREDIENT_COUNT: {
                        let count = find.count || 0;
                        count --;
                        find.count = count;
                    }
                    break;
                    default:
                }
            }
        },

        resetIngredientsRequest(state) {
            state.request = false;
            state.message = null;
            state.failed = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(ingredientsThunk.pending, (state: TIngredientsState) => {
                state.request = true;
            })
            .addCase(ingredientsThunk.fulfilled, (state: TIngredientsState, action) => {
                state.ingredients = action.payload.data;
                state.request = false;
                state.failed = false;
                state.message = null;
            })
            .addCase(ingredientsThunk.rejected, (state: TIngredientsState, action: any) => {
                state.request = false;
                state.message = action.payload;
                state.failed = true;
            });
    }
});

const { actions, reducer } = ingredientsSlice;
export const { setIngredient, resetIngredientsRequest, updateIngredientCount, resetIngredientsCount } = actions;
export default reducer;