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

const request = (url, config) => {
    return fetch(url, config || {}).then(checkResponse);
};

export const ingredientsApi = () => {
    return request(INGREDIENTS_URL);
};

export const orderApi = (params) => {
    return request(ORDERS_URL, post(params));
};

export const userApi = (params) => {
  return request(GET_USER_URL, auth(params));
};

export const userUpdateApi = (params) => {
    return request(GET_USER_URL, auth(params));
};

export const loginApi = (params) => {
    return request(LOGIN_URL, post(params));
};

export const logoutApi = (params) => {
    return request(LOGOUT_URL, post(params));
};

export const tokenApi = (params) => {
    return request(TOKEN_URL, post(params));
};

export const registerApi = (params) => {
    return request(REGISTER_URL, post(params));
};

export const resetPasswordApi = (params) => {
    return request(RESET_PASSWORD_RESET_URL, post(params));
};

export const forgotPasswordApi = (params) => {
    return request(RESET_PASSWORD_URL, post(params));
};