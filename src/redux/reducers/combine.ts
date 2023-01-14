import { combineReducers } from 'redux';
import { exchangeReducer } from './exchange.reducer';
import { paramReducer } from './param.reducer';

const reducers = combineReducers({
    param: paramReducer,
    exchangeRate : exchangeReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;