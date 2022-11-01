import burgerReducer, {
    removeIngredient,
    setBun,
    addIngredient,
    moveIngredient,
    clearIngredients
} from './burger';

describe ('burger reducer test', () => {

    const initialState = {
        ingredients: [],
        bun: null,
        totalPrice: 0
    };

    it ('remove ingredient', () => {
        const action = {
            type: removeIngredient,
            payload: {
                uuid: '10'
            }
        };

        const init = {
            ...initialState,
            ingredients: [
                {
                    uuid: '10',
                    price: 100
                }
            ]
        };

        const state = burgerReducer(init, action);

        expect(state.ingredients.length).toEqual(0);
    });

    it('set ingredient bun', () => {
        const bun = {
            _id: '60d3b41abdacab0026a733c6',
        };

        const action = {
            type: setBun,
            payload: bun
        };

        const state = burgerReducer(initialState, action);

        expect(state.bun).not.toBeNull();
    });

    it('add new ingredient', () => {
        const action = {
            type: addIngredient,
            payload: {
                _id: '60d3b41abdacab0026a733c6',
                price: 10,
            }
        };

        const state = burgerReducer(initialState, action);

        expect(state.ingredients.length).toEqual(1);
    });

    it ('move ingredient', () => {
        const action = {
            type: moveIngredient,
            payload: {
                hoverIndex: 1,
                dragIndex: 0
            }
        };

        const init = {
            ...initialState,
            ingredients: [
                {
                    id: 1,
                    price: 1
                },
                {
                    id: 2,
                    price: 3
                }
            ]
        };

        const state = burgerReducer(init, action);
        const [first] = state.ingredients;
        const firstId = first ? first.id : 0; // first element id must be 2

        expect(firstId).toEqual(2);
    });

    it ('clear ingredients', () => {
        const action = {
            type: clearIngredients
        };

        const init = {
            ...initialState,
            ingredients: [1, 2, 3]
        };

        const state = burgerReducer(init, action);

        expect(state.ingredients.length).toEqual(0);
    });
});