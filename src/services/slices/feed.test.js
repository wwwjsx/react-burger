import feedReducer, { feedActions } from './feed';

describe ('feed reducer test', () => {
    const initialState = {
        request: false,
        connected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: null
    };

    it('feed web socket: init', () => {
        const action = {
            type: feedActions.wsInit,
            payload: {
                url: 'localhost',
                sliceName: 'feed'
            }
        };

        const state = feedReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            request: true
        })
    });

    it ('feed web socket: close', () => {
        const action = {
            type: feedActions.wsClose,
            payload: {
                sliceName: 'feed'
            }
        };

        const state = feedReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            request: false,
            connected: false
        });
    });

    it ('feed web socket: onOpen', () => {
        const action = {
            type: feedActions.onOpen
        };
        const state = feedReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            connected: true
        });
    });

    it ('feed web socket: onMessage', () => {
        const action = {
            type: feedActions.onMessage,
            payload: {
                orders: [1, 2, 3],
                total: 1,
                totalToday: 1
            }
        };
        const state = feedReducer(initialState, action);

        expect(state.orders.length).toEqual(3);
    });

    it ('feed web socket: onError', () => {
        const action = {
            type: feedActions.onError,
            payload: 'socket error'
        };
        const state = feedReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            error: 'socket error'
        });
    });

    it ('feed web socket: onClose', () => {
        const action = {
            type: feedActions.onClose,
        };
        const state = feedReducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it ('feed web socket: onCloseError', () => {
        const action = {
            type: feedActions.onCloseError,
            payload: 'socket close error'
        };
        const state = feedReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            error: 'socket close error'
        });
    });
});