import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    createAction,
    CaseReducerActions,
    AsyncThunkAction, AnyAction
} from '@reduxjs/toolkit';
import { orderApi } from '../../utils/api/api';
import { TOrdersIngredients, TOrdersIngredientsState, TToken} from '../../utils/type';

export const orderThunk = createAsyncThunk(
    'order/order',
    async (params:TToken & { body: TOrdersIngredients }, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await orderApi(params);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message || err);
        }
    }
);

const initialState:TOrdersIngredientsState = {
    order: null,
    request: false,
    message: null,
    failed: false
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderRequest(state: TOrdersIngredientsState) {
            state.request = false;
            state.message = null;
            state.failed = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(orderThunk.pending, (state: TOrdersIngredientsState) => {
                state.request = true;
                state.message = null;
            })
            .addCase(orderThunk.fulfilled, (state: TOrdersIngredientsState, action:PayloadAction<TOrdersIngredientsState>) => {
                state.order = action.payload.order;
                state.request = false;
                state.failed = false;
                state.message = null;
            })
            .addCase(orderThunk.rejected, (state: TOrdersIngredientsState, action: AnyAction) => {
                state.request = false;
                state.failed = true;
                state.message = action.payload;
            });
    }
});

const { actions, reducer } = orderSlice;
export const { resetOrderRequest } = actions;
export default reducer;

