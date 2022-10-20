import { createWsOrdersSlice } from './wsOrders';

const initialState = {
    request: false,
    connected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
};

const feedSlice = createWsOrdersSlice('feed', initialState);
export const feedActions = feedSlice.actions;
export default feedSlice.reducer;