import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsApi } from '../../utils/api/api';

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
export const { setIngredient, resetIngredientsRequest } = actions;
export default reducer;