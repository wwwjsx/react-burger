export const BASE_URL = 'https://norma.nomoreparties.space';
export const BASE_API = `${BASE_URL}/api`;
export const INGREDIENTS_URL = `${BASE_API}/ingredients`;
export const ORDERS_URL = `${BASE_API}/orders`;
export const RESET_PASSWORD_URL = `${BASE_API}/password-reset`;
export const RESET_PASSWORD_RESET_URL = `${BASE_API}/password-reset/reset`;
export const FORGOT_PASSWORD_URL = `${BASE_API}/forgot-password`;
export const REGISTER_URL = `${BASE_API}/auth/register`;
export const LOGIN_URL = `${BASE_API}/auth/login`;
export const LOGOUT_URL = `${BASE_API}/auth/logout`;
export const TOKEN_URL = `${BASE_API}/auth/token`;
export const GET_USER_URL = `${BASE_API}/auth/user`;
export const BUN_TYPE = 'bun';
export const SORT_COMPONENT_DRAG_TYPE = 'component';
export const MOVE_COMPONENT_DRAG_TYPE = 'ingredient';
export const COOKIE_ACCESS_TOKEN_EXPIRE = 20 * 60; // 20 minutes
export const BASE_WS_URL = 'wss://norma.nomoreparties.space';
export const WS_ORDERS_URL = `${BASE_WS_URL}/orders`;