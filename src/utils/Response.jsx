export const checkResponse = async (response) => {
    if (response.ok) {
        return await response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}