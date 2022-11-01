import orderReducer, {
    orderThunk,
    resetOrderRequest
} from './order';

describe('order reducer test', () => {
    const initialState = {
        order: null,
        request: false,
        message: null,
        failed: false
    };

    it ('reset order request', () => {
        const action = {
            type: resetOrderRequest
        };
        const state = orderReducer(initialState, action);
        expect(state).toEqual(initialState);
    });

    it ('order request pending', () => {
        const action = {
            type: orderThunk.pending.type
        };
        const state = orderReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            request: true
        });
    });

    it ('order request fulfilled', () => {
        const action = {
            type: orderThunk.fulfilled.type,
            payload: {
                order: {
                    id: 1
                }
            }
        };
        const state = orderReducer(initialState, action);
        const { order } = state;
        expect(order).not.toBeNull();
    });

    it ('order request rejected', () => {
        const action = {
            type: orderThunk.rejected.type,
            payload: 'error load order'
        };
        const state = orderReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            failed: true,
            message: 'error load order'
        })
    });
});