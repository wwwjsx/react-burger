import { checkResponse } from '../Response';
import {
    TOrders, TUpdateUser, TLogin, TLogout, TToken,
    TRegister, TResetPassword, TForgotPassword, TUser, TMethods
} from '../type';
import {
    GET_USER_URL, INGREDIENTS_URL,
    LOGIN_URL, LOGOUT_URL, ORDERS_URL,
    REGISTER_URL,
    RESET_PASSWORD_RESET_URL,
    RESET_PASSWORD_URL, TOKEN_URL
} from '../common/Contstants';

const post = (params: {}): object => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
};

const auth = (method: TMethods, params: { token: string | null, body?: any }): object => {
    const config = {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': (params.token || '')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: (params.body && JSON.stringify(params.body)) || undefined,
    }

    return config;
};

const request = (url: string, config?: object) => {
    return fetch(url, config || {}).then(checkResponse);
};

export const ingredientsApi = () => {
    return request(INGREDIENTS_URL);
};

export const orderApi = (params:TOrders) => {
    return request(ORDERS_URL, post(params));
};

export const userApi = (params:TUser) => {
  return request(GET_USER_URL, auth('GET', params));
};

export const userUpdateApi = (params: TToken & { body: any }) => {
    return request(GET_USER_URL, auth('PATCH', params));
};

export const loginApi = (params:TLogin) => {
    return request(LOGIN_URL, post(params));
};

export const logoutApi = (params:TLogout) => {
    return request(LOGOUT_URL, post(params));
};

export const tokenApi = (params:TToken) => {
    return request(TOKEN_URL, post(params));
};

export const registerApi = (params:TRegister) => {
    return request(REGISTER_URL, post(params));
};

export const resetPasswordApi = (params:TResetPassword) => {
    return request(RESET_PASSWORD_RESET_URL, post(params));
};

export const forgotPasswordApi = (params:TForgotPassword) => {
    return request(RESET_PASSWORD_URL, post(params));
};