import orderHistoryReducer, { orderHistoryActions } from './orderHistory';

describe ('order history reducer test', () => {
    const initialState = {
        request: false,
        connected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: null
    };

    it('order history web socket: init', () => {
        const action = {
            type: orderHistoryActions.wsInit,
            payload: {
                url: 'localhost',
                sliceName: 'order/history'
            }
        };

        const state = orderHistoryReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            request: true
        })
    });

    it ('order history web socket: close', () => {
        const action = {
            type: orderHistoryActions.wsClose,
            payload: {
                sliceName: 'order/history'
            }
        };

        const state = orderHistoryReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            request: false,
            connected: false
        });
    });

    it ('order history web socket: onOpen', () => {
        const action = {
            type: orderHistoryActions.onOpen
        };
        const state = orderHistoryReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            connected: true
        });
    });

    it ('order history web socket: onMessage', () => {
        const action = {
            type: orderHistoryActions.onMessage,
            payload: {
                orders: [1, 2, 3],
                total: 1,
                totalToday: 1
            }
        };
        const state = orderHistoryReducer(initialState, action);

        expect(state.orders.length).toEqual(3);
    });

    it ('order history web socket: onError', () => {
        const action = {
            type: orderHistoryActions.onError,
            payload: 'socket error'
        };
        const state = orderHistoryReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            error: 'socket error'
        });
    });

    it ('order history web socket: onClose', () => {
        const action = {
            type: orderHistoryActions.onClose,
        };
        const state = orderHistoryReducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it ('order history web socket: onCloseError', () => {
        const action = {
            type: orderHistoryActions.onCloseError,
            payload: 'socket close error'
        };
        const state = orderHistoryReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            error: 'socket close error'
        });
    });
});