export const setSession = (key:string, value:string): void => {
    sessionStorage.setItem(key, value);
}

export const getSession = (key:string): string | null => {
    return sessionStorage.getItem(key);
}

export const removeSession = (key:string): void => {
    sessionStorage.removeItem(key);
};