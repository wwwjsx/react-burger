import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, logoutThunk, tokenThunk, userThunk } from './slices/auth';
import { getCookie } from '../utils/Cookie';
import { getSession } from '../utils/Session';
import { useHistory } from 'react-router-dom';

export function useAuth() {
    const history = useHistory();
    const dispatch = useDispatch();
    const refreshToken = getSession('refreshToken');
    const accessToken = getCookie('accessToken');

    const {
        user,
        request,
        failed,
        message,
    } = useSelector(store => store.auth);

    const isLogged = !!refreshToken;

    // if user and access token lost but we have refresh token to get user again
    const refresh = async (force) => {
        if (refreshToken && (!accessToken || force)) {
            // try to get valid access token by refresh token
            const tokenResult = await dispatch(tokenThunk({
                token: refreshToken
            }));

            const tokenPayload = tokenResult.payload;

            // should refresh user auth data
            if (tokenPayload  && tokenPayload.success) {
                const userResult = await dispatch(userThunk({
                    token: tokenPayload.accessToken
                }));

                const userPayload = userResult ? userResult.payload : null;

                if (userPayload && userPayload.success) {
                    return Promise.resolve({
                        accessToken: tokenPayload.accessToken,
                        refreshToken: tokenPayload.refreshToken,
                        user: userPayload.user
                    });
                }
            }
        }

        return Promise.resolve({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    };

    const signIn = async (formData) => {
        return await dispatch(loginThunk(formData));
    };

    const signOut = async () => {
        return await dispatch(logoutThunk()).then(() => {
            history.replace({ pathname: '/login' });
        });
    };

    return { signIn, signOut, refresh, isLogged, request, failed, message, user };
}