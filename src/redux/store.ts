import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/combine';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};                               // declaring the variable with empty state
const composeEnhancers = composeWithDevTools({});

export const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);