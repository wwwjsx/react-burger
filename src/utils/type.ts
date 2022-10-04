export type LocationState = {
    ingredient?: TIngredient;
    from?: string;
    state: any;
}

export type TMethods = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export type TLogin = {
    email: string;
    password: string;
};

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

export type TOrders = {
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
export type TIngredientsIndex = TIngredientIndex[];

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

export type TOrder = {
    number: number;
}

export type TOrderState = {
    order: null | {
        number: number
    },
    request: boolean,
    message: string | null,
    failed: boolean
}