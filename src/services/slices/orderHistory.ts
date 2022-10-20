import { createWsOrdersSlice } from './wsOrders';

const initialState = {
    request: false,
    connected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
};

const orderHistorySlice = createWsOrdersSlice('order/history', initialState);
export const orderHistoryActions = orderHistorySlice.actions;
export default orderHistorySlice.reducer;