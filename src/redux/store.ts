import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/combine';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware: any = createSagaMiddleware();
const initialState = {};                               // declaring the variable with empty state
const composeEnhancers = composeWithDevTools({});

export const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga)