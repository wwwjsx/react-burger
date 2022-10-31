import ingredientReducer, {
    setIngredient,
    resetIngredientsCount,
    updateIngredientCount,
    resetIngredientsRequest,
    ingredientsThunk
} from './ingredients';
import { SET_INGREDIENT_COUNT_BUN } from '../constants/ingredients';
import { BUN_TYPE } from '../constants/common';

describe('ingredients reducer test', () => {
    const initialState = {
        ingredients: [],
        ingredient: null,
        request: false,
        message: null,
        failed: false,
    };

    it ('set ingredient', () => {
        const action = {
            type: setIngredient,
            payload: {
                id: 1
            }
        };
        const state = ingredientReducer(initialState, action);
        expect(state.ingredient).not.toBeNull();
    });

    it ('reset ingredients count', () => {
        const action = {
            type: resetIngredientsCount,
        };
        const init = {
            ...initialState,
            ingredients: [
                {
                    count: 1
                }
            ]
        };
        const state = ingredientReducer(init, action);
        const [first] = state.ingredients;
        const count = first ? first.count : -1;

        expect(count).toEqual(0);
    });

    it ('update ingredient count', () => {
        const action = {
            type: updateIngredientCount,
            payload: {
                type: SET_INGREDIENT_COUNT_BUN,
                id: 1
            }
        };

        const init = {
            ...initialState,
            ingredients: [
                {
                    _id: 1,
                    type: BUN_TYPE,
                    count: 3
                }
            ]
        };

        const state = ingredientReducer(init, action);
        const [first] = state.ingredients;
        const count = first ? first.count : 0;

        expect(count).toEqual(1);
    });

    it ('reset ingredients request', () => {
        const action = {
            type: resetIngredientsRequest
        };
        const state = ingredientReducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it ('ingredients request pending', () => {
        const action = {
            type: ingredientsThunk.pending.type
        };
        const state = ingredientReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            request: true
        });
    });

    it ('ingredients request fulfilled', () => {
        const action = {
            type: ingredientsThunk.fulfilled.type,
            payload: {
                data: [1, 2, 3]
            }
        };

        const state = ingredientReducer(initialState, action);

        expect(state.ingredients.length).toEqual(3);
    });

    it ('ingredients request rejected', () => {
        const action = {
            type: ingredientsThunk.rejected.type,
            payload: 'error load ingredients'
        };

        const state = ingredientReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            failed: true,
            message: 'error load ingredients'
        });
    });
});