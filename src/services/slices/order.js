import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderApi } from '../../utils/api/api';

export const orderThunk = createAsyncThunk(
    'order/order',
    async (params, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await orderApi(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        request: false,
        message: null,
        failed: false
    },

    reducers: {
        resetOrderRequest(state) {
            state.request = false;
            state.message = null;
            state.failed = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(orderThunk.pending, (state) => {
                state.request = true;
                state.message = null;
            })
            .addCase(orderThunk.fulfilled, (state, action) => {
                state.order = action.payload.order;
                state.request = false;
                state.failed = true;
                state.message = null;
            })
            .addCase(orderThunk.rejected, (state, action) => {
                state.request = false;
                state.failed = true;
                state.message = action.payload;
            });
    }
});

const { actions, reducer } = orderSlice;
export const { resetOrderRequest } = actions;
export default reducer;

