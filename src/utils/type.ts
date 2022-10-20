export type LocationState = {
    ingredient?: TIngredient;
    order?: TOrderItem;
    from?: string;
    state: any;
}

export type TMethods = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export type TLogin = {
    email: string;
    password: string;
};

export type TTokenString = string | null | undefined;

export type TLogout = {
    token: string | null;
};

export type TUserInfo = {
    email: string;
    name: string;
    password: string;
};

export type TAuthState = {
    accessToken: string | null,
    refreshToken: string | null,
    user: null | TUserInfo,
    message: string | null,
    request: boolean,
    failed: boolean,
}

export type TUser = {
    token: string | null
};

export type TForgotPassword = {
    email: string;
};

export type TResetPassword = {
    password: string;
    token: string;
};

export type TRegister = TUserInfo;

export type TToken = {
    token: string | null;
};

export type TUpdateUser = TToken & {
    body: any;
}

export type TOrdersIngredients = {
    ingredients: string[]
};

export type TIngredient = {
    count?: number,
    _id: string,
    name: string,
    type: 'bun' | 'sauce' | 'main',
    fat: number,
    proteins: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v?: number
};

export type TIngredientUid = TIngredient & { uuid: string };
export type TIngredientIndex = TIngredientUid & { index: number };
export type TIngredients = TIngredient[];
export type TIngredientsUid = TIngredientUid[];

export type TBurgerState = {
    ingredients: TIngredientsUid,
    bun: TIngredient | null,
    totalPrice: number
};

export type TIngredientsState = {
    ingredients: TIngredients,
    ingredient: TIngredient | null,
    request: boolean,
    message: string | null,
    failed: boolean
};

export type TIngredientOrder = {
    number: number;
}

export type TOrdersIngredientsState = {
    order: null | {
        number: number
    },
    request: boolean,
    message: string | null,
    failed: boolean
}

export const IS_DONE = 'done';
export const IS_PENDING = 'pending';
export const IS_CREATED = 'created';
export type TStatus = typeof IS_DONE | typeof IS_PENDING | typeof IS_CREATED;

export type TOrderItem = {
    _id: string;
    ingredients: (string | TIngredient | TOrdersIngredients)[];
    status: TStatus;
    number: number;
    name: string;
    createdAt:string;
    updatedAt:string;
    price: number;
}

export type TOrderInitialState = {
    request: boolean,
    connected: boolean,
    orders: TOrderItem[],
    total: number,
    totalToday: number,
    error: string | null | undefined
}