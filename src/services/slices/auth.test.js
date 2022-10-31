import authReducer,
{
    forgotPasswordThunk,
    loginThunk,
    logoutThunk,
    registerThunk,
    resetPasswordThunk, setAuthError,
    tokenThunk,
    updateUserThunk,
    userThunk
} from './auth';

describe('auth reducer test', () => {
    const initialState = {
        accessToken: null,
        refreshToken: null,
        user: null,
        request: false,
        message: null,
        failed: false,
    };

    const pendingState = {
        ...initialState,
        request: true
    };

    const fulFilledState = {
        ...initialState,
        accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmUwMzdlNDJkMzRhMDAxYzI4Y2Q1MiIsImlhdCI6MTY2NzIyMDczMiwiZXhwIjoxNjY3MjIxOTMyfQ.DsmKJb6RTyYyMaDiJy_O38jYs9vPxeQ8RyxRP-3jI2I',
        refreshToken: '2a617a6b8f9d998b49ae5d510bf21a792acaafbc67ce2288b1e1ce03b125287a081f1bf70e45f76e',
        user: {
            email: 'u.abulkasimov@yandex.ru',
            name: 'Umid Abulkasimov Mardanovich'
        },
    };

    const payloadError = 'Error message';

    const rejectedState = {
        ...initialState,
        message: payloadError,
        failed: true
    }

    // ============ LOGIN ============ //

    it('auth login: should pending', () => {
        const action = { type: loginThunk.pending.type };
        const state = authReducer(initialState, action);

        expect(state).toEqual(pendingState);
    });

    it('auth login: should fulfilled', () => {
        const action = {
            type: loginThunk.fulfilled.type,
            payload: fulFilledState
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(fulFilledState);
    });

    it('auth login: should rejected', () => {
        const action = {
            type: loginThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(rejectedState);
    });

    // ============ REGISTER ============ //

    it('auth register: should pending', () => {
        const action = {
            type: registerThunk.pending.type
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(pendingState);
    });

    it('auth register: should fulfilled', () => {
        const action = {
            type: registerThunk.fulfilled.type,
            payload: fulFilledState
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(fulFilledState);
    });

    it('auth register: should rejected', () => {
        const action = {
            type: registerThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(rejectedState);
    });

    // ============ RESET PASSWORD ============ //

    it ('auth reset password: should pending', () => {
       const action = {
           type: resetPasswordThunk.pending.type
       };
        const state = authReducer(initialState, action);
        expect(state).toEqual(pendingState);
    });

    it ('auth reset password: should fulfilled', () => {
        const action = {
            type: resetPasswordThunk.fulfilled.type,
            payload: 'Password successfully reset'
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            message: 'Password successfully reset'
        });
    });

    it ('auth reset password: should rejected', () => {
        const action = {
            type: resetPasswordThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(rejectedState);
    });

    // ============ FORGOT PASSWORD ============ //

    it ('auth forgot password: should pending', () => {
        const action = {
            type: forgotPasswordThunk.pending.type
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(pendingState);
    });

    it ('auth forgot password: should fulfilled', () => {
        const action = {
            type: forgotPasswordThunk.fulfilled.type,
            payload: 'Reset email sent'
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            message: 'Reset email sent'
        });
    });

    it ('auth forgot password: should rejected', () => {
        const action = {
            type: resetPasswordThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(rejectedState);
    });

    // ============ GET USER INFO ============ //

    it ('auth get user: should pending', () => {
        const action = {
            type: userThunk.pending.type
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(pendingState);
    });

    it ('auth get user: should fulfilled', () => {
        const action = {
            type: userThunk.fulfilled.type,
            payload: fulFilledState,
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(fulFilledState);
    });

    it ('auth get user: should rejected', () => {
        const action = {
            type: userThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(rejectedState);
    });

    // ============ UPDATE USER INFO ============ //

    it ('auth update user: should pending', () => {
        const action = {
            type: updateUserThunk.pending.type
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(pendingState);
    });

    it ('auth update user: should fulfilled', () => {
        const action = {
            type: updateUserThunk.fulfilled.type,
            payload: fulFilledState,
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(fulFilledState);
    });

    it ('auth update user: should rejected', () => {
        const action = {
            type: updateUserThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(rejectedState);
    });

    // ============ UPDATE USER INFO ============ //

    it ('auth logout user: should pending', () => {
        const action = {
            type: logoutThunk.pending.type
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(pendingState);
    });

    it ('auth logout user: should fulfilled', () => {
        const action = {
            type: logoutThunk.fulfilled.type,
            payload: 'Successful logout',
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            message: 'Successful logout'
        });
    });

    it ('auth logout user: should rejected', () => {
        const action = {
            type: logoutThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(rejectedState);
    });

    // ============ TOKEN ============ //

    it ('auth token: should pending', () => {
        const action = {
            type: tokenThunk.pending.type
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual(pendingState);
    });

    it ('auth token: should fulfilled', () => {
        const action = {
            type: tokenThunk.fulfilled.type,
            payload: {
                ...fulFilledState,

            },
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual({
            ...fulFilledState,
            user: null,
        });
    });

    it ('auth token: should rejected', () => {
        const action = {
            type: tokenThunk.rejected.type,
            payload: payloadError
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(rejectedState);
    });

    it ('set auth error', () => {
        const action = {
            type: setAuthError,
            payload: 'Auth error message'
        };

        const state = authReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            failed: true,
            message: 'Auth error message'
        });
    });
});