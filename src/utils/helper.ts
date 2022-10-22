import { IS_CREATED, IS_DONE, IS_PENDING } from './type';

export const getStatus = (statusId: string) => {
    let status = 'Отменён';
    switch (statusId) {
        case IS_DONE:
            status = 'Выполнен';
            break;
        case IS_PENDING:
            status = 'Готовится';
            break;
        case IS_CREATED:
            status = 'Создан';
            break;
    }
    return status;
}

export const cleanToken = (token: string | null | undefined) => {
    return token && token.replace(/^Bearer /, '');
}