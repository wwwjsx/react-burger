export const setSession = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getSession = (key) => {
    return sessionStorage.getItem(key);
}

export const removeSession = (key) => {
    sessionStorage.removeItem(key);
};