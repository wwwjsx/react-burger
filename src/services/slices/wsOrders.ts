/*
    factory slice for: feed and order history
    for testing this function see: orderHistory.test.js, feed.test.js
*/

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderInitialState } from '../../utils/type';

export const createWsOrdersSlice = (name:string, initialState: TOrderInitialState) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            wsInit(state:TOrderInitialState, action:PayloadAction<{url: string, sliceName: string}>) {
                state.request = true;
            },
            wsClose(state:TOrderInitialState, action:PayloadAction<{sliceName: string}>) {
                state.request = false;
                state.connected = false;
            },
            onOpen(state:TOrderInitialState) {
                state.connected = true;
            },
            onMessage(state:TOrderInitialState, action:PayloadAction<TOrderInitialState>) {
                const { orders, total, totalToday } = action.payload;
                state.orders = orders;
                state.total = total;
                state.totalToday = totalToday;
                state.request = false;
            },
            onError(state:TOrderInitialState, action:PayloadAction<string>) {
                state.error = action.payload;
                state.request = false;
            },
            onClose(state:TOrderInitialState) {
                state.connected = false;
                state.request = false;
            },
            onCloseError(state:TOrderInitialState, action:PayloadAction<string>) {
                state.connected = false;
                state.request = false;
                state.error = action.payload;
            }
        }
    });
}