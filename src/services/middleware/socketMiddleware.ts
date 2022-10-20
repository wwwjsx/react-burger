import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../store';

export const socketMiddleware = ():Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const sliceName = action?.payload?.sliceName;

            if (type && sliceName) {
                // init socked connection
                if (type === `${sliceName}/wsInit`) {
                    const { url } = action.payload;
                    socket = new WebSocket(url);
                }

                if (socket) {
                    socket.onopen = (event) => {
                        dispatch({ type: `${sliceName}/onOpen`, payload: event });
                    };

                    socket.onmessage = (event) => {
                        const { data } = event;
                        dispatch({ type: `${sliceName}/onMessage`, payload: JSON.parse(data) });
                    };

                    socket.onerror = (event) => {
                        dispatch({ type: `${sliceName}/onError`, payload: JSON.stringify(event) });
                    };

                    socket.onclose = event => {
                        if (event.code === 1000 || event.code === 1005) {
                            dispatch({type: `${sliceName}/onClose`});
                        } else {
                            dispatch({type: `${sliceName}/onCloseError`, payload: event.code.toString()});
                        }
                    };

                    if (type === `${sliceName}/wsClose`) {
                        socket.close();
                    }
                }
            }

            next(action);
        }
    }) as Middleware
};