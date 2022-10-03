export const checkResponse = async (response: Response) => {
    const json = await response.json();

    if (response.ok) {
        return json;
    }

    const message = json.message || '';

    return Promise.reject(`Ошибка ${response.status} ${message}`);
}