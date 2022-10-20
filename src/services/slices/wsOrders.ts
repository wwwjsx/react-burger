import { createSlice } from '@reduxjs/toolkit';

export const createWsOrdersSlice = (name:string, initialState: any) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            wsInit(state, action) {
                state.request = true;
            },
            wsClose(state, action) {
                state.request = false;
                state.connected = false;
            },
            onOpen(state) {
                state.connected = true;
            },
            onMessage(state, action) {
                const { orders, total, totalToday } = action.payload;
                state.orders = orders;
                state.total = total;
                state.totalToday = totalToday;
                state.request = false;
            },
            onError(state, action) {
                state.error = action.payload;
                state.request = false;
            },
            onClose(state, action) {
                state.connected = false;
                state.request = false;
            },
            onCloseError(state, action) {
                state.connected = false;
                state.request = false;
                state.error = action.payload;
            }
        }
    });
}