import { combineReducers } from 'redux';
import auth from './../slices/auth';
import ingredients from './../slices/ingredients';
import burger from './../slices/burger';
import order from './../slices/order';

export const rootReducer = combineReducers({
    ingredients,
    burger,
    order,
    auth,
});