import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderApi } from '../../utils/api/api';
import { TOrders, TOrderState } from '../../utils/type';

export const orderThunk = createAsyncThunk(
    'order/order',
    async (params:TOrders, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await orderApi(params);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message || err);
        }
    }
);

const initialState:TOrderState = {
    order: null,
    request: false,
    message: null,
    failed: false
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderRequest(state: TOrderState) {
            state.request = false;
            state.message = null;
            state.failed = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(orderThunk.pending, (state: TOrderState) => {
                state.request = true;
                state.message = null;
            })
            .addCase(orderThunk.fulfilled, (state: TOrderState, action) => {
                state.order = action.payload.order;
                state.request = false;
                state.failed = false;
                state.message = null;
            })
            .addCase(orderThunk.rejected, (state: TOrderState, action: any) => {
                state.request = false;
                state.failed = true;
                state.message = action.payload;
            });
    }
});

const { actions, reducer } = orderSlice;
export const { resetOrderRequest } = actions;
export default reducer;

