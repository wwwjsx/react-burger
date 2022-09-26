import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    loginApi,
    logoutApi,
    registerApi,
    resetPasswordApi,
    forgotPasswordApi,
    userApi,
    userUpdateApi,
    tokenApi
} from '../../utils/api/api';
import { removeCookie, setCookie} from '../../utils/Cookie';
import { COOKIE_ACCESS_TOKEN_EXPIRE } from '../../utils/common/Contstants';
import { getSession, removeSession, setSession } from '../../utils/Session';

// uses for login and register actions
const saveTokens = (response) => {
    // save access token in cookie
    if (response.accessToken) {
        setCookie('accessToken', response.accessToken, {
            expires: COOKIE_ACCESS_TOKEN_EXPIRE
        });
    }

    // save refresh token in session store
    if (response.refreshToken) {
        setSession('refreshToken', response.refreshToken);
    }
};

export const userThunk = createAsyncThunk(
    'auth/user',
    async (params, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await userApi(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

export const updateUserThunk = createAsyncThunk(
    'auth/updateUser',
    async (params, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await userUpdateApi(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (params, {rejectWithValue}) => {
        try {
            const response = await loginApi(params);
            saveTokens(response);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (params, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const token = getSession('refreshToken');
            const response = await logoutApi({
                token
            });
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

export const tokenThunk = createAsyncThunk(
    'auth/token',
    async (params, { rejectWithValue }) => {
        try {
            const response = await tokenApi(params);
            saveTokens(response);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (params, {rejectWithValue}) => {
        try {
            const response = await registerApi(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

export const resetPasswordThunk = createAsyncThunk(
    'auth/resetPassword',
    async (params, {rejectWithValue}) => {
        try {
            const response = await resetPasswordApi(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

export const forgotPasswordThunk = createAsyncThunk(
    'auth/forgotPassword',
    async (params, { rejectWithValue }) => {
        try {
            const response = await forgotPasswordApi(params);
            return response;
        } catch (err) {
            return rejectWithValue(err.message || err);
        }
    }
);

const pending = (state, action) => {
    state.request = true;
};

const rejected = (state, action) => {
    state.request = false;
    state.message = action.payload;
    state.failed = true;
};

const authSlice = createSlice({
    name: 'user-auth',
    initialState: {
        accessToken: null,
        refreshToken: null,
        user: null,
        request: false,
        message: null,
        failed: false,
    },
    reducers: {
        setAuthError(state, action) {
            state.failed = true;
            state.message = action.payload;
            state.request = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginThunk.pending, pending)
            .addCase(loginThunk.fulfilled, (state, action) => {
                const { user, accessToken, refreshToken } = action.payload;
                state.user = user;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(loginThunk.rejected, rejected)
            // register
            .addCase(registerThunk.pending, pending)
            .addCase(registerThunk.fulfilled, (state, action) => {
                const { user, accessToken, refreshToken } = action.payload;
                state.user = user;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(registerThunk.rejected, rejected)
            // reset password
            .addCase(resetPasswordThunk.pending, pending)
            .addCase(resetPasswordThunk.fulfilled, (state, action) => {
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(resetPasswordThunk.rejected, rejected)
            // forgot password
            .addCase(forgotPasswordThunk.pending, pending)
            .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(forgotPasswordThunk.rejected, rejected)
            // user info
            .addCase(userThunk.pending, pending)
            .addCase(userThunk.fulfilled, (state, action) => {
                const { user, accessToken, refreshToken } = action.payload;
                state.user = user;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(userThunk.rejected, rejected)
            // update user info
            .addCase(updateUserThunk.pending, pending)
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                const { user, accessToken, refreshToken } = action.payload;
                state.user = user;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(updateUserThunk.rejected, rejected)
            // logout
            .addCase(logoutThunk.pending, pending)
            .addCase(logoutThunk.fulfilled, (state, action) => {
                removeSession('refreshToken');
                removeCookie('accessToken');

                state.accessToken = null;
                state.refreshToken = null;
                state.user = null;
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(logoutThunk.rejected, rejected)
            // token
            .addCase(tokenThunk.pending, pending)
            .addCase(tokenThunk.fulfilled, (state, action) => {
                state.request = false;
                state.message = null;
                state.failed = false;
            })
            .addCase(tokenThunk.rejected, rejected);
    }
});

const { actions, reducer } = authSlice;

export const { setAuthError } = actions;
export default reducer;