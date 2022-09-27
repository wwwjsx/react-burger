import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsApi } from '../../utils/api/api';
import { BUN_TYPE } from '../../utils/common/Contstants';

export const ingredientsThunk = createAsyncThunk(
    'ingredients/load',
    async (params, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await ingredientsApi();
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredients: [],
        ingredient: null,
        request: false,
        message: null,
        failed: false,
    },

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
                    case 'set-bun': {
                       ingredients
                           .filter(item => item.type === BUN_TYPE)
                           .forEach(item => {
                               item.count = 0;
                           });

                        find.count = 1;
                    }
                    break;
                    case 'add-item': {
                        let count = find.count || 0;
                        count ++;
                        find.count = count;
                    }
                    break;
                    case 'remove-item': {
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
        builder.addCase(ingredientsThunk.pending, (state) => {
                state.request = true;
            })
            .addCase(ingredientsThunk.fulfilled, (state, action) => {
                state.ingredients = action.payload.data;
                state.request = false;
                state.failed = false;
                state.message = null;
            })
            .addCase(ingredientsThunk.rejected, (state, action) => {
                state.request = false;
                state.message = action.payload;
                state.failed = true;
            });
    }
});

const { actions, reducer } = ingredientsSlice;
export const { setIngredient, resetIngredientsRequest, updateIngredientCount, resetIngredientsCount } = actions;
export default reducer;