import { createStore, combineReducers } from 'redux';
import { moviesReducer } from "./reducers/moviesReducer";

export default () => {
    const rootReducer = combineReducers({
        moviesReducer
    });

    return createStore(rootReducer);
};
