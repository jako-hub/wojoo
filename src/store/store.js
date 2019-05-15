/**
 * This file joins and creates the main application store.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

let composeEnhancers = compose;

if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(reducers(), composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore();