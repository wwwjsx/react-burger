import {checkResponse} from '../Response';
import {
    GET_USER_URL, INGREDIENTS_URL,
    LOGIN_URL, LOGOUT_URL, ORDERS_URL,
    REGISTER_URL,
    RESET_PASSWORD_RESET_URL,
    RESET_PASSWORD_URL, TOKEN_URL
} from "../common/Contstants";

const post = (params) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }
};

const auth = (params) => {
    const config = {
        method: params.method || 'GET',
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

const api = (url, config) => {
    return fetch(url, config || {}).then(checkResponse);
};

export const ingredientsApi = () => {
    return api(INGREDIENTS_URL);
};

export const orderApi = (params) => {
    return api(ORDERS_URL, post(params));
};

export const userApi = (params) => {
  return api(GET_USER_URL, auth(params));
};

export const userUpdateApi = (params) => {
    return api(GET_USER_URL, auth(params));
};

export const loginApi = (params) => {
    return api(LOGIN_URL, post(params));
};

export const logoutApi = (params) => {
    return api(LOGOUT_URL, post(params));
};

export const tokenApi = (params) => {
    return api(TOKEN_URL, post(params));
};

export const registerApi = (params) => {
    return api(REGISTER_URL, post(params));
};

export const resetPasswordApi = (params) => {
    return api(RESET_PASSWORD_RESET_URL, post(params));
};

export const forgotPasswordApi = (params) => {
    return api(RESET_PASSWORD_URL, post(params));
};